/**
 * External dependencies
 */


 /**
	* WordPress dependencies
	*/
  import { __ } from '@wordpress/i18n';
 
  export default function navigatie( { attributes, setAttributes, className } ) {
  
    return [
      <div className='wp-block-button is-style-cta'>
        <a className='wp-block-button__link wp-element-button'>
          Zoek <span className='vacature-aantal-update-me'></span> Vacatures
        </a>
      </div>
    ];
  }