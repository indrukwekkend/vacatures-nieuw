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

export const name = 'indrukwekkend/all-vacatures-grid';

export const settings = {
	title: __( 'Alle vacatures' ),
	description:'Laat alle berichten van een pagina soort zien, bijvoorbeeld al het nieuws.',
	icon: 'grid-view',
	category: 'vacatures',
	keywords: [ __( 'grid' ), __( 'vacatures' ), __( 'alle' ), 'banen' ],
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	edit,
};
