import "./index.scss"

// console.log("Hello from the editor!");

/**
 * Internal dependencies
 * Hier kan een extra blok toegevoegd worden, die moet hieronder geregistreerd worden.
 */

import * as vacatureInfo from './vacature-info';
import * as allVacatures from './all-vacatures-grid';
import * as favorietenVacatures from './favorite-vacatures-grid';
import * as favorietenKnop from './favorieten-knop';
import * as vacatureKnop from './vacature-knop';


/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */

const registerBlock = ( block ) => {
	if ( ! block ) {
		return;
	}
	const { settings, name } = block;
	wp.blocks.registerBlockType( name, settings );
	// console.log( `Block '${ name }' registered.` );
};

/**
 * Function to register core blocks provided by the block editor.
 * This function is called on the `init` hook.
 * It is wrapped in a function to avoid the need to check whether the
 * block editor package is available.
 * 
 * Common blocks are grouped at the top to prioritize their display in the inserter.
 */
export const registerIndrukwekkendBlocks = () => {
	[
		vacatureInfo,
		allVacatures,
		favorietenVacatures,
		favorietenKnop,
		vacatureKnop,
		
	].forEach( registerBlock );
};

registerIndrukwekkendBlocks();
