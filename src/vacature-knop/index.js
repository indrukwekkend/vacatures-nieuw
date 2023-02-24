/**
 * BLOCK: indrukwekkend-blocks
 *
 * Registering a basic block with Gutenberg.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */ 
import edit from './edit';

export const name = 'indrukwekkend/vacatureknop';

export const settings = {
	title: __( 'vacature knop' ),
	icon: 'welcome-add-page',
	category: 'indrukwekkend',
	keywords: [ __( 'vacature knop' ), __( 'post' ) ],
	supports: {
		align: [ 'wide' ],
		html: false,
	},
	edit,
	//Collapse,
};

