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

 include 'components/jobalert.php';


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

			$socials .=
			'<!-- Hamburger navigation -->
      <button class="hamburger hamburger--spin" type="button">
        <span class="hamburger-title">Menu</span>
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>';

			// $socials .= 
			// '<!-- mobile or hidden navigation -->
			// <header class="mobile-navigation-container start">
			
			// 		<nav class="nav-mobile">
			// 			<div class="search">
							
			// 				<form action="/?s" method="get" class="search-form">
			// 					<i class="fas fa-search"></i>
			// 					<span class="widget">
			// 						<input class="input-legacy  input-legacy--button input-legacy--open footer__input" type="search" name="s" placeholder="Zoeken">
			// 					</span>
			// 				</form>
			// 			</div>

		 
			// 		</nav>
			// </header>';

			$jobalert = create_vacature();

	//primary nav
	$nav_primary = "";
	if (has_nav_menu('primary_navigation'))	:
		$nav_primary .= wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav', 'echo' => false]) ;
	endif;

	

	//output
	return sprintf(
		'<div class="vacature-navigatie">
			%1$s
		</div>
		<script>
			var mobileHeader = document.createElement("header");
			mobileHeader.className = "mobile-navigation-container";
			mobileHeader.innerHTML = `<nav class="nav-mobile">%2$s</nav>`;
			document.body.appendChild(mobileHeader);
		</script>
		<script>
			var jobalert = document.createElement("div");
			jobalert.id = "jobalert-holder";
			jobalert.innerHTML = `%3$s`;
			document.body.appendChild(jobalert);
		</script>
		',
		$socials,
		$nav_primary,
		$jobalert
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