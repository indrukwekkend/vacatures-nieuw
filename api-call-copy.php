<?php

/*
  Plugin Name: Vacature Plugin - Indrukwekkend  
  Version: 1.0
  Author: Hans-Peter Hioolen
  Author URI: https://github.com/hioolen
 * Plugin URI: https://github.com/indrukwekkend/vacatures
 * Description: Custom post type producten met Single-page Template en product overzicht in Guten blocks
 * Author: Hans-Peter Hioolen
 * Author URI: https://indrukwekkend.nl
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
*/

require_once 'vendor/autoload.php';


require_once($_SERVER['DOCUMENT_ROOT'] . "/wp-config.php");
$wp->init(); $wp->parse_request(); $wp->query_posts();
$wp->register_globals(); $wp->send_headers();

use IndrukwekkendVacatures\APICall;

// get a single database valu from wp_options


if ( class_exists( 'IndrukwekkendVacatures\API' ) ) {
	
  $vacatures = new APICall();
  // var_dump( $vacatures->get_vacatures() );



  $banen = $vacatures->get_vacatures();

  $losse_vacature = $banen['vacancy'][235];
  $aantal = $banen['numFound'];

  print_r($aantal);
  var_dump($losse_vacature);

	$flexitems = $losse_vacature['flexItems'];
	// single string: value = 1 of 2.
	// 'flexItemId' => int 130879745
  // 'id' => string 'FLEX-130879745-75901' (length=20)
  // 'type' => string 'FLEX' (length=4)
  // 'name' => string 'Soort vacature' (length=14)
  // 'value' => string '2' (length=1) // 1 = standaard, 2 = moeilijk
	var_dump($flexitems['flexItem'][0]['value']);

}

//vult nu niet de dBase, alleen testen
if (isset($banen)) {

	$id = $losse_vacature['vacancyId'];
	// $uren = numHoursPerWeek;
  // $datum = 

  $vacature = $losse_vacature;

	echo "page = Not exists, aanmaken<br>";
			
			$post_title = $vacature['vacancyName'];
			// remove all special characters, capital letters and spaces
			// replace space with hyphen
			$post_name = str_replace(' ', '-', $vacature['vacancyName']);//slug
			$post_name = strtolower($post_name);//slug
			$post_name = preg_replace('/[^A-Za-z0-9\-]/', '', $post_name);//slug
			$post_name = preg_replace('/-+/', '-', $post_name);//slug
			//slug
			$slug = sanitize_title($post_name);

			// Create description array
			$samenvatting = $vacature['advertText']['description'];

			// Create content string
			$content =
			'<!-- wp:columns {"align":"wide"} -->
			<div class="wp-block-columns alignwide"><!-- wp:column {"width":"66.66%","className":"tekst-kolom"} -->
			<div class="wp-block-column tekst-kolom" style="flex-basis:66.66%">
			<!-- wp:paragraph {"placeholder":"eerste regel"} -->
				<p class="film-intro">' . $samenvatting . '</p>
			<!-- /wp:paragraph -->';

			// $arrayLength = count($description_array);
			
			// $i = 2;
			// while ($i < $arrayLength)
			// {
			// 	$content .= '<!-- wp:paragraph {"className":"regular"} --><p class="regular">';
			// 	$content .=  $description_array[$i];
			// 	$content .= '</p><!-- /wp:paragraph -->';
			// 	$i++;
			// }

			$content .= '</div>

			<!-- /wp:column -->

			<!-- wp:column {"width":"33.33%","className":"afbeelding-kolom"} -->
			<div class="wp-block-column afbeelding-kolom" style="flex-basis:33.33%"><!-- wp:indrukwekkend/vacature-info /--></div>
			<!-- /wp:column --></div>
			<!-- /wp:columns -->';


			//Complete content object
			$my_post = array(
			  'post_title' 		    => $post_title,
				'post_content' 		  => $content,
				'post_excerpt'		  => $samenvatting,
				'post_date'			    => current_time('mysql'),
				'post_date_gmt' 	  => current_time('mysql',1),
				'post_modified'		  => current_time('mysql'),
				'post_modified_gmt' => current_time('mysql',1), 
				'post_type' 		    => 'vacature',
				'post_status'		    => 'draft',
				'post_name'			    =>  $post_name,
			);
			
			// Insert the post into the database
			// $wp_post_id = wp_insert_post( $my_post ); //ID van de net aangemaakte film + insert van nieuwe post
			// $log->lwrite('Film toegevoegd: , '. $post_title);
			
			//update metadata						
			// update_post_meta( $wp_post_id, 'vacatue_id', $prod_id ); 
			// update_post_meta( $wp_post_id, 'uren', $vacature["maccsboxtitlecode"] );
			// update_post_meta( $wp_post_id, 'datum1', true ); 
			// update_post_meta( $wp_post_id, 'datum2', true ); 
			// update_post_meta( $wp_post_id, 'niveau', $vacature["cast"]);
			// update_post_meta( $wp_post_id, 'schaal', $vacature["releaseyear"]);
			// update_post_meta( $wp_post_id, 'functie', $vacature["featurelength"]);

		
	




}

