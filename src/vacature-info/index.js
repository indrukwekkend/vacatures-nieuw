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

//  Import Dependencies.
import './editor.scss';
import './style.scss';
// import metadata from './block.json';

import edit from "./edit";

export const name = 'indrukwekkend/vacature-info';

export const settings = {
	title: __( 'Kaartje Vacature' ),
	description: __( 'Gegevens van de vacature, in het overzicht' ),
	category: 'vacatures',
	supports: {
		align: [ 'wide', 'center' ],
		html: false,
		multiple: false,
		reusable: false,
		inserter: true,
	},
	edit,
};
