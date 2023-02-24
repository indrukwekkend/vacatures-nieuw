<?php
/**
 * Server-side rendering of the `core/latest-vacatures` block.
 *
 * @package WordPress
 */

/**
 * Renders the `core/latest-vacatures` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the vacature content with latest vacatures added.
 */

 namespace IndrukwekkendVacatures\AllVacaturesGrid;

function renderCallback($attributes) {
	ob_start(); ?>
	<div class="boilerplate-update-me"><pre style="display: none;"><?php echo wp_json_encode($attributes) ?></pre></div>
	<?php return ob_get_clean();
}

/**
 * Registers the `core/latest-posts` block on server.
 * Alle Attributes worden hier geregistreerd
 * Callback is React geworden
 */
function register_block_indrukwekkend_all_vacatures_grid() {
	register_block_type(
		'indrukwekkend/all-vacatures-grid',
		array(
			'attributes'      => array(
				'align'                   => array(
					'type' => 'string',
					'enum' => array( 'left', 'center', 'right', 'wide', 'full' ),
					'default' => 'wide',
				),
				'className'               => array(
					'type' => 'string',
				),
				'categories'   => array(
					'type' => 'string',
					'default' => '',
				),
				'postsToShow'             => array(
					'type'    => 'number',
					'default' => 3,
				),
				'displayPostContentRadio' => array(
					'type'    => 'string',
					'default' => 'excerpt',
				),
				'displayThumbnail'      => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayMeta'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayFilter'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displaySearch'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayFunctie'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayTelefoon'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayMobiel'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayLocatie'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayLocatie2'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayUren'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayDatum1'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayDatum2'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayVakgebied'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayNiveau'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayErvaring'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displaySchaal'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayBedrag'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayPostContent'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'excerptLength'           => array(
					'type'    => 'number',
					'default' => 55,
				),
				'postLayout'              => array(
					'type'    => 'string',
					'default' => 'grid',
				),
				'columns'                 => array(
					'type'    => 'number',
					'default' => 3,
				),
				'autoScroll' => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'slidesToScroll' => array(
					'type'    => 'number',
					'default' => 1,
				),
				'scrollSpeed' => array(
					'type'    => 'number',
					'default' => 500,
				),
				'order'                   => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'orderBy'                 => array(
					'type'    => 'string',
					'default' => 'date',
				),
				'displayLink'          => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayPijltje'          => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'textLink'          => array(
					'type'    => 'string',
					'default' => 'Lees verder',
				),
				'displayPostPaginateRadio' => array(
					'type'    => 'string',
					'default' => '',
				),
				'displayButtonContentRadio' => array(
					'type'    => 'string',
					'default' => 'is-style-outline',
				),
				'text' => array(
					'type'    => 'string',
					'default' => 'Alle vacatures',
				),
				'episodeURL' => array(
					'type'    => 'string',
					'default' => '',
				)
			),
			// 'render_callback' => 'render_block_indrukwekkend_all_vacatures_grid',
			'render_callback' => __NAMESPACE__.'\renderCallback',
		)
	);
}
add_action( 'init', __NAMESPACE__.'\register_block_indrukwekkend_all_vacatures_grid' );
