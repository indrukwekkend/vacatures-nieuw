<?php
/**
 *
 * @package WordPress
 * 
 * 
 * Renders the `core/bussiness-card-vacatures` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the project content with latest vacatures added.
 * 
 * Gebruikt de helperfuncties in de algemene folder
 * Dit om de code te hergebruiken. Ook in All-vacatures-grid en anderen
 * Gebruik daarom ook de Namespace. Dit zorgt voor het niet dubbel gebruiken van functies.
 * 
 */

namespace IndrukwekkendVacatures\VacatureInfo;

function renderCallback($attributes) {
	ob_start(); 
	$attributes['id'] = get_the_ID();
	?>
	<div class="info-update-me"><pre style="display: none;"><?php echo wp_json_encode($attributes) ?></pre></div>
	<?php return ob_get_clean();
}



/**
 * Registers the `indrukwekkend/bussiness-card` block on server.
 */
function register_block_indrukwekkend_vacature_info() {

	// opaheln uit de database
	$bearerToken = get_option( 'bearerToken' );
	$formsoort = get_option( 'formsoort' );

	register_block_type(
		'indrukwekkend/vacature-info',
		array(
			'attributes' => array(
				'align'                   => array(
					'type' => 'string',
					'enum' => array( 'left', 'center', 'right', 'wide', 'full' ),
					'default' => 'wide',
				),
				'bearertoken' => array(
					'type' => 'string',
					'default' => $bearerToken,
				),
				'formsoort' => array(
					'type' => 'string',
					'default' => $formsoort,
				),
				'className' => array(
					'type' => 'string',
				),
			),
			'render_callback' => __NAMESPACE__.'\renderCallback',
		)
	);
}

add_action( 'init', __NAMESPACE__.'\register_block_indrukwekkend_vacature_info' );
