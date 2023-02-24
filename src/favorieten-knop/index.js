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

export const name = 'indrukwekkend/favorietenknop';

export const settings = {
	title: __( 'favorieten' ),
	icon: 'welcome-add-page',
	category: 'indrukwekkend',
	keywords: [ __( 'favorieten' ), __( 'post' ) ],
	supports: {
		align: [ 'wide' ],
		html: false,
	},
	edit,
	//Collapse,
};

