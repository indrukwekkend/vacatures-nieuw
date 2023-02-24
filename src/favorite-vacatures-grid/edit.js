/**
 * External dependencies
 */
import { isUndefined, pickBy } from 'lodash';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { Component, RawHTML, Fragment } from '@wordpress/element';
import {
	Placeholder,
	Spinner,
	Toolbar,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { __ } from '@wordpress/i18n';
import {
	RichText,
	BlockControls,
	AlignmentToolbar,
	URLInputButton,
} from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';

/**
 * Module Constants
 */
const CATEGORIES_LIST_QUERY = {
	per_page: -1,
};
const MAX_POSTS_COLUMNS = 6;


class LatestvacaturesEdit extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			categoriesList: [],
			postTypeList: [],
		};
	}

	componentWillUnmount() {
		this.isStillMounted = false;
	}

	render() {
		const { attributes, setAttributes, latestPosts, postTypes } = this.props;
		const { categoriesList } = this.state;
		const {
			align,
			columns,
			displayButtonContentRadio,
			displayPostPaginateRadio,
			displayPostContent,
			displayThumbnail,
			displayPijltje,
			displayMeta,
			displayFunctie,
			displayLocatie,
			displayLocatie2,
			displayUren,
			displayDatum1,
			displayDatum2,
			displayNiveau,
			displaySchaal,
			displayBedrag,
			displayVakgebied,
			displayNummer,
			postLayout,
			placeholder,
			text,
			textLink,
			episodeURL,
			postsToShow,
			excerptLength,
		} = attributes;

		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;
		// const hasPostTypes = Array.isArray( postTypes ) && postTypes.length;
		

		if ( ! hasPosts ) {
			return (
				<Fragment>
					<Inspector { ...{ setAttributes, ...this.props } } />
					<Placeholder
						icon="admin-post"
						label={ __( 'No Posts Available' ) }
					>
						{ ! Array.isArray( latestPosts ) ?
							<Spinner /> :
							__( 'No posts found.' )
						}
					</Placeholder>
				</Fragment>
			);
		}

		const displayPosts = latestPosts.length > postsToShow ?
			latestPosts.slice( 0, postsToShow ) :
			latestPosts;

		//const dateFormat = __experimentalGetSettings().formats.date;

		const onChangeEpisodeURL = newEpisodeURL => {
			setAttributes( { episodeURL: newEpisodeURL } );
		};

		const layoutControls = [
			{
				icon: 'grid-view',
				title: __( 'Grid View' ),
				onClick: () => setAttributes( { postLayout: 'grid' } ),
				isActive: postLayout === 'grid',
			},
			{
			    icon: 'list-view',
			    title: __( 'List View' ),
			    onClick: () => setAttributes( { postLayout: 'list' } ),
			    isActive: postLayout === 'list',
			},
			{
				icon: 'slides',
				title: __( 'Slides View' ),
				onClick: () => setAttributes( { postLayout: 'slides' } ),
				isActive: postLayout === 'slides',
			},
		];

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
					/>

					<Toolbar controls={ layoutControls } />

				</BlockControls>

				<Inspector { ...{ setAttributes, ...this.props } } />
				<section
					className={ classnames( this.props.className, {
						cards: postLayout === 'grid',
						list: postLayout === 'list',
						slider: postLayout === 'slider',

						paginate: displayPostPaginateRadio === 'paginate',
						knoppen: displayPostPaginateRadio === 'button',
						[ `columns-${ columns }` ]: postLayout === 'grid',
					} ) }
				>
					<div className="ajax_vacatures_content">

						{ displayPosts.map( ( post, i ) => {
							const titleTrimmed = post.title.rendered.trim();

							let excerpt = post.excerpt.rendered;

							// if ( post.excerpt.raw === '' ) {
							// 	excerpt = post.content.raw;
							// }

							const featImg = imageURL => {
								//console.info(post);
								return imageURL ? imageURL : '';
							};

							const hasFeatImg = imageURL => {
								return imageURL && displayThumbnail ? true : false;
							};

							// eslint-disable-next-line no-console
							// console.info( post );
							const excerptElement = document.createElement( 'div' );
							excerptElement.innerHTML = excerpt;
							excerpt = excerptElement.textContent || excerptElement.innerText || '';
							return (
								<article className="card" key={ i }>
									<a rel="noreferrer noopener">
										<div className={ classnames( 'card-content', {
											'has-thumbnail': hasFeatImg( post.featured_media ),
										} ) }
										>
											<div className="card-content-container">
											
											{ displayThumbnail && hasFeatImg( post.featured_media ) &&
												<picture className="thumbnail">
													<img src={ featImg( post.featured_image_cardFeatImg_url ) } alt="afbeelding van { titleTrimmed }" />
												</picture>
											}

											<div className="card-content__post-title">
												{ titleTrimmed ? (
													<h3>
														{ titleTrimmed }
														{ displayLocatie &&
															<span className="card-content__post-meta-locatie">
																&nbsp;
																{post.meta.vacatures_locatie} 
															</span>
														}
													</h3>
												) :
													__( '(no title)' )
												}
											</div>

											{displayMeta &&
													<div class="card-content__post-meta">
														
														{ displayFunctie &&
															<span className="card-content__post-meta-functie">
																{post.meta.vacatures_functie} 
															</span>
														}

														{ displayLocatie2 &&
															<span className="card-content__post-meta-uren">
																{post.meta.vacatures_locatie2} 
															</span>
														}

														{ displayUren &&
															<span className="card-content__post-meta-uren">
																{post.meta.vacatures_uren} 
															</span>
														}

														{ displayDatum1 &&
															<span className="card-content__post-meta-datum1">
																{post.meta.vacatures_datum1} 
															</span>
														}

														{ displayDatum2 &&
															<span className="card-content__post-meta-datum1">
																{post.meta.vacatures_datum2} 
															</span>
														}
														
														{ displayNiveau &&
															<span className="card-content__post-meta-niveau">
																{post.meta.vacatures_niveau} 
															</span>
														}

														{ displaySchaal &&
															<span className="card-content__post-meta-schaal">
																{post.meta.vacatures_schaal} 
															</span>
														}
														{ displayBedrag &&
															<span className="card-content__post-meta-bedrag">
																{post.meta.vacatures_bedrag} 
															</span>
														}

													</div>
											}
											
											{ displayPostContent &&
											<div className="card-content__post-excerpt">
												<RawHTML
													key="html"
												>
													{ excerptLength < excerpt.trim().split( ' ' ).length ?
														excerpt.trim().split( ' ', excerptLength ).join( ' ' ) + ' ... <a href=' + post.link + 'target="_blank" rel="noopener noreferrer">' + __( 'Read more' ) + '</a>' :
														excerpt.trim().split( ' ', excerptLength ).join( ' ' ) }
												</RawHTML>
											</div>
											}
										</div>
										
										{ displayPijltje &&
										<div className="footer">{ textLink }</div>
										}
										</div>
									</a>
								</article>
							);
						} ) }
						{ displayPostPaginateRadio === 'button' && (
							<div className="content__button main-button">
								{ /* Niet ingevuld om perongeluk navigeren te vermijden */ }
								
								<div className={ 'wp-block-button ' + displayButtonContentRadio }>
									<a className="wp-block-button__link">
										<RichText
											placeholder={ placeholder || __( 'Add text…' ) }
											value={ text }
											onChange={ ( value ) => setAttributes( { text: value } ) }
										/>
									</a>
								</div>
								<URLInputButton
									className="podkit-dropdown__input"
									label={ __( 'Episode URL', 'podkit' ) }
									onChange={ onChangeEpisodeURL }
									url={ episodeURL }
								/>
							</div>
						) }

					</div>
				</section>
			</Fragment>
		);
	}
}

export default withSelect( ( select, props ) => {
	const { postsToShow,
		order,
		orderBy,
		categories,
	} = props.attributes;
	const { getEntityRecords } = select( 'core' );
	//switch de categorie om de lege string te vervangen
	const soort = (categories==='') ? undefined : categories
	const latestPostsQuery = pickBy( {
		soortvacature: soort,
		order,
		orderby: orderBy,
		per_page: postsToShow,
	}, ( value ) => ! isUndefined( value ) );
	return {
		latestPosts: getEntityRecords( 'postType', 'vacature', latestPostsQuery ),

	};
} )( LatestvacaturesEdit );
