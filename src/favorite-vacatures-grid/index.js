/**
 * BLOCK: indrukwekkend-blocks
 *
 * Registering a Grid Vacatures.
 * Géén Save, vanwege frontend PHP block
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

//  Import CSS.
import './editor.scss';
import './style.scss';
/**
 * Internal dependencies
 */
import edit from './edit';

export const name = 'indrukwekkend/favorieten-vacatures-grid';

export const settings = {
	title: __( 'Favoriete vacatures' ),
	description:'Laat alle vacatures zien op basis van de, door de gebruiker, geselecteerde favorieten. ',
	icon: 'grid-view',
	category: 'vacatures',
	keywords: [ __( 'grid' ), __( 'vacatures' ), __( 'favorieten' ), 'banen' ],
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	edit,
};
