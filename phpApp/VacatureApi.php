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
 * Class VacatureAPI.
 */
class VacatureApi {

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
			'/vacature-settings',
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get_block_setting' ],
				//nog met persission callback werken
				'permission_callback' => '__return_true',
			]
		);

		register_rest_route(
			INDRUKWEKKEND_VACATURES_NAMESPACE,
			'/vacature-settings',
			[
				'methods'             => WP_REST_Server::EDITABLE,
				'callback'            => [ $this, 'update_block_setting' ],
				//nog met persission callback werken
				'permission_callback' => [ $this, 'check_permissions' ],
				// 'permission_callback' => '__return_true',
				
			]
		);

		/**
		 * Register single vacature api endpoint.
		 * e.g. https://http://vacature-website.local/wp-json/iv/v2/vacature-lijst?post_type=vacature
		 */

		register_rest_route(
			INDRUKWEKKEND_VACATURES_NAMESPACE,
			'/vacature-single',
			[
				'methods'             => 'GET',
				'callback'            => [ $this, 'get_single' ],
				'permission_callback' => '__return_true',
				'args'                => [
					'id' => [
						'required'          => true,
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_text_field',
					],
				],
			]
		);
		/**
		 * Register vacaturelijst api endpoint.
		 * e.g. https://http://vacature-website.local/wp-json/iv/v2/vacature-lijst?post_type=vacature
		 */
		register_rest_route(
			INDRUKWEKKEND_VACATURES_NAMESPACE,
			'/vacature-lijst',
			[
				'methods'             => ['GET', 'POST'],
				'callback'            => [ $this, 'get_items' ],
				'permission_callback' => '__return_true',
				'args'                => [
					'q' => [
						'required'          => false,
						'type'              => 'string',
						'description'       => esc_html__( 'Search Query', 'ex' ),
						'sanitize_callback' => 'sanitize_text_field',
					],
					'post_type' => [
						'required'          => false,
						'type'              => 'string',
						'description'       => esc_html__( 'Search Query', 'ex' ),
						'sanitize_callback' => 'sanitize_text_field',
					],
					'categories' => [
						'required'          => false,
						'type'              => 'string',
						'description'       => esc_html__( 'Categories', 'ex' ),
						'sanitize_callback' => 'sanitize_text_field',
					],
					'tags' => [
						'required'          => false,
						'type'              => 'string',
						'description'       => esc_html__( 'Tags', 'ex' ),
						'sanitize_callback' => 'sanitize_text_field',
					],
					'page_no' => [
						'required'          => false,
						'type'              => 'string',
						'description'       => esc_html__( 'Page no', 'ex' ),
						'sanitize_callback' => 'sanitize_text_field',
					],
					'posts_per_page' => [
						'required'          => false,
						'type'              => 'string',
						'description'       => esc_html__( 'Posts per page', 'ex' ),
						'sanitize_callback' => 'sanitize_text_field',
					],
				],
			]
		);
		
	}

	public function get_block_setting() {

    $block_setting = get_option( 'global_vacature_options' );

    $response = new WP_REST_Response( $block_setting );
    $response->set_status(200);

		// var_dump($response);

    return rest_ensure_response( $response );
	}

	public function update_block_setting( $request ) {

    $new_block_setting = $request->get_body();
    update_option( 'global_vacature_options', $new_block_setting );

    $block_setting = get_option( 'global_vacature_options' );
    $response = new WP_REST_Response( $block_setting );
    $response->set_status(201);

    return rest_ensure_response( $response );
	}


	/**
	 * Get the items for vacature choices.
	 *
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return WP_REST_Response
	 */
	public function get_items( WP_REST_Request $request ): WP_REST_Response {
		$post_type			= $request->get_param( 'post_type' );
		$post_in			= $request->get_param( 'post_in' );
		$search_term    = $request->get_param( 'q' );
		$category_ids   = $request->get_param( 'category' );
		$werkvelden_ids   = $request->get_param( 'werkvelden' );
		$niveau_ids   = $request->get_param( 'niveaus' );
		$ervaring_ids   = $request->get_param( 'ervaringen' );

		$tag_ids        = $request->get_param( 'post_tag' );
		$page_no        = $request->get_param( 'page_no' );
		$posts_per_page = $request->get_param( 'posts_per_page' );
		$search_query   = [
			'post_type'              => $post_type ? $post_type : 'post',
			'posts_per_page'         => $posts_per_page ? intval( $posts_per_page ) : 9,
			'post_status'            => 'publish',
			'paged'                  => $page_no ? intval( $page_no ) : 1,
			'update_post_meta_cache' => false,
			'update_post_term_cache' => false,
			'tax_query' => [],
		];

		//Add post in args
		if ( ! empty( $post_in ) ) {
			$search_query['post__in'] = $post_in;
		} 
		if (isset ($post_in) && empty($post_in)) {
			return new WP_REST_Response( [] );
		}

		// Add search query args.
		if ( ! empty( $search_term ) ) {
			$search_query['s'] = $search_term;
		}

		// Add tax_query_array args.
		if ( ! empty( $category_ids ) || ! empty( $tag_ids ) ) {
			$search_query['tax_query'] = [];
		}

		// Add category query args.
		if ( ! empty( $category_ids ) ) {
			$search_query['tax_query'][] = [
				'taxonomy' => 'category',
				'field'    => 'id',
				'terms'    => array_map( 'intval', explode( ',', $category_ids ) ),
				'operator' => 'IN',
			];
		}

		// Add tags query args.
		if ( ! empty( $tag_ids ) ) {
			$search_query['tax_query'][] = [
				'taxonomy' => 'post_tag',
				'field'    => 'id',
				'terms'    => array_map( 'intval', explode( ',', $tag_ids ) ),
				'operator' => 'IN',
			];
		}

		// Add werkvelden query args.
		if ( ! empty( $werkvelden_ids ) ) {
			$search_query['tax_query'][] = [
				'taxonomy' => 'werkveld',
				'field'    => 'id',
				'terms'    => $werkvelden_ids ,
				'operator' => 'IN',
			];
		}
		//add niveaus query args
		if ( ! empty( $niveau_ids ) ) {
			$search_query['tax_query'][] = [
				'taxonomy' => 'niveau',
				'field'    => 'id',
				'terms'    => $niveau_ids ,
				'operator' => 'IN',
			];
		}
		//add ervaring query args
		if ( ! empty( $ervaring_ids ) ) {
			$search_query['tax_query'][] = [
				'taxonomy' => 'ervaring',
				'field'    => 'id',
				'terms'    => $ervaring_ids ,
				'operator' => 'IN',
			];
		}


		$results = new WP_Query( $search_query );

		$response = $this->build_response( $results );

		return rest_ensure_response( $response );
	}

		/**
	 * Get the items for vacature choices.
	 *
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return WP_REST_Response
	 */
	public function get_single( WP_REST_Request $request ): WP_REST_Response {
		$post_type			= $request->get_param( 'post_type' );
		$post_id			= $request->get_param( 'id' );
		$search_query   = [
			'post_type'              => $post_type ? $post_type : 'vacature',
			'posts_per_page'         => 1,
			'post_status'            => 'publish',
		];

		$results = new WP_Query( $search_query );

		$response = $this->build_single_response( $results );

		return rest_ensure_response( $response );
	}

	/**
	 * Build the response data for choices list.
	 *
	 * @param object $results List of choices.
	 *
	 * @return stdClass
	 * @since 1.0.0
	 * 
	 */
	private function build_response( object $results ): stdClass {
		$the_posts = [];

		if ( ! empty( $results->posts ) && is_array( $results->posts ) ) {
			foreach ( $results->posts as $the_post ) {
				if ( ! $the_post instanceof WP_Post || empty( $the_post ) ) {
					continue;
				}
				$meta=[];

				$id = $the_post->ID;
				$thumbnail = get_the_post_thumbnail_url( $id, 'vacaturesFeatImg' );
				
				//todo kijk hiernaar... 
				$post_excerpt = get_the_excerpt();
				if ( ! ( $post_excerpt ) ) {
					$post_excerpt = get_the_content();
				}
				$trimmed_excerpt = esc_html( wp_trim_words( $post_excerpt, $excerpt_length=20, ' &hellip; ' ) );
				///

				$terms = get_the_terms( $id, 'werkveld' );
				$termnames = [];
				
				if($terms): 
					foreach ( $terms as $term ) {
						$termnames[] = $term->name;
					}
				endif;

				$niveau = get_the_terms( $id, 'niveau' );
				$niveaunames = [];

				if($niveau): 
					foreach ( $niveau as $term ) {
						$niveaunames[] = $term->name;
					}
				endif;

				$ervaring = get_the_terms( $id, 'ervaring' );
				$ervaringnames = [];

				if($ervaring): 
					foreach ( $ervaring as $term ) {
						$ervaringnames[] = $term->name;
					}
				endif;
				

				$meta = [
					'locatie' => get_post_meta( $id, 'vacatures_locatie', true ),
					'functie' => get_post_meta( $id, 'vacatures_functie', true ),
					'uren' => get_post_meta( $id, 'vacatures_uren', true ),
					'contract' => get_post_meta( $id, 'vacatures_contract', true ),
					'datum1' => get_post_meta( $id, 'vacatures_datum1', true ),
					'datum2' => get_post_meta( $id, 'vacatures_datum2', true ),
					'niveau' => get_post_meta( $id, 'vacatures_niveau', true ),
					'schaal' => get_post_meta( $id, 'vacatures_schaal', true ),
					'bedrag' => get_post_meta( $id, 'vacatures_bedrag', true ),
					'recruiter' => get_post_meta( $id, 'vacatures_recruiter_ID', true ),
				];	

				$the_posts[] = [
					'id'        => $id,
					'title'     => $the_post->post_title,
					'content'   => $trimmed_excerpt,
					'date'      => wp_date( get_option( 'date_format' ), get_post_timestamp( $the_post ) ),
					'permalink' => get_the_permalink( $the_post ),
					'thumbnail' => $thumbnail,
					'meta' => $meta,
					'werkvelden' => $termnames,
					'niveau' => $niveaunames,
					'ervaring' => $ervaringnames,
				];
			}
		}

		// Get total number of pages.
		$total_pages = $this->calculate_page_count(
			$results->found_posts ?? 0,
			$results->query['posts_per_page'] ?? 0
		);

		// Return the formatted result.
		return (object) [
			'posts'          => $the_posts,
			'posts_per_page' => $results->query['posts_per_page'],
			'tax_query'     => $results->query['tax_query'],
			'total_posts'    => $results->found_posts,
			'no_of_pages'    => $total_pages,
			'current_page'   => $results->query['paged'],
		];
	}

	private function build_single_response( object $results ): stdClass {
		$the_posts = [];

		if ( ! empty( $results->posts ) && is_array( $results->posts ) ) {
			foreach ( $results->posts as $the_post ) {
				if ( ! $the_post instanceof WP_Post || empty( $the_post ) ) {
					continue;
				}
				$meta=[];

				$id = $the_post->ID;
				$thumbnail = get_the_post_thumbnail_url( $id, 'vacaturesFeatImg' );
				
				

				$terms = get_the_terms( $id, 'werkveld' );
				$termnames = [];
				
				if($terms): 
					foreach ( $terms as $term ) {
						$termnames[] = $term->name;
					}
				endif;

				$niveau = get_the_terms( $id, 'niveau' );
				$niveaunames = [];

				if($niveau): 
					foreach ( $niveau as $term ) {
						$niveaunames[] = $term->name;
					}
				endif;

				$ervaring = get_the_terms( $id, 'ervaring' );
				$ervaringnames = [];

				if($ervaring): 
					foreach ( $ervaring as $term ) {
						$ervaringnames[] = $term->name;
					}
				endif;
				

				$meta = [
					'locatie' => get_post_meta( $id, 'vacatures_locatie', true ),
					'functie' => get_post_meta( $id, 'vacatures_functie', true ),
					'uren' => get_post_meta( $id, 'vacatures_uren', true ),
					'contract' => get_post_meta( $id, 'vacatures_contract', true ),
					'datum1' => get_post_meta( $id, 'vacatures_datum1', true ),
					'datum2' => get_post_meta( $id, 'vacatures_datum2', true ),
					'niveau' => get_post_meta( $id, 'vacatures_niveau', true ),
					'schaal' => get_post_meta( $id, 'vacatures_schaal', true ),
					'bedrag' => get_post_meta( $id, 'vacatures_bedrag', true ),
					'recruiter' => get_post_meta( $id, 'vacatures_recruiter_ID', true ),
				];	

				$the_posts[] = [
					'id'        => $id,
					'title'     => $the_post->post_title,
					'date'      => wp_date( get_option( 'date_format' ), get_post_timestamp( $the_post ) ),
					'permalink' => get_the_permalink( $the_post ),
					'thumbnail' => $thumbnail,
					'meta' => $meta,
					'werkvelden' => $termnames,
					'niveau' => $niveaunames,
					'ervaring' => $ervaringnames,
				];
			}
		}

		// Get total number of pages.
		$total_pages = $this->calculate_page_count(
			$results->found_posts ?? 0,
			$results->query['posts_per_page'] ?? 0
		);

		// Return the formatted result.
		return (object) [
			'posts'   => $the_posts,
		];
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

