<?php
/**
 * CPT Class.
 *
 * @package indrukwekkend-vacatures
 */

namespace IndrukwekkendVacatures;

/**
 * Class Assets.
 */
class MetaData {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'init', [ $this, 'call_wp_add_meta_data' ] );
	}

	/**
	 * Call actions.
	 */
	public function call_wp_add_meta_data() {

		// echo 'call_wp_add_meta_data';
		
		$cpt = 'vacature';
		$this->wp_add_meta_data( $cpt, 'uren' );
		$this->wp_add_meta_data( $cpt, 'datum1' );
		$this->wp_add_meta_data( $cpt, 'datum2' );
		$this->wp_add_meta_data( $cpt, 'niveau' );
		$this->wp_add_meta_data( $cpt, 'schaal' );
		$this->wp_add_meta_data( $cpt, 'bedrag' );
		$this->wp_add_meta_data( $cpt, 'vakgebied' );
		$this->wp_add_meta_data( $cpt, 'ervaring' );
		$this->wp_add_meta_data( $cpt, 'nummer' );
		$this->wp_add_meta_data( $cpt, 'functie' );
		$this->wp_add_meta_data( $cpt, 'locatie' );
		$this->wp_add_meta_data( $cpt, 'locatie2' );
		$this->wp_add_meta_data( $cpt, 'recruiter_ID' );
		$this->wp_add_meta_data( $cpt, 'formsoort' );

		// Alle waarden in 1 variabele:
		// dit is om de sectie in het blok aan en uit te zetten. 
		// De sectie wordt niet getoond als de waarde false is.
		// Ze moeten overeenkomen met de waarden in de functie wp_add_meta_data, deze zijn de globals,
		// De meta's hierboven zijn per vacature en per medewerker verschillend.
		$instellingen = "global_vacature_options";
		//store in one variable
		$multidimensional_options = array(
			'selectie'=>array(
				'uren' => true,
				'datum1' => false,
				'datum2' => false,
				'schaal' => false,
				'bedrag' => true,
				'vakgebied' => false,
				'niveau' => true,
				'ervaring' => false,
				'nummer' => false,
				'functie' => true,
				'locatie' => false,
				'locatie2' => false,
			),
			'namen'=>array(
				'uren' => 'Uren per week',
				'datum1' => 'Plaatsingsdatum',
				'datum2' => 'Sluitingsdatum',
				'schaal' => 'Salarisschaal',
				'bedrag' => 'Salarisbedrag',
				'niveau' => 'Werk-/denkniveau', //TODO Moet taxonomie worden
				'vakgebied' => 'Vakgebied',  //Vakgebied als "Taxonomie" opgenomen
				'ervaring' => 'Ervaring',  //Ervaring als "Taxonomie" opgenomen
				'nummer' => 'Vacature nummer',
				'functie' => 'Functie',  
				'locatie' => 'Locatie',  
				'locatie2' => 'Locatie2',  
			),
		);
		//check if option exists en vervang hem anders voor de standaard waarden hierboven (on initial install)
		// LET OP! Deze wordt maar 1x aangeroepen, dus bij veranderingen in de waarden moet de plugin opnieuw worden geactiveerd.
		if( get_option( $instellingen ) === false ) {
				// echo 'option does not exist, so create it';
				update_option( $instellingen, $multidimensional_options );
		}


		//medewerker
		$cpt = 'medewerker';
		$this->wp_add_meta_data( $cpt, 'nummer' );
		$this->wp_add_meta_data( $cpt, 'linkedin' );
		$this->wp_add_meta_data( $cpt, 'email' );
		$this->wp_add_meta_data( $cpt, 'telefoon' );
		$this->wp_add_meta_data( $cpt, 'nog een' );

		// Alle waarden in 1 variabele:
		// dit is om de sectie in het blok aan en uit te zetten. 
		// De sectie wordt niet getoond als de waarde false is.
		// Ze moeten overeenkomen met de waarden in de functie wp_add_meta_data, deze zijn de globals,
		// De meta's hierboven zijn per vacature en per medewerker verschillend.

		//TODO: deze moet nog worden aangepast
		$instellingen = "global_vacature_options";
		//store in one variable
		$multidimensional_options = array(
			'selectie'=>array(
				'uren' => true,
				'datum1' => false,
				'datum2' => false,
			),
			'namen'=>array(
				'uren' => 'Uren per week',
				'datum1' => 'Plaatsingsdatum',
				'datum2' => 'Sluitingsdatum',
				'niveau' => 'Werk-/denkniveau',
			),
		);
		//check if option exists en vervang hem anders voor de standaard waarden hierboven (on initial install)
		if( get_option( $instellingen ) === false ) {
				update_option( $instellingen, $multidimensional_options );
		}
	
	}

	/**
	 * Add meta Data.
	 */
	public function wp_add_meta_data($cpt, $meta, $single = true, $type = 'string' ) {
		//spaces to underscores
		$meta = str_replace(' ', '_', $meta);

		register_post_meta( $cpt, $cpt.'s_'.$meta, array(
			'show_in_rest' => true,
			'single' => $single,
			'type' => $type,
		) );

	}
}
