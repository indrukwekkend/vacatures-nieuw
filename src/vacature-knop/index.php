<?php
/**
 * Server-side rendering of the `indrukwekkend/socialmedia` block.
 *
 * @package WordPress
 */

/**
 * Renders the `indrukwekkend/socialmedia` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with latest posts added.
 * 
 *  based on https://codepen.io/Coding_Journey/pen/RwNgYmm
 * 
 */

function render_block_indrukwekkend_vacatureknop( $attributes ) {

	$socials = '';

	$socials .=
		"<div class='wp-block-button is-style-cta'>
		<a class='wp-block-button__link wp-element-button' href='/vacature-overzicht/' rel='zoek vacatures'>
			Zoek <span class='vacature-aantal-update-me'></span> Vacatures
		</a>
		</div>";
	
	//output
	return sprintf(
		'<div class="vacature-button">
			%1$s
		</div>',
		$socials,
	);
}

/**
 * Registers the `indrukwekkend/faq` block on server.
 */
function register_block_indrukwekkend_vacatureknop() {
	register_block_type(
		'indrukwekkend/vacatureknop',
		array(
			'attributes'      => array(
				'className'               => array(
					'type' => 'string',
				),
			),
			'render_callback' => 'render_block_indrukwekkend_vacatureknop',
		)
	);
}
add_action( 'init', 'register_block_indrukwekkend_vacatureknop' );