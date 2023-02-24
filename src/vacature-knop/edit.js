/**
 * External dependencies
 */


 /**
	* WordPress dependencies
	*/
  import { __ } from '@wordpress/i18n';
 
  export default function navigatie( { attributes, setAttributes, className } ) {
  
    return [
      <div class='wp-block-button is-style-cta'>
        <a class='wp-block-button__link wp-element-button'>
          Zoek <span class='vacature-aantal-update-me'></span> Vacatures
        </a>
      </div>
    ];
  }