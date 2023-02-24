<?php

namespace Indrukwekkendvacatures;

/**
 * IMage filters. Voeg de beschikbaarheid van custom images toe. 
 * Sinds versie 1.0.0
 * 
 * Namespaced om vaker te kunnen gebruiken
 * Grootte van de afbeelding voor Card views
 * Slider afbeeldingen nog niet
 * 
 */

add_action( 'init', __NAMESPACE__ . '\add_custom_image_sizes' );
add_filter( 'image_size_names_choose', __NAMESPACE__ . '\custom_sizes' );
add_filter( 'rest_prepare_vacatures', __NAMESPACE__ . '\featured_image_json', 10, 3 );

 /** 
 * Add custom image size for block featured image.
 * 
 * @link https://developer.wordpress.org/reference/functions/add_image_size/
 */

function add_custom_image_sizes() {
	add_image_size( 'vacaturesFeatImg', 430, 135, array( 'center', 'center' ) ); 
}

 /** 
 * Register custom image size with sizes list to make it available.
 * 
 * @link https://codex.wordpress.org/Plugin_API/Filter_Reference/image_size_names_choose
 */
function custom_sizes( $sizes ) {
	return array_merge( $sizes, array(
		'vacaturesFeatImg' => __('vacatures Featured Image'),
	) );
}

/**
 * 
 * Add the featured image to the REST API response.
 * 
 */

function featured_image_json( $data, $post, $context ) {
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

?>
