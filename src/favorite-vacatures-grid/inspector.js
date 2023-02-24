// Internationalization
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// import Block component
const { InspectorControls, Fragment } = wp.blockEditor;

// import Inspector components
const { QueryControls, PanelBody,  RangeControl, ToggleControl, RadioControl, TextControl } = wp.components;
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

/**
 * Module Constants
 */
const CATEGORIES_LIST_QUERY = {
	per_page: -1,
};

export default class Inspector extends Component {

    constructor() {
		super( ...arguments );
		this.state = {
			categoriesList: [],
		};
	}
	// ToDo: Categorieen ophalen van de andere Post Types, kan dat? of moet je gewoon 1 categorie gebruiken?
	componentDidMount() {
		this.isStillMounted = true;
		this.fetchRequest = apiFetch( {
			path: addQueryArgs( '/wp/v2/soortvacature', CATEGORIES_LIST_QUERY ),
		} ).then(
			( categoriesList ) => {
				if ( this.isStillMounted ) {
					this.setState( { categoriesList } );
				}
			}
		).catch(
			() => {
				if ( this.isStillMounted ) {
					this.setState( { categoriesList: [] } );
				}
			}
		);
	}

	componentWillUnmount() {
		this.isStillMounted = false;
	}

    //start rendering
    render() {
        const { attributes, 
                setAttributes,
        } = this.props;

        const { categoriesList } = this.state;

        const { 
            displayButtonContentRadio,
            displayPostPaginateRadio,
            displayPostContent,
            displayThumbnail,
            displayLink,
            displayPijltje,
            textLink,
            displayMeta,
            displayFunctie,
            displayLocatie,
            displayLocatie2,
            displayUren,
			displayDatum1,
			displayDatum2,
            displaySchaal,
            displayBedrag,
            displayVakgebied,
            displayNiveau,
            displayErvaring,
            displayNummer,
            postLayout,
			columns,
            autoScroll,
			scrollSpeed,
            slidesToScroll, 
			order, 
			orderBy, 
			categories,
			postsToShow, 
			excerptLength 
		} = attributes;

        return (
            <InspectorControls key="inspector">
                <PanelBody title={ __( 'Post Content Settings' ) }>
                    <ToggleControl
                        label={ __( 'Thumbnail' ) }
                        checked={ displayThumbnail }
                        onChange={ ( value ) => setAttributes( { displayThumbnail: value } ) }
                    />
                    <ToggleControl
                        label={ __( 'Post Content' ) }
                        checked={ displayPostContent }
                        onChange={ ( value ) => setAttributes( { displayPostContent: value } ) }
                    />
                 
                    { displayPostContent &&
                        <RangeControl
                            label={ __( 'Max number of words in excerpt' ) }
                            value={ excerptLength }
                            onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
                            min={ 10 }
                            max={ 100 }
                        />
                    }
                    <ToggleControl
                        label={ __( 'Link naar vacature' ) }
                        checked={ displayLink }
                        onChange={ ( value ) => setAttributes( { displayLink: value } ) }
                    />
                    
                    { displayLink &&
                         <ToggleControl
                         label={ __( 'Toon ook "lees verder" link' ) }
                         checked={ displayPijltje }
                         onChange={ ( value ) => setAttributes( { displayPijltje: value } ) }
                    />
                    }
                    { displayPijltje && displayLink &&
                     <TextControl
                         label={ __( 'Vervolg link tekst' ) }
                         value={ textLink }
                         onChange={ ( value ) => setAttributes( {textLink: value}  ) }
                     />
                     }

                     <ToggleControl
                        label={ __( 'Diplay Meta Content' ) }
                        checked={ displayMeta }
                        onChange={ ( value ) => setAttributes( { displayMeta: value } ) }
                    />

                </PanelBody>

                { displayMeta &&
                    <PanelBody title={__("Meta Instellingen")}>
                        <ToggleControl
                            label={ __( 'Functie' ) }
                            checked={ displayFunctie }
                            onChange={ ( value ) => setAttributes( { displayFunctie: value } ) }
                        />
                        <ToggleControl
                            label={ __( 'Nummer' ) }
                            checked={ displayNummer }
                            onChange={ ( value ) => setAttributes( { displayNummer: value } ) }
                        />
                        <ToggleControl
                            label={ __( 'Locatie' ) }
                            checked={ displayLocatie }
                            onChange={ ( value ) => setAttributes( { displayLocatie: value } ) }
                        />
                        <ToggleControl
                            label={ __( 'Locatie 2' ) }
                            checked={ displayLocatie2 }
                            onChange={ ( value ) => setAttributes( { displayLocatie2: value } ) }
                        />
                        <ToggleControl
                            label={ __( 'Dienstverband' ) }
                            checked={ displayUren }
                            onChange={ ( value ) => setAttributes( { displayUren: value } ) }
                        />
                        <ToggleControl
                            label={ __( '(Plaatsings)datum' ) }
                            checked={ displayDatum1 }
                            onChange={ ( value ) => setAttributes( { displayDatum1: value } ) }
                        />
                        <ToggleControl
                            label={ __( '(Sluitings)datum' ) }
                            checked={ displayDatum2 }
                            onChange={ ( value ) => setAttributes( { displayDatum2: value } ) }
                        />

                        <ToggleControl
                            label={ __( 'Schaal' ) }
                            checked={ displaySchaal }
                            onChange={ ( value ) => setAttributes( { displaySchaal: value } ) }
                        />
                        <ToggleControl
                            label={ __( 'Bedrag' ) }
                            checked={ displayBedrag }
                            onChange={ ( value ) => setAttributes( { displayBedrag: value } ) }
                        />
                        <ToggleControl
                            label={ __( 'Vakgebied' ) }
                            checked={ displayVakgebied }
                            onChange={ ( value ) => setAttributes( { displayVakgebied: value } ) }
                        />
                        <ToggleControl
                            label={ __( 'Niveau' ) }
                            checked={ displayNiveau }
                            onChange={ ( value ) => setAttributes( { displayNiveau: value } ) }
                        />
                        <ToggleControl
                            label={ __( 'Ervaring' ) }
                            checked={ displayErvaring }
                            onChange={ ( value ) => setAttributes( { displayErvaring: value } ) }
                        />
                    </PanelBody>
                }

                <PanelBody title={__("Navigatie instellingen")} initialOpen={ false } >
                    <RadioControl
                        label={ __( 'Show:' ) }
                        selected={ displayPostPaginateRadio }
                        
                        options={ [
                            { label: 'Knop', value: 'button' },
                            { label: 'Niets', value: '' },
                        ] }
                        onChange={ ( value ) => setAttributes( { displayPostPaginateRadio: value } ) }
                    />

                    { displayPostPaginateRadio === 'button' && 
                        <RadioControl
                            label={ __( 'Show:' ) }
                            selected={ displayButtonContentRadio }
                            options={ [
                                { label: __( 'Standaard Knop' ), value: '' },
                                {
                                    label: __( 'Outline' ), value: 'is-style-outline',
                                },
                            ] }
                            onChange={ ( value ) =>
                                setAttributes( {
                                    displayButtonContentRadio: value,
                                } )
                            }
                        />
                    }
                </PanelBody>

                <PanelBody title={ __( 'Sorting and Filtering' ) }>
                    <QueryControls
                        { ...{ order, orderBy } }
                        numberOfItems={ postsToShow }
                        categoriesList={ categoriesList ? categoriesList : [] }						
                        selectedCategoryId={ categories }
                        onCategoryChange={ ( value ) => setAttributes( {
                            categories: '' !== value ? value : undefined
                        }) }
                        onOrderChange={ ( value ) => setAttributes( { order: value } ) }
                        onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
                        
                        onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
                    />
                    
                    <RangeControl
                            label={__('Number of columns')}
                            value={columns}
                            onChange={(value) => setAttributes({columns: value})}
                            min={1}
                            max={6}
                    /> 
                </PanelBody>
                { postLayout === 'slides' &&
                    <PanelBody title={ __( 'Slider settings' ) } initialOpen={false} >    

                        <ToggleControl
                            label={ __( 'Automatisch scrollen' ) }
                            checked={ autoScroll }
                            onChange={ ( value ) => setAttributes( { autoScroll: value } ) }
                        />

                        <RangeControl
                                label={__('Number of columns')}
                                value={columns}
                                onChange={(value) => setAttributes({columns: value})}
                                min={1}
                                max={6}
                        />
                        
                        <RangeControl
                                label={__('Aantal scrollen')}
                                value={slidesToScroll}
                                onChange={(value) => setAttributes({slidesToScroll: value})}
                                min={1}
                                max={6}
                        />

                        <RangeControl
                            label={ __( 'Scroll Snelheid (Ms)' ) }
                            value={ scrollSpeed }
                            onChange={ ( value ) => setAttributes( { scrollSpeed: value } ) }
                            min={ 500 }
                            max={ 5000 }
                            step={ 100 }
                        />
                    
                    </PanelBody>
                }
            </InspectorControls>
        ); 
    } 
}