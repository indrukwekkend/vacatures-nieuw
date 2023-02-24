<?php
/**
 * Custom IMage sizes Class voor de Vacatures.
 *
 * @package indrukwekkend-vacatures
 */

namespace IndrukwekkendVacatures;

/**
 * Class Assets.
 */
class Images {

	/**
	 * Constructor.
	 */
	public function __construct() {

		add_action( 'init', [ $this, 'add_custom_image_sizes' ] );
		add_filter( 'image_size_names_choose', [ $this, 'custom_sizes' ] );
		add_filter( 'rest_prepare_vacatures', [ $this, 'featured_image_json' ] , 10, 3 );
	}

	/**
	 * Initialize.
	 */
	public function add_custom_image_sizes() {
		add_image_size( 'vacaturesFeatImg', 430, 135, array( 'center', 'center' ) ); 
	}

	/**
	 * Add custom post type
	 */
	public function custom_sizes( $sizes ) {
		return array_merge( $sizes, array(
			'vacaturesFeatImg' => __('vacatures Featured Image'),
		) );
	}

	public function featured_image_json( $data, $post, $context ) {
	 // Get the featured image id from the REST API response.
	 $featured_image_id = $data->data['featured_media']; 
 
	 // Get the URL for a specific image size based on the image ID.
	 $featured_image_url = wp_get_attachment_image_src( $featured_image_id, 'vacaturesFeatImg' ); // get url of the original size
 
	 // If we have a URL, add it to the REST API response.
	 if( $featured_image_url ) {
		 $data->data['featured_image_cardFeatImg_url'] = $featured_image_url[0];
	 }
 
	 return $data;
 }
}
