<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package vacatures
 */

namespace Indrukwekkendvacatures;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

include '_phpHelpers/helpers.php';
//laad de frontend PHP blokken in:
include 'vacature-info'.'/index.php';
include 'all-vacatures-grid'.'/index.php';
include 'favorite-vacatures-grid'.'/index.php';
include 'favorieten-knop'.'/index.php';
include 'vacature-knop'.'/index.php';


add_filter( 'block_categories_all', __NAMESPACE__ . '\indrukwekkend_categories', 10, 2 );
function indrukwekkend_categories( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'vacatures',//deze laten staan
				'title' => __( 'vacatures', 'indrukwekkend' ),//deze kun je aanpassen
				'icon'  => 'universal-access',
			),
		)
	);
}
