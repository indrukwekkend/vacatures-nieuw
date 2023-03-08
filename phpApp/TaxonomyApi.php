<?php
/**
 * Wordpress API Class.
 *
 * @package indrukwekkend-vacatures
 * 
 * Maakt de Custom endpoints van de API aan:
 * 
 * Settings (RW) voor de backend het "kaartje" blok
 * Vacature lijst voor de frontend search
 * 
 * TODO:
 * In de lijst, nog alle (3) de categorieen toevoegen aan de zoekmodule
 * 
 *
 */

 namespace IndrukwekkendVacatures;

use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;
use WP_Query;
use WP_Post;
use stdClass;

/**
 * Class TaxonomyAPI.
 */
class TaxonomyApi {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->init();
	}

	/**
	 * Initialize.
	 */
	private function init() {
		/**
		 * Register Rest Api Endpoints Routes.
		 */
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}


	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes(): void {

		/**
		 * Register search api.
		 * e.g. https://vacature-website.local/wp-json/iv/v1/search?q='Hello'&category=23,43&post_tag=23,32&page_no=1&posts_per_page=9
		 */
		register_rest_route(
			INDRUKWEKKEND_VACATURES_NAMESPACE,
			'/filter',
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get_taxonomy_terms' ],
				'permission_callback' => '__return_true',
				'args'                => [
					'taxonomy' => [
						'name'          => 'werkveld',
					],
				],
			]
		);

		
	}




	/**
	 * Get the items for vacature choices.
	 *
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return WP_REST_Response
	 */

	public function get_taxonomy_terms( WP_REST_Request $request ): WP_REST_Response {
		
		$taxonomy = $request->get_param( 'taxonomy' );

		$terms = get_terms( $taxonomy, array(
			'hide_empty' => true,
			'post_type' => 'vacature',
		) );
		$response = $this->build_response( $terms );

		return rest_ensure_response( $response );
	}

	/**
	 * Build response.
	 *
	 * @param array $terms Terms.
	 *
	 * @return array
	 */
	public function build_response( array $terms ): array {
		$response = [];
		foreach ( $terms as $term ) {
			$response[] = [
				'id'   => $term->term_id,
				'name' => $term->name,
				'taxonomy' => $term->taxonomy,
				'count' => $term->count,
			];
		}
		return $response;
	}

	/**
	 * Calculate page count.
	 *
	 * @param int $total_found_posts Total posts found.
	 * @param int $post_per_page     Post per page count.
	 *
	 * @return int
	 */
	public function calculate_page_count( int $total_found_posts, int $post_per_page ): int {
		if ( empty( $total_found_posts ) || empty( $post_per_page ) ) {
			return 0;
		}
		return ( (int) ( $total_found_posts / $post_per_page ) + ( ( $total_found_posts % $post_per_page ) ? 1 : 0 ) );
	}

	/** 
	 * Check permissions for the request.
	 */
	public function check_permissions() {

		//hier nog verschillende functies maken voor verschillende situaties met een input parameter
			return current_user_can("edit_posts");
			// return true;
	}
}
