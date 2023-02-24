<?php
/**
 * Helper functies.
 *
 * @package indrukwekkend-vacatures
 */

namespace IndrukwekkendVacatures;


// hulp functies 
function isJson($string) {
	json_decode($string);
	return json_last_error() === JSON_ERROR_NONE;
}

function get_list_item( $item, $values ) {
	$meta = '';
		$meta .= '<dl class="$item">';
			$meta .= "<dt class='col naam'> $item </dt>";
			$meta .= "<dd class='col waarde'>$values</dd>";
		$meta .= '</dl>';

			return $meta;
}

// haal de term op en return een komma gescheiden lijst
function get_vacature_terms( $post_id, $taxonomy) {
	$terms = get_the_terms( $post_id, $taxonomy );
	$termList = '';
		// Loop door de array van termen
		if ( $terms && ! is_wp_error( $terms ) ) {
			$draai = array();
			foreach ( $terms as $term ) {
				$draai[] = $term->name;
			}
			$termList = join( ", ", $draai );
		}	else { return false; }
	return $termList;
}
