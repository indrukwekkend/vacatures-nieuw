<?php

/*
  API CALL voor CRONTAB
  Version: 1.0
  Author: Hans-Peter Hioolen
  Author URI: https://github.com/hioolen
 * Plugin URI: https://github.com/indrukwekkend/vacatures-nieuw
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


if ( class_exists( 'IndrukwekkendVacatures\API' ) ) {
	
  $vacatures = new APICall();
  // var_dump( $vacatures->get_vacatures() );

  $banen = $vacatures->get_vacatures();
  $aantal = $banen['numFound'];

}

// Path: api-call.php


if (isset($banen)) {

	// losse maken, vervangen voor een "For each loop"
	// $losse_vacature = $banen['vacancy'][6];

	$vacatures = $banen['vacancy'];

	foreach ($vacatures as $vacature ) {

		$vac_id = $vacature['vacancyId'];
	
		//check of de vacature bestaat en haal WP-ID op:
		$vacId = vac_exists($vac_id);
	
		// Voor welk platform?
		$publicatie_id          = $vacature['publication']['id'];
		$publicatie_active      = $vacature['publication']['active'];
	
		if ($publicatie_id != 1 ) {
			// echo 'Publicatie is niet voor de Website, dus overslaan<br>';
			continue;
		}
	
		//Als publicatie niet actief is, dan deactiveren
		if ($publicatie_active != 1 ) {

			if( $vacId !== false ) :
				//plaats de vacature dan op "concept" als hij al bestaat
				deactivate_vacature( $vacId );
				continue;
			else:	
				// doe anders niks, dat komt wel als hij actief geplaatst wordt
				continue;
			endif;
		}
	
		// var_dump($vacature);

		// Controleren of de vacature al bestaat, zo ja, updaten, zo nee, aanmaken
		if( $vacId !== false ) :
			// echo 'Vacature bestaat al: update vacature ' . $vacId .'<br>';
			update_meta( $vacId, $vacature);
			update_taxonomies( $vacId, $vacature);
			update_vacature( $vacId, $vacature );
			continue;
		else:
			// echo "page = Vacature bestaat nog niet: aanmaken<br>";
			create_vacature($vacature);
		endif;
	}
}


// functies

function vac_exists($id) {

	$args = array(
		'meta_query' => array(
				array(
						'key' => 'vacatures_id',
						'value' => $id,
						'compare' => '=',
				)
		),
		'post_type' => 'vacature',
		'posts_per_page' => -1,
		//alle posts, want ook draft bestaat al
		'post_status' => array( 'pending', 'draft', 'future', 'publish' )
	);
	$page = new WP_Query($args);

	if ( $page->have_posts() ) :
		$page->the_post();
		return get_the_ID();
	else:
		return false;
	endif;
}

function create_vacature($vacature) {

	// als de vacature nog niet bestaat, maken we hem aan:

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
	$advertText = $vacature['advertText'];
	$samenvatting = $advertText['subTitle'];

	$compensation = $advertText['compensation'];
	$subtitle = $advertText['subTitle'];

	$contactInfo = $advertText['contactInfo'];
	$jobRequirements = $advertText['jobRequirements'];
	$description = $advertText['description'];
	$displayOrganisation = $advertText['displayOrganisation'];
	$companyInformation = $advertText['companyInformation'];
	// $displayJobTitle = $advertText['displayJobTitle'];

	include 'inc/header-content.php';
	$content = $headerContent;
	// Create content string
	$content .=
	'<!-- wp:columns {"lock":{"move":true,"remove":true},"align":"wide",,"style":{"spacing":{"blockGap":{"top":"var:preset|spacing|50","left":"var:preset|spacing|50"}}}} -->
	<div class="wp-block-columns alignwide"><!-- wp:column {"width":"75%","templateLock":"all","lock":{"move":true,"remove":true},"className":"tekst-kolom verborgen"} -->
	<div class="wp-block-column tekst-kolom verborgen" style="flex-basis:75%">
	<!-- wp:group {"className":"verborgen","layout":{"type":"constrained"},"anchor":"api-content"} -->
	<div id="api-content" class="wp-block-group verborgen">
	
	<!-- wp:post-title /-->';

	if ($subtitle != '') {
		$content .= paragraph($subtitle, 'intro');
	}

	if ($description != '') {
		$functieTitel = get_field('functie_titel', 'option');	
		$content .= paragraph($description, 'beschrijving', $functieTitel);
	}

	if ($jobRequirements != '') {
		$content .= paragraph($jobRequirements, 'requirements', 'Jouw profiel' );
	}

	if ($compensation != '') {
		$content .= paragraph($compensation, 'compensatie', 'Het aanbod');
	}

	if ($companyInformation != '') {
		$content .= paragraph($companyInformation, 'organisatie-informatie', 'De organisatie');
	}

	if ($contactInfo != '') {
		$content .= paragraph($contactInfo, 'contact-info', 'De procedure');
	}
	
	// if ($displayOrganisation != '') {
	// 	$content .= paragraph($displayOrganisation, 'organisatie');
	// }
	
	$content .= '</div>
	<!-- /wp:group -->
	
	<!-- wp:buttons -->
	<div class="wp-block-buttons"><!-- wp:button {"className":"is-style-outline","anchor":"read-more"} -->
	<div class="wp-block-button is-style-outline" id="read-more"><a class="wp-block-button__link wp-element-button" rel="#">Lees meer</a></div>
	<!-- /wp:button --></div>
	<!-- /wp:buttons -->
	</div>
	<!-- /wp:column -->

	<!-- wp:column {"width":"33%","templateLock":"all","lock":{"move":true,"remove":true},"className":"afbeelding-kolom"} -->
	<div class="wp-block-column afbeelding-kolom" style="flex-basis:33%">
	<!-- wp:indrukwekkend/vacature-info /-->
	<!-- wp:indrukwekkend/recruiter-koppeling /-->
	</div>
	<!-- /wp:column --></div>
	<!-- /wp:columns -->


	<!-- wp:group {"templateLock":"all","lock":{"move":true,"remove":true},"align":"wide","style":{"spacing":{"padding":{"top":"var:preset|spacing|40","right":"var:preset|spacing|40","bottom":"var:preset|spacing|40","left":"var:preset|spacing|40"}}},"backgroundColor":"cta","layout":{"type":"constrained"}} -->
	<div class="wp-block-group alignwide has-cta-background-color has-background" id="form-holder" style="padding-top:var(--wp--preset--spacing--40);padding-right:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40);padding-left:var(--wp--preset--spacing--40)"><!-- wp:group {"layout":{"type":"constrained"}} -->
	<div id="form-container" class="wp-block-group"></div>
	<!-- /wp:group -->

	<!-- wp:html -->
	<div class="wp-block-button is-style-cta" id="solliciteer">

	<button class="wp-block-button__link wp-element-button" onclick="CXSForm.submit()">Solliciteer</button>
	</div>

	<!-- The container element to show after the form has been submitted -->
	<div id="thanks" class="col-md-12 alert alert-success text-center">
			We hebben je bericht ontvangen
	</div>
	<!-- /wp:html --></div>
	<!-- /wp:group -->
	';


	//Complete content object
	$my_post = array(
		'post_title' 		    => $post_title,
		'post_content' 		  => $content,
		'post_excerpt'		  => strip_tags($samenvatting),
		'post_date'			    => current_time('mysql'),
		'post_date_gmt' 	  => current_time('mysql',1),
		'post_modified'		  => current_time('mysql'),
		'post_modified_gmt' => current_time('mysql',1), 
		'post_type' 		    => 'vacature',
		'post_status'		    => 'publish',
		'post_name'			    =>  $post_name,
	);
	
	// Insert the post into the database
	$wp_post_id = wp_insert_post( $my_post ); //ID van de net aangemaakte film + insert van nieuwe post

	//update metadata
	update_post_meta( $wp_post_id, 'vacatures_id', $vacature['vacancyId'] );
	// interne functie, plaats de metagegevens:			
	update_meta($wp_post_id, $vacature);
	update_taxonomies($wp_post_id, $vacature);

}

function update_meta( $wp_post_id, $vacature ) {

	 // Algemeen
	 update_post_meta( $wp_post_id, 'vacatures_nummer', $vacature["id"]);
	 update_post_meta( $wp_post_id, 'vacatures_functie', $vacature["vacancyName"]);
	 update_post_meta( $wp_post_id, 'vacatures_uren', $vacature["numHoursPerWeek"] );

	// Geld
	if ( $vacature["oseMinimumSalary"] != null && $vacature["oseMaximumSalary"] != null ) {
		$bedrag = $vacature["oseMinimumSalary"] . '-' . $vacature["oseMaximumSalary"];
	} else {
		$bedrag = '';
	}
	update_post_meta( $wp_post_id, 'vacatures_schaal', $vacature["mdMsuId"]);
	update_post_meta( $wp_post_id, 'vacatures_bedrag', $bedrag);
	
	// Plaatsing
	$publicatie_tot_datum = $vacature['publication']['dateTo'];
	update_post_meta( $wp_post_id, 'vacatures_datum1', $vacature["dateFrom"] ); 
	update_post_meta( $wp_post_id, 'vacatures_datum2', $publicatie_tot_datum );
	
	// Locatie
	$locatie = $vacature['functionAddress'];
	update_post_meta( $wp_post_id, 'vacatures_locatie', $locatie["location"]);
	
	// Recruiter
	$recruiter = $vacature['recruiter'];
	update_post_meta( $wp_post_id, 'vacatures_recruiter_ID', $recruiter['cpnId']);

	// Complexiteit van de functie 1 (makkelijk) en 2 (moeilijk)
	$flexItems 		= $vacature['flexItems'];

	if ( $flexItems != null ) {
		foreach ( $flexItems as $flexItem ) {
			if ( $flexItem != null ) {
	
				echo '<br> FlexItem: ';
				var_dump($flexItem[0]);

				$complexiteit = $flexItem[0]['value'];
				$naam = $flexItem[0]['name'];
				if ( $naam == 'Soort vacature' ) {
					update_post_meta( $wp_post_id, 'formsoort', $complexiteit );
				}
			}
		}
	}
}

function update_taxonomies( $wp_post_id, $vacature ) {
		// update Niveau (HBO,...(functionLevel?, functionLevelId? )), Werveld(Vakgebied organisationUnit? ) en Ervaring(Jaren yearsExperience?? )
	// Niveau
	// echo 'Niveau: ';

	// Niveau	HBO,WO,MBO
	$vacature_niveau_id = $vacature["oseType"];

	//if null toevoegen
	if ( !$vacature_niveau_id == null ) {
			// Get taxonomy for niveau where meta_key = 'value' and meta_value = $terms
		$terms = get_terms( array(
			'taxonomy' => 'niveau',
			'hide_empty' => false,
			'meta_key' => 'value',
			'meta_value' => $vacature_niveau_id,
		) );
		
		$termID = $terms[0]->term_id;

		if ( !empty( $termID ) && !is_wp_error( $terms ) ){
			wp_set_object_terms( $wp_post_id, $termID, 'niveau' );
		} else {
			echo 'Niveau niet gevonden';
			create_taxonomie_items( 'educationlevel' , 'niveau');
			//zet hem dan alsnog
			wp_set_object_terms( $wp_post_id, $termID, 'niveau' );
		}
	}

	// Werkveld
	// echo 'Werkveld: ';
	$vacature_werkveld_id = $vacature["functionGroupId"];
	// Get taxonomy for niveau where meta_key = 'value' and meta_value = $terms

	if ( !$vacature_werkveld_id == null ) {
		$terms = get_terms( array(
			'taxonomy' => 'werkveld',
			'hide_empty' => false,
			'meta_key' => 'value', // gaat niet goed, wat kan 2x voorkomen...
			'meta_value' => $vacature_werkveld_id,
		) );

		$werkveldID = $terms[0]->term_id;
		// var_dump($terms);

		echo 'WerkveldID uit de call: '.$vacature_werkveld_id.' Werkveldnaam: '.$werkveldID;

		if ( !empty( $werkveldID ) && !is_wp_error( $terms ) ){
			wp_set_object_terms( $wp_post_id, $werkveldID, 'werkveld' );
		} else {
			echo 'Werkveld niet gevonden';
			create_taxonomie_items( 'functiongroup' , 'werkveld');
		}
	}

	// Ervaring
	// echo 'Ervaring: ';
	$vacature_ervaring_id = $vacature["yearsExperience"];

	if ( !$vacature_ervaring_id == null ) {
		// Get taxonomy for niveau where meta_key = 'value' and meta_value = $terms
		$terms = get_terms( array(
			'taxonomy' => 'ervaring',
			'hide_empty' => false,
			'meta_key' => 'value',
			'meta_value' => $vacature_ervaring_id,
		) );

		$termID = $terms[0]->term_id;

		if ( !empty( $termID ) && !is_wp_error( $terms ) ){
			wp_set_object_terms( $wp_post_id, $termID, 'ervaring' );
		} else {
			echo 'Ervaring niet gevonden';
			create_taxonomie_items( 'yearsexperience' , 'ervaring');
		}
	}

		// Soort Contract
		// echo 'Soort Contract: ';
		$vacature_soortcontract_id = $vacature["contractType"];

		if ( !$vacature_soortcontract_id == null ) {
			// Get taxonomy for niveau where meta_key = 'value' and meta_value = $terms
			$terms = get_terms( array(
				'taxonomy' => 'contractsoort',
				'hide_empty' => false,
				'meta_key' => 'value',
				'meta_value' => $vacature_soortcontract_id,
			) );

			$termID = $terms[0]->term_id;

			if ( !empty( $termID ) && !is_wp_error( $terms ) ){
				wp_set_object_terms( $wp_post_id, $termID, 'contractsoort' );
			} else {
				echo 'Soort Contract niet gevonden';
				create_taxonomie_items( 'contracttype' , 'contractsoort');
			}
		}

}

function create_taxonomie_items($set, $termname ) {

	// Deze functie wordt aangeroepen als een taxonomy niet gevonden kan worden, 
	// dan halen we alle data op en maken we de taxonomy aan
	// De `$set` is de naam van waarden in de API call naar de masterdata: educationlevel, functiongroup, yearsexperience

	// Get all data from API
	$masterdata = new APICall();
	$masterdata = $masterdata->get_masterdata($set);

	//loop er doorheen en maak de taxonomyvelden aan als ze nog niet bestaan
	foreach ($masterdata as $key => $value) {

		$exists = get_term_by('name',$value['label'] , $termname);
		//als ie al bestaat, ga dan door naar de volgende
		if ($exists) {
			continue;
		}

		// Else create taxonomy value 
		$term = wp_insert_term(
			$value['label'], // the term 
			$termname, // the taxonomy
			array(
				'description'=> $value['locale'],
				'slug' => $value['label'],
				'parent'=> 0
			)
		);
		//set metavalue for this taxonomy
		add_term_meta( $term['term_id'], 'value', $value['id'], true );
	}


}

function paragraph($content, $naam='paragraaf-tekst', $sectie_titel='', $update = false) {

	$content = strip_tags($content, '<p><a><em><br><li><b><ul>');

	//preg split on double break
	$description_array = preg_split('/(<\s*p\s*\/?>)|(<\s*br\s*\/?>)/', $content);

	// var_dump($description_array);

	$content = '';

	//elke dubbele break is een paragraaf, of een header of een lijst
	foreach ($description_array as $key => $value) {

		// geen lege waardes
		if ($value != '') {

			//1. als het ul bevat, dan is heeft het een lijst
			if (str_contains($value, '<ul>')) {
				// echo "UL TRUE <br>";
				$list_array = preg_split('/(<\s*p\s*\/?>)|(<\s*ul\s*\/?>)/', $value);

				// var_dump($list_array);
				foreach ($list_array as $key => $list) {
					// echo "Hier de start UL <br>";
					// we hebben nu een array met 'tekst' en 'li' elementen en evt weer 'tekst' elementen
					$first_character_ul = mb_substr($list, 0, 3);
					//
					// 1. als het bold is, dan is het een titel
					//
					if ($first_character_ul == '<li') {
						
						//eerste: voeg Ul weer toe:
						$content .= '<!-- wp:list --><ul>';

						//verwijder de li tags en splits ze uit in een array
						$list_items = preg_split('/(<\s*p\s*\/?>)|(<\s*li\s*\/?>)/', $list);

						// var_dump($list_items);

						//maak er WP list items van
						foreach ($list_items as $key => $list_item) {

							if ($list_item != '') {
								
								// als het een UL bevat is het 't laatste stuk van de lijst, daarom moet het afgesloten worden
								if (str_contains($list_item, '</ul>')) {
									//eindig met een li, en een ul en splits het laatste stuk tekst
									// slit de content op de </ul> tag
									//start gewoon met het openen van de list-item
									$content .= '<!-- wp:list-item --> <li>';
									// splitst dan de content op de </ul> tag
									$pieces = explode("</ul>", $list_item);

									$content .= $pieces[0] . '<!-- /wp:list-item -->'; //deze heeft al een </li> tag
									$content .= '</ul><!-- /wp:list -->'; // eindig met een ul
									//sluit af met de rest van de content:
									if (isset($pieces[1])) {
										$content .= '<!-- wp:paragraph {"className":"regular"} --><p class="regular">';
										$content .=  $pieces[1];
										$content .= '</p><!-- /wp:paragraph -->';
									}
								} else { 
									// Anders is het een gewone list-item
									$content .= '<!-- wp:list-item --> <li>';
									$content .=  $list_item;
									$content .= '<!-- /wp:list-item -->';
									
								}
							}
						}
					} else {
						// echo "Hier de start PARAGRAAF <br>";
						//anders is het een paragraaf
						$content .= '<!-- wp:paragraph {"className":"regular"} --><p class="regular">';
						$content .=  $list;
						$content .= '</p><!-- /wp:paragraph -->';
					}
				}
				// print_r($content);
			} else {
					$content .= '<!-- wp:paragraph {"className":"regular"} --><p class="regular">';
					$content .=  $value;
					$content .= '</p><!-- /wp:paragraph -->';
				// }
			}
		}
	}

	if ($sectie_titel != '') {
			$sectie_titel = 
			'<!-- wp:heading {"level":3} --><h3>
			'.$sectie_titel.'
			</h3><!-- /wp:heading -->';
		}
 // toevoegen van een paragraaf tekst met headers in een group, nieuwe content
 if (!$update) {
	return '<!-- wp:group {"layout":{"type":"constrained", id="'.$naam.'"}} -->
						<div id="'.$naam.'" class="wp-block-group ">'
						. $sectie_titel .
							$content .
						'</div>
					<!-- /wp:group -->';
 } else {
	// update de content
	return '<div id="'.$naam.'" class="wp-block-group ">'. $sectie_titel .$content .'</div>';
 }
}

function update_vacature( $id, $vacature ) {
	// Hierin gaan we de vacature teksten updaten.
	// Alleen de blokken aanpassen die van de API afkomen en niet de overige blokken die op de site staan. 
	// Elk blok uit de tekst heeft zijn eigen ID, die kunnen we gebruiken om te bepalen welke blokken we moeten updaten.

	// TODO blokken manipuleren. 
	$post = get_post( $id ); // Get 1 post

	// print_r( $post->post_content );
	$string = $post->post_content;

	// complete groep eruit halen en vervangen door de nieuwe content
	$advertText = $vacature['advertText'];
	// var_dump($advertText);

	$subtitle = $advertText['subTitle'];
	$description = $advertText['description'];
	$compensation = $advertText['compensation'];

	$contactInfo = $advertText['contactInfo'];
	$jobRequirements = $advertText['jobRequirements'];
	$displayOrganisation = $advertText['displayOrganisation'];
	$companyInformation = $advertText['companyInformation'];

	if ($subtitle != '') {
		$onderwerp = 'intro';
		$content = paragraph($subtitle, $onderwerp, '', true);
		$string = preg_replace('/<div id=\"'.$onderwerp.'\" class=\"wp-block-group \">[\s\S]+?<\/div>/', $content, $string);
	}

	if ($description != '') {
		// sectietitel om te vervangen:
		$onderwerp = 'beschrijving';
		//Titel ophalen uit de database
		$functieTitel = get_field('functie_titel', 'option');	
		// nieuwe content maken
		$content = paragraph($description, $onderwerp, $functieTitel);
		// vervangen in de string
		$string = preg_replace('/<div id=\"'.$onderwerp.'\" class=\"wp-block-group \">[\s\S]+?<\/div>/', $content, $string);
	}

	if ($jobRequirements != '') {
		$onderwerp = 'requirements';
		$functieTitel = get_field('profiel_titel', 'option');	
		$content = paragraph($jobRequirements, $onderwerp, $functieTitel );
		$string = preg_replace('/<div id=\"'.$onderwerp.'\" class=\"wp-block-group \">[\s\S]+?<\/div>/', $content, $string);
	}

	if ($compensation != '') {
		$onderwerp = 'compensatie';
		$functieTitel = get_field('aanbod_titel', 'option');
		$content = paragraph($compensation, $onderwerp, $functieTitel);
		$string = preg_replace('/<div id=\"'.$onderwerp.'\" class=\"wp-block-group \">[\s\S]+?<\/div>/', $content, $string);
	}

	if ($companyInformation != '') {
		$onderwerp = 'organisatie-informatie';
		$functieTitel = get_field('organisatie_titel', 'option');
		$content = paragraph($companyInformation, $onderwerp, $functieTitel);
		$string = preg_replace('/<div id=\"'.$onderwerp.'\" class=\"wp-block-group \">[\s\S]+?<\/div>/', $content, $string);
	}

	if ($contactInfo != '') {
		$onderwerp = 'contact-info';
		$functieTitel = get_field('procedure_titel', 'option');
		$content = paragraph($contactInfo, $onderwerp, $functieTitel);
		$string = preg_replace('/<div id=\"'.$onderwerp.'\" class=\"wp-block-group \">[\s\S]+?<\/div>/', $content, $string);
	}
	
	// if ($displayOrganisation != '') {
	// 	$content .= paragraph($displayOrganisation, 'organisatie');
	// }
	// $out = preg_replace('/<div id=\"'.$onderwerp.'\" class=\"wp-block-group \">[\s\S]+?<\/div>/', 'test', $string);

	// $out = delete_all_between( $start, $end, $string);



	// print_r($string);
	wp_update_post( array( 'ID' => $id, 'post_content' => $string, ) );
	
}

function deactivate_vacature($id) {
	// Deactiveer de vacature:
	$data = array(
		'ID' => $id,
		'post_type' => 'vacature',
		'post_status'   => 'draft',
	);
	
	wp_update_post( $data );
}

function delete_all_between($beginning, $end, $string) {
  $beginningPos = strpos($string, $beginning);
  $endPos = strpos($string, $end);
  if ($beginningPos === false || $endPos === false) {
    return $string;
  }

  $textToDelete = substr($string, $beginningPos, ($endPos + strlen($end)) - $beginningPos);

  return delete_all_between($beginning, $end, str_replace($textToDelete, '', $string)); // recursion to ensure all occurrences are replaced
}