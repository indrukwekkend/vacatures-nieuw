<?php
/**
 * Taxonomy Class.
 *
 * @package indrukwekkend-vacatures
 */

namespace IndrukwekkendVacatures;

/**
 * Class Assets.
 */
class Taxonomy {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'init', [ $this, 'call_wp_add_taxonomy' ] );
	}

	/**
	 * Initialize.
	 */
	public function call_wp_add_taxonomy() {
		$cpts = array( 'vacature');
		$this->wp_add_taxonomy('werkveld', 'en', $cpts );
		$this->wp_add_taxonomy('niveau', 's', $cpts );
		$this->wp_add_taxonomy('ervaring', 'en', $cpts );
		$this->wp_add_taxonomy('contractsoort', 'en', $cpts );
		$this->ea_acf_film_page();

	}

	/**
	 * Add custom taxonomy
	 */
	public function wp_add_taxonomy($tax, $sen = 's' , $cpts = array(), $show_in_column = true ) {

		$tax = strtolower($tax);
		//meervoudsvorm
		$sen = strtolower($sen);
		$enkelvoud = ucfirst($tax);
		$meervoud = ucfirst($tax) . $sen;

		$labels = array(
			'name' => _x( $meervoud, 'taxonomy general name' ),
			'singular_name' => _x( $enkelvoud, 'taxonomy singular name' ),
			'search_items' =>  __( 'Zoek ' . $meervoud . '' ),
			'all_items' => __( 'Alle ' . $meervoud . '' ),
			'parent_item' => __( 'Hoofd ' . $enkelvoud . '' ),
			'parent_item_colon' => __( 'Hoofd (' . $enkelvoud . ') niveau:' ),
			'edit_item' => __( 'Pas (' . $enkelvoud . ') niveau aan' ), 
			'update_item' => __( 'Update ' . $enkelvoud . '' ),
			'add_new_item' => __( 'Voeg nieuw ' . $enkelvoud . ' toe' ),
			'new_item_name' => __( 'Nieuwe ' . $enkelvoud . ' Naam' ),
			'menu_name' => __( $meervoud ),
		);   
		
		$args = array(
			'hierarchical' => true,
			'labels' => $labels,
			'show_ui' => true,
			'show_admin_column' => $show_in_column,
			'show_in_rest'       => true,
			'query_var' => true,
			'rewrite' => array( 'slug' => $tax ),
		);
	 
		register_taxonomy($tax, $cpts, $args);
	}

	/**
	* Add custom Settings page
	*/
	public function ea_acf_film_page() {
    if ( function_exists( 'acf_add_options_sub_page' ) ){
 		 acf_add_options_sub_page( array(
			'title'      => 'Instellingen',
			'parent'     => 'edit.php?post_type=vacature',
			'capability' => 'edit_posts',
			) );
		}
	}

}
