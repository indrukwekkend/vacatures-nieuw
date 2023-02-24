<?php
/**
 * CPT Class.
 *
 * @package indrukwekkend-vacatures
 */

namespace IndrukwekkendVacatures;

/**
 * Class Assets.
 */
class CPT {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'init', [ $this, 'call_wp_add_custom_post_type' ] );
	}

	/**
	 * Initialize.
	 */
	public function call_wp_add_custom_post_type() {
		$supports = array( 'title', 'editor', 'excerpt','thumbnail', 'custom-fields');
		$this->wp_add_custom_post_type('vacature', 's', 'dashicons-universal-access', $supports );

	}

	/**
	 * Add custom post type
	 */
	public function wp_add_custom_post_type($cpt, $sen = 's' , $icon = 'dashicons-admin-post', $supports = array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'page-attributes', 'post-formats') ) {

		$cpt = strtolower($cpt);
		//meervoudsvorm
		$sen = strtolower($sen);
		$enkelvoud = ucfirst($cpt);
		$meervoud = ucfirst($cpt) . $sen;
		$slug_plural = $cpt . $sen;

		$labels = array(
			'name'               => _x( $meervoud, 'post type general name', 'indrukwekkend-vacatures' ),
			'singular_name'      => _x( $enkelvoud, 'post type singular name', 'indrukwekkend-vacatures' ),
			'menu_name'          => _x( $meervoud, 'admin menu', 'indrukwekkend-vacatures' ),
			'name_admin_bar'     => _x( $enkelvoud, 'add new on admin bar', 'indrukwekkend-vacatures' ),
			'add_new'            => _x( 'Add New', $enkelvoud, 'indrukwekkend-vacatures' ),
			'add_new_item'       => __( 'Add New ' . $enkelvoud .'', 'indrukwekkend-vacatures' ),
			'new_item'           => __( 'New ' . $enkelvoud .'', 'indrukwekkend-vacatures' ),
			'edit_item'          => __( 'Edit ' . $enkelvoud .'', 'indrukwekkend-vacatures' ),
			'view_item'          => __( 'View ' . $meervoud .'', 'indrukwekkend-vacatures' ),
			'all_items'          => __( 'All ' . $meervoud .'', 'indrukwekkend-vacatures' ),
			'search_items'       => __( 'Search ' . $enkelvoud .'', 'indrukwekkend-vacatures' ),
			'parent_item_colon'  => __( 'Parent ' . $enkelvoud .':', 'indrukwekkend-vacatures' ),
			'not_found'          => __( 'No ' . $meervoud .' found.', 'indrukwekkend-vacatures' ),
			'not_found_in_trash' => __( 'No ' . $meervoud .' found in Trash.', 'indrukwekkend-vacatures' )
		);
		
		$args = array(
			'labels'             => $labels,
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'show_in_rest'       => true,
			'query_var'          => true,
			'capability_type'    => 'post',
			// 'capabilities' => [
			// 	'create_posts' => 'create_' . $slug_plural,
			// 	'delete_others_posts' => 'delete_others_' . $slug_plural,
			// 	'delete_posts' => 'delete_' . $slug_plural,
			// 	'delete_private_posts' => 'delete_private_' . $slug_plural,
			// 	'delete_published_posts' => 'delete_published_' . $slug_plural,
			// 	'edit_posts' => 'edit_' . $slug_plural,
			// 	'edit_others_posts' => 'edit_others_' . $slug_plural,
			// 	'edit_private_posts' => 'edit_private_' . $slug_plural,
			// 	'edit_published_posts' => 'edit_published_' . $slug_plural,
			// 	'publish_posts' => 'publish_' . $slug_plural,
			// 	'read_private_posts' => 'read_private_' . $slug_plural,
			// 	'read' => 'read',
			// ],
			'has_archive'        => false,
			'hierarchical'       => false,
			'menu_position'      => null,
			'menu_icon'           => $icon,
			'supports'           => array( 'title', 'editor', 'excerpt','thumbnail', 'custom-fields'),
			);
	 
			register_post_type( $cpt, $args );
			
	}
}
