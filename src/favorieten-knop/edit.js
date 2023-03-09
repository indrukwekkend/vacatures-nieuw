/**
 * External dependencies
 */


 /**
	* WordPress dependencies
	*/
  import { __ } from '@wordpress/i18n';
 
  export default function navigatie( { attributes, setAttributes, className } ) {
  
    return [
          <div 			
            className='navigatie'
          >
              <span className='text'>
                <a href='#'>Navigatie</a>
              </span>
      </div>
    ];
  }