/**
 * External dependencies
 */
 import classnames from 'classnames';
 
 /**
  * WordPress dependencies
  */
import { __ } from '@wordpress/i18n';
 import { Component, Fragment } from '@wordpress/element';
 import {
     PanelBody,
		 PanelRow,
		 Button,
		 Spinner,
		 TextControl,
     ToggleControl,
     Placeholder,
 } from '@wordpress/components';
 import apiFetch from '@wordpress/api-fetch';
 
 import {
     InspectorControls,
 } from '@wordpress/block-editor';
 
 
 /**
  * Module Constants
  * instellingen voor het ophalen de POST meta data 
  */

	// const { useSelect } = wp.data;
	// const { useEntityProp } = wp.coreData;
	const { compose } = wp.compose;
	const { withSelect, withDispatch } = wp.data;

	 /**
  * Module Functies 
  * instellingen voor het ophalen de GLOBAL meta data 
  */

	function getSetting() {
		return apiFetch({
			path: "/iv/v2/vacature-settings"
		})
			.then( (blockSetting) => {
        // als er JSON instaat, parsen, als het PHP serialized is, niet parssen (dan is het al een object)
        if (testJSON(blockSetting)) {
          return JSON.parse(blockSetting)
        } else {
          return blockSetting
        } 
      })
			.catch(error => error);
	}

  function getMeta() {
	
	}

	function setSetting(setting) {

		return apiFetch({
			path: "/iv/v2/vacature-settings",
			method: "POST",
      data: setting  
		})
			.then(
        blockSetting => JSON.parse(blockSetting)
      )
			.catch(error => error);
	}

  // Helper tot test JSON in de database of PHP serialized
  function testJSON(text) {
    if (typeof text !== "string") {
        return false;
    }
    try {
        JSON.parse(text);
        return true;
    } catch (error) {
        return false;
    }
}

class LatestPostsEdit extends Component {

		 state = {
      //initial state. Die halen we later op in componentDidMount
			blockSetting: "",
      selectie: {
        uren: '',
        datum1: '',
        datum2: '',
        niveau: '',
        schaal: '',
        bedrag: '',
        vakgebied: '',
        ervaring: '',
        nummer: '', 
        functie: '', 
        locatie: '', 
        locatie2: '', 
      },
      namen: {
        uren: '',
        datum1: '',
        datum2: '',
        niveau: '',
        schaal: '',
        bedrag: '',
        vakgebied: '',
        ervaring: '',
        nummer: '', 
        functie: '', 
        locatie: '', 
        locatie2: '', 
      },
			isLoading: true,
			isSaving: false,
			isEditing: false,
			metaIntro: ""
		};

		updateSetting = async () => {
			this.setState({ isSaving: true });
			const blockSetting = await setSetting(this.state.blockSetting);
      
			this.setState({
				blockSetting,
        namen: blockSetting.namen,
        selectie: blockSetting.selectie,
				isSaving: false,
				isEditing: false
			});
		};

		async componentDidMount() {
			const blockSetting = await getSetting();
			const metaIntro = await getMeta();

			this.setState({
				metaIntro,
				blockSetting,
        namen: blockSetting.namen,
        selectie: blockSetting.selectie,
				isLoading: false
			});
		}


