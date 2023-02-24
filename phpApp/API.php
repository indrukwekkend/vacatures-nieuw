<?php
/**
 * API Class.
 *
 * @package indrukwekkend-vacatures
 */

namespace IndrukwekkendVacatures;



/**
 * Class Plugin.
 */
class API {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->init();
	}

	/**
	 * Initialize plugin
	 */
	private function init() {

		define( 'INDRUKWEKKEND_VACATURES_PLUGIN_PATH', untrailingslashit( plugin_dir_path( __DIR__ ) ) );
		define( 'INDRUKWEKKEND_VACATURES_PLUGIN_URL', untrailingslashit( plugin_dir_url( __DIR__ ) ) );

		// Hier komen alle classes die worden ingeladen als de plugin wordt geactiveerd
		// API koppelinen enzo

		new APICall();

	}
}