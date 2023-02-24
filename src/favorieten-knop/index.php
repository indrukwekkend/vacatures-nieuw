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

function render_block_indrukwekkend_favorieten( $attributes ) {

	$socials = '';

	$socials .=
	"<div id='search' class='search-box'>
		
			<form role='search' method='get' class='search-form-header' action='/'>
					<label>
							<span class='screen-reader-text'>Zoeken naar:</span>
							<input type='search' class='search-field' placeholder='Zoeken …' value='' name='s'>
					</label>
					<button type='submit' class='search-submit'>Zoeken</button>
			</form>
			
	</div>";

		$socials .=
			"<a href='#' id='search-button' title='Zoek Filter openen' class='search-button'>
				<div class='closed'>	
					<span>
					<i class='fa-regular fa-magnifying-glass'></i>
					</span>
					<span class='onderschrift'>Zoeken</span>
				</div>
				<div class='open'>
					<span>
					<i class='fa-regular fa-times'></i>
					</span>
					<span class='onderschrift'>Sluiten</span>
				</div>
			</a>";

		$socials .=
			"<a href='/favorieten-overzicht/' title='Favorieten Overzicht' class='favorieten-button'>
				<span>
					</i><i class='fa-regular fa-heart'></i>
				</span>
				<span class='onderschrift'>Favorieten</span>
				<span class='favorieten-knop-update-me'></span>
			</a>";

			$socials .=
			"<a href='#' id='jobalert' title='Job Alert Openen' class='job-button'>
				<span>
					</i><i class='fa-regular fa-bell'></i>
				</span>
				<span class='onderschrift'>Jobalert</span>
			</a>";

	

	//output
	return sprintf(
		'<div class="vacature-navigatie">
			%1$s
		</div>',
		$socials,
	);
}

/**
 * Registers the `indrukwekkend/faq` block on server.
 */
function register_block_indrukwekkend_favorieten() {
	register_block_type(
		'indrukwekkend/favorietenknop',
		array(
			'attributes'      => array(
				'className'               => array(
					'type' => 'string',
				),
			),
			'render_callback' => 'render_block_indrukwekkend_favorieten',
		)
	);
}
add_action( 'init', 'register_block_indrukwekkend_favorieten' );