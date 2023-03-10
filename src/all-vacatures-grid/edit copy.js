/**
 * External dependencies
 */
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { isUndefined, pickBy } from 'lodash';
import classnames from 'classnames';
/**
 * Internal dependencies
 */
import Inspector from './inspector';
import VacatureItem from './components/Edit/VacatureItem';
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

//slick slider settings, TODO get from inspector
const settings = {
	dots: true,
	className: "center",
	centerMode: false,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1
};

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
			displayFilter,
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
					
					{ displayFilter && (
					
						<div className="filter">
							<div className="filter__item">
								<input type="checkbox" id="filter1" name="filter1" value="filter1" />
								<label htmlFor="filter1">Filter 1</label>
							</div>
						</div>
					) }

					<div className="main">
						{ postLayout === 'slides' && (
						<Slider {...settings}>

							{ displayPosts.map( ( post, i ) => {


								<VacatureItem post={post} />

							} ) }
						</Slider>
						) }
						
						{ postLayout != 'slides' && (


							<div className="content">
								hoi
							</div>
						
							
						)}
						
						{ displayPostPaginateRadio === 'button' && (
							<div className="content__button main-button">
								{ /* Niet ingevuld om perongeluk navigeren te vermijden */ }
								
								<div className={ 'wp-block-button ' + displayButtonContentRadio }>
									<a className="wp-block-button__link">
										<RichText
											placeholder={ placeholder || __( 'Add text???' ) }
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