     render() {
        const { attributes, postMeta, setPostMeta, terms, ervaringen, niveau, setAttributes, className } = this.props;
        const { 
            pageId,
            style
          } = attributes;
				const classNames = classnames( className );

        //apart, want nodig?
        const meta_functie = postMeta['vacatures_functie'];
        const meta_locatie = postMeta['vacatures_locatie'];
        const meta_locatie2 = postMeta['vacatures_locatie2'];

        const meta_uren = postMeta['vacatures_uren'];
        const meta_datum1 = postMeta['vacatures_datum1'];
        const meta_datum2 = postMeta['vacatures_datum2'];
        // const meta_niveau = postMeta['vacatures_niveau'];
        const meta_schaal = postMeta['vacatures_schaal'];
        const meta_bedrag = postMeta['vacatures_bedrag'];
        const meta_nummer = postMeta['vacatures_nummer'];
          // koppeling met recruiter
        const meta_recruiter = postMeta['vacatures_recruiter_ID'];
        
    
        console.dir(postMeta);

        let werkveld = '';
        let taxErvaring = '';
        let taxNiveau = '';

        if(terms){
          terms.map( (term) => { 
            if (term.count) {
              // console.log(term.name);
              werkveld = term.name;
            }
          });
        }

        if(ervaringen){
          ervaringen.map( (ervaring) => { 
            if (ervaring.count) {
              // console.log(ervaring.name);
              taxErvaring = ervaring.name;
            }
          });
        }

        if(niveau){
          niveau.map( (niveau) => {
            if (niveau.count) {
              // console.log(niveau.name);
              taxNiveau = niveau.name;
            }
          });
        }

         const inspectorControls = (
             <InspectorControls>
                 <PanelBody 
								 	title={ __( 'Global settings', "indrukwekkend" ) }
									>
                  <PanelRow>
              {this.state.isEditing || this.state.blockSetting === "" ? (
                <p>
                    <ToggleControl
                        label={ __( 'Functie' ) }
                        checked={ this.state.selectie['functie'] }
                        onChange={ value => {
                      
                          var stateCopy = Object.assign({}, this.state.blockSetting);
                          stateCopy.selectie.functie = value;
    
                          if (!this.state.isSaving) {
                            this.setState({
                              blockSetting: stateCopy,
                              isEditing: true
                            });
                          }
                        }}
                    />   

                    <ToggleControl
                        label={ __( 'Locatie' ) }
                        checked={ this.state.selectie['locatie'] }
                        onChange={ value => {
                      
                          var stateCopy = Object.assign({}, this.state.blockSetting);
                          stateCopy.selectie.locatie = value;
    
                          if (!this.state.isSaving) {
                            this.setState({
                              blockSetting: stateCopy,
                              isEditing: true
                            });
                          }
                        }}
                    />
                    <ToggleControl
                        label={ __( 'Locatie 2' ) }
                        checked={ this.state.selectie['locatie2'] }
                        onChange={ value => {
                      
                          var stateCopy = Object.assign({}, this.state.blockSetting);
                          stateCopy.selectie.locatie2 = value;
    
                          if (!this.state.isSaving) {
                            this.setState({
                              blockSetting: stateCopy,
                              isEditing: true
                            });
                          }
                        }}
                    />

                    <ToggleControl
                        label={ __( 'Uren' ) }
                        checked={ this.state.selectie['uren'] }
                        onChange={ uren => {
                      
                          var stateCopy = Object.assign({}, this.state.blockSetting);
                          stateCopy.selectie.uren = uren;
    
                          if (!this.state.isSaving) {
                            this.setState({
                              blockSetting: stateCopy,
                              isEditing: true
                            });
                          }
                        }}
                    />  
                    <ToggleControl
                        label={ __( '(Plaatstings)datum ' ) }
                        checked={ this.state.selectie['datum1'] }
                        onChange={ value => {
                      
                          var stateCopy = Object.assign({}, this.state.blockSetting);
                          stateCopy.selectie.datum1 = value;
    
                          if (!this.state.isSaving) {
                            this.setState({
                              blockSetting: stateCopy,
                              isEditing: true
                            });
                          }
                        }}
                    />
                    <ToggleControl
                        label={ __( '(Sluitings)datum ' ) }
                        checked={ this.state.selectie['datum2'] }
                        onChange={ value => {
                      
                          var stateCopy = Object.assign({}, this.state.blockSetting);
                          stateCopy.selectie.datum2 = value;
    
                          if (!this.state.isSaving) {
                            this.setState({
                              blockSetting: stateCopy,
                              isEditing: true
                            });
                          }
                        }}
                    />  
                    <ToggleControl
                        label={ __( 'Niveau' ) }
                        checked={ this.state.selectie['niveau'] }
                        onChange={ value => {
                      
                          var stateCopy = Object.assign({}, this.state.blockSetting);
                          stateCopy.selectie.niveau = value;
    
                          if (!this.state.isSaving) {
                            this.setState({
                              blockSetting: stateCopy,
                              isEditing: true
                            });
                          }
                        }}
                    />  
                    <ToggleControl
                        label={ __( 'Schaal' ) }
                        checked={ this.state.selectie['schaal'] }
                        onChange={ value => {
                      
                          var stateCopy = Object.assign({}, this.state.blockSetting);
                          stateCopy.selectie.schaal = value;
    
                          if (!this.state.isSaving) {
                            this.setState({
                              blockSetting: stateCopy,
                              isEditing: true
                            });
                          }
                        }}
                    />  
                    <ToggleControl
                        label={ __( 'Bedrag' ) }
                        checked={ this.state.selectie['bedrag'] }
                        onChange={ value => {
                      
                          var stateCopy = Object.assign({}, this.state.blockSetting);
                          stateCopy.selectie.bedrag = value;
    
                          if (!this.state.isSaving) {
                            this.setState({
                              blockSetting: stateCopy,
                              isEditing: true
                            });
                          }
                        }}
                    />  
                    <ToggleControl
                        label={ __( 'Vakgebied' ) }
                        checked={ this.state.selectie['vakgebied'] }
                        onChange={ value => {
                      
                          var stateCopy = Object.assign({}, this.state.blockSetting);
                          stateCopy.selectie.vakgebied = value;
    
                          if (!this.state.isSaving) {
                            this.setState({
                              blockSetting: stateCopy,
                              isEditing: true
                            });
                          }
                        }}
                    />
                    <ToggleControl
                        label={ __( 'Ervaring' ) }
                        checked={ this.state.selectie['ervaring'] }
                        onChange={ value => {
                      
                          var stateCopy = Object.assign({}, this.state.blockSetting);
                          stateCopy.selectie.ervaring = value;
    
                          if (!this.state.isSaving) {
                            this.setState({
                              blockSetting: stateCopy,
                              isEditing: true
                            });
                          }
                        }}
                    />
                      
                    <ToggleControl
                        label={ __( 'Nummer' ) }
                        checked={ this.state.selectie['nummer'] }
                        onChange={ value => {
                      
                          var stateCopy = Object.assign({}, this.state.blockSetting);
                          stateCopy.selectie.nummer = value;
    
                          if (!this.state.isSaving) {
                            this.setState({
                              blockSetting: stateCopy,
                              isEditing: true
                            });
                          }
                        }}
                    /> 
  
                  { this.state.selectie['functie'] &&
                    <TextControl
                      label={__("Functie", "indrukwekkend")}
                      value={ this.state.namen['functie']  }
                      onChange={ value => {
                        
                        var stateCopy = Object.assign({}, this.state.blockSetting);
                        stateCopy.namen.functie = value;

                        if (!this.state.isSaving) {
                          this.setState({
                            blockSetting: stateCopy,
                            isEditing: true
                          });
                        }
                      }}
                    />
                  }

                  { this.state.selectie['locatie'] &&
                    <TextControl
                      label={__("Locatie", "indrukwekkend")}
                      value={ this.state.namen['locatie']  }
                      onChange={ value => {
                        
                        var stateCopy = Object.assign({}, this.state.blockSetting);
                        stateCopy.namen.locatie = value;

                        if (!this.state.isSaving) {
                          this.setState({
                            blockSetting: stateCopy,
                            isEditing: true
                          });
                        }
                      }}
                    />
                  }

                  { this.state.selectie['locatie2'] &&
                    <TextControl
                      label={__("Locatie 2", "indrukwekkend")}
                      value={ this.state.namen['locatie2']  }
                      onChange={ value => {
                        
                        var stateCopy = Object.assign({}, this.state.blockSetting);
                        stateCopy.namen.locatie2 = value;

                        if (!this.state.isSaving) {
                          this.setState({
                            blockSetting: stateCopy,
                            isEditing: true
                          });
                        }
                      }}
                    />
                  }

                  { this.state.selectie['uren'] &&
                    <TextControl
                      label={__("UrenTekst", "indrukwekkend")}
                      value={ this.state.namen['uren']  }
                      onChange={ uren => {
                        
                        var stateCopy = Object.assign({}, this.state.blockSetting);
                        stateCopy.namen.uren = uren;

                        if (!this.state.isSaving) {
                          this.setState({
                            blockSetting: stateCopy,
                            isEditing: true
                          });
                        }
                      }}
                    />
                  }

                  { this.state.selectie['datum1'] &&
                    <TextControl
                      label={__("Plaatsingdatumtekst", "indrukwekkend")}
                      value={ this.state.namen['datum1']  }
                      onChange={ value => {
                        
                        var stateCopy = Object.assign({}, this.state.blockSetting);
                        stateCopy.namen.datum1 = value;

                        if (!this.state.isSaving) {
                          this.setState({
                            blockSetting: stateCopy,
                            isEditing: true
                          });
                        }
                      }}
                    />
                  }

                  { this.state.selectie['datum2'] &&
                    <TextControl
                      label={__("Einddatum Tekst", "indrukwekkend")}
                      value={ this.state.namen['datum2']  }
                      onChange={ value => {
                        
                        var stateCopy = Object.assign({}, this.state.blockSetting);
                        stateCopy.namen.datum2 = value;

                        if (!this.state.isSaving) {
                          this.setState({
                            blockSetting: stateCopy,
                            isEditing: true
                          });
                        }
                      }}
                    />
                  }
                  { this.state.selectie['niveau'] &&
                    <TextControl
                      label={__("Niveau Tekst", "indrukwekkend")}
                      value={ this.state.namen['niveau']  }
                      onChange={ value => {
                        
                        var stateCopy = Object.assign({}, this.state.blockSetting);
                        stateCopy.namen.niveau = value;

                        if (!this.state.isSaving) {
                          this.setState({
                            blockSetting: stateCopy,
                            isEditing: true
                          });
                        }
                      }}
                    />
                  }
                  { this.state.selectie['schaal'] &&
                    <TextControl
                      label={__("Salarisschaal tekst", "indrukwekkend")}
                      value={ this.state.namen['schaal']  }
                      onChange={ value => {
                        
                        var stateCopy = Object.assign({}, this.state.blockSetting);
                        stateCopy.namen.schaal = value;

                        if (!this.state.isSaving) {
                          this.setState({
                            blockSetting: stateCopy,
                            isEditing: true
                          });
                        }
                      }}
                    />
                  }

                  { this.state.selectie['bedrag'] &&
                    <TextControl
                      label={__("Salaris bedrag tekst", "indrukwekkend")}
                      value={ this.state.namen['bedrag']  }
                      onChange={ value => {
                        
                        var stateCopy = Object.assign({}, this.state.blockSetting);
                        stateCopy.namen.bedrag = value;

                        if (!this.state.isSaving) {
                          this.setState({
                            blockSetting: stateCopy,
                            isEditing: true
                          });
                        }
                      }}
                    />
                  }

                  { this.state.selectie['vakgebied'] &&
                    <TextControl
                      label={__("Vakgebied Tekst", "indrukwekkend")}
                      value={ this.state.namen['vakgebied']  }
                      onChange={ value => {
                        
                        var stateCopy = Object.assign({}, this.state.blockSetting);
                        stateCopy.namen.vakgebied = value;

                        if (!this.state.isSaving) {
                          this.setState({
                            blockSetting: stateCopy,
                            isEditing: true
                          });
                        }
                      }}
                    />
                  } 

                  { this.state.selectie['ervaring'] &&
                    <TextControl
                      label={__("Ervaringen Tekst", "indrukwekkend")}
                      value={ this.state.namen['ervaring']  }
                      onChange={ value => {
                        
                        var stateCopy = Object.assign({}, this.state.blockSetting);
                        stateCopy.namen.ervaring = value;

                        if (!this.state.isSaving) {
                          this.setState({
                            blockSetting: stateCopy,
                            isEditing: true
                          });
                        }
                      }}
                    />
                  } 

                  { this.state.selectie['nummer'] &&
                    <TextControl
                      label={__("Nummer tekst", "indrukwekkend")}
                      value={ this.state.namen['nummer']  }
                      onChange={ value => {
                        
                        var stateCopy = Object.assign({}, this.state.blockSetting);
                        stateCopy.namen.nummer = value;

                        if (!this.state.isSaving) {
                          this.setState({
                            blockSetting: stateCopy,
                            isEditing: true
                          });
                        }
                      }}
                    />
                  }

                  <Button
                    isPrimary
                    disabled={this.state.isSaving}
                    onClick={() => {
                      this.updateSetting();
                    }}
                  >
                    {__("Save Settings", "indrukwekkend")}
                  </Button>{" "}
                  <Button
                    isDefault
                    disabled={this.state.isSaving}
                    onClick={async () => {
                      this.setState({ isEditing: false });
                      const blockSetting = await getSetting();
                      this.setState({ blockSetting });
                    }}
                  >
                    {__("Cancel", "indrukwekkend")}
                  </Button>
                </p>
              ) : (
                <Fragment>
                  <p>{__("Global Setting Saved", "indrukwekkend")}</p>
                  <Button
                    isDefault
                    onClick={() => {
                      this.setState({
                        isEditing: true
                      });
                    }}
                  >
                    {__("Edit", "indrukwekkend")}
                  </Button>
                </Fragment>
              )}
            </PanelRow>  
                 </PanelBody>
             </InspectorControls>
         );

				 if (this.state.isLoading) {
					return (
						<p>
							<Spinner /> {__("Loading", "indrukwekkend")}
						</p>
					);
				}

         return (
             <Fragment>
                 { inspectorControls }

                  <section
                      className={ classNames }
                      style= { style }
                  >
                    <h3 className='soort'>
                    { werkveld }
                    </h3>
										
                    <div className='data-wrapper'>

                      {this.state.selectie['functie'] &&
                        <dl className="functie">
                          <dt>{this.state.namen['functie']}</dt>
                          <dd>
                            <TextControl
                              value={meta_functie}
                              onChange={ ( value ) => setPostMeta( { vacatures_functie: value } ) }
                            />
                          </dd>
											  </dl>
                      }

                      {/* {this.state.selectie['niveau'] &&
                        <dl className="niveau">
                          <dt>{this.state.namen['niveau']}</dt>
                          <dd>
                            <TextControl
                              value={meta_niveau}
                              onChange={ ( value ) => setPostMeta( { vacatures_niveau: value } ) }
                            />
                          </dd>
											  </dl>
                      } */}

                      {this.state.selectie['locatie'] &&
                        <dl className="locatie">
                          <dt>{this.state.namen['locatie']}</dt>
                          <dd>
                            <TextControl
                              value={meta_locatie}
                              onChange={ ( value ) => setPostMeta( { vacatures_locatie: value } ) }
                            />
                          </dd>
											  </dl>
                      }

                      {this.state.selectie['locatie2'] &&
                        <dl className="locatie2">
                          <dt>{this.state.namen['locatie2']}</dt>
                          <dd>
                            <TextControl
                              value={meta_locatie2}
                              onChange={ ( value ) => setPostMeta( { vacatures_locatie2: value } ) }
                            />
                          </dd>
											  </dl>
                      }

                      {this.state.selectie['uren'] &&
                        <dl className="uren">
                          <dt>{this.state.namen['uren']}</dt>
                          <dd>
                            <TextControl
                              value={meta_uren}
                              onChange={ ( value ) => setPostMeta( { vacatures_uren: value } ) }
                            />
                          </dd>
											  </dl>
                      }

                      {this.state.selectie['datum1'] &&
                        <dl className="datum plaatstingsdatum">
                          <dt>{this.state.namen['datum1']}</dt>
                          <dd>
                            <TextControl
                              value={meta_datum1}
                              onChange={ ( value ) => setPostMeta( { vacatures_datum1: value } ) }
                            />
                          </dd>
											  </dl>
                      }

                      {this.state.selectie['schaal'] &&
                        <dl className="schaal">
                          <dt>{this.state.namen['schaal']}</dt>
                          <dd>
                            <TextControl
                              value={meta_schaal}
                              onChange={ ( value ) => setPostMeta( { vacatures_schaal: value } ) }
                            />
                          </dd>
											  </dl>
                      }
                      
                      {this.state.selectie['bedrag'] &&
                        <dl className="bedrag">
                          <dt>{this.state.namen['bedrag']}</dt>
                          <dd>
                            <TextControl
                              value={meta_bedrag}
                              onChange={ ( value ) => setPostMeta( { vacatures_bedrag: value } ) }
                            />
                          </dd>
											  </dl>
                      }

                      {this.state.selectie['nummer'] &&
                        <dl className="nummer">
                          <dt>{this.state.namen['nummer']}</dt>
                          <dd>
                            <TextControl
                              value={meta_nummer}
                              onChange={ ( value ) => setPostMeta( { vacatures_nummer: value } ) }
                            />
                          </dd>
											  </dl>
                      }

                      {this.state.selectie['datum2'] &&
                        <dl className="datum sluitingsdatum">
                          <dt>{this.state.namen['datum2']}</dt>
                          <dd>
                            <TextControl
                              value={meta_datum2}
                              onChange={ ( value ) => setPostMeta( { vacatures_datum2: value } ) }
                            />
                          </dd>
											  </dl>
                      }


                      <dl className="datum sluitingsdatum">
                        <dt>Recruiternummer:</dt>
                        <dd> { meta_recruiter } </dd>
                      </dl>
                    

										</div>

                    <div className='data-wrapper-wide'>
                      {this.state.selectie['vakgebied'] &&
                        <dl className="vakgebied">
                          <dt>{this.state.namen['vakgebied']}</dt>
                          <dd>
                          { werkveld }
                          </dd>
											  </dl>
                      }
                    </div>
                    <div className='data-wrapper-wide'>
                      {this.state.selectie['ervaring'] &&
                        <dl className="ervaring">
                          <dt>{this.state.namen['ervaring']}</dt>
                          <dd>
                          { taxErvaring }
                          </dd>
											  </dl>
                      }
                    </div>
                    <div className='data-wrapper-wide'>
                      {this.state.selectie['niveau'] &&
                        <dl className="niveau">
                          <dt>{this.state.namen['niveau']}</dt>
                          <dd>
                          { taxNiveau }
                          </dd>
											  </dl>
                      }
                    </div>

                    <a className='button' href='#'>Reageer op deze vacature</a>
                  </section>
             </Fragment>
         );
     }
 }

 export default compose( [
	withSelect( ( select ) => {		
		return {
			postMeta: select( 'core/editor' ).getEditedPostAttribute( 'meta' ),
			postType: select( 'core/editor' ).getCurrentPostType(),
      terms: select( 'core' ).getEntityRecords( 'taxonomy', 'werkveld', { per_page: 5 } ),
      ervaringen: select( 'core' ).getEntityRecords( 'taxonomy', 'ervaring', { per_page: 5 } ),
      niveau: select( 'core' ).getEntityRecords( 'taxonomy', 'niveau', { per_page: 5 } ),
		};
	} ),
	withDispatch( ( dispatch ) => {
		return {
			setPostMeta( newMeta ) {
				dispatch( 'core/editor' ).editPost( { meta: newMeta } );
			}
		};
	} )
] )( LatestPostsEdit );
