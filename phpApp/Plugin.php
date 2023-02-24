<?php
/**
 * Plugin Class.
 *
 * @package aquila-features
 */

namespace IndrukwekkendVacatures;

/**
 * Class Plugin.
 */
class Plugin {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->init();
	}

	public function activate() {}
	public function deactivate() {}

	/**
	 * Initialize plugin
	 */
	private function init() {
		define( 'INDRUKWEKKEND_VACATURES_PLUGIN_PATH', untrailingslashit( plugin_dir_path( __DIR__ ) ) );
		define( 'INDRUKWEKKEND_VACATURES_PLUGIN_URL', untrailingslashit( plugin_dir_url( __DIR__ ) ) );
		define( 'INDRUKWEKKEND_VACATURES_PLUGIN_BUILD_PATH', INDRUKWEKKEND_VACATURES_PLUGIN_PATH . '/build' );
		define( 'INDRUKWEKKEND_VACATURES_PLUGIN_BUILD_URL', INDRUKWEKKEND_VACATURES_PLUGIN_URL . '/build' );
		define( 'INDRUKWEKKEND_VACATURES_PLUGIN_VERSION', '1.0.0' );
		define( 'INDRUKWEKKEND_VACATURES_NAMESPACE', 'iv/v2' );

		// Hier komen alle classes die worden ingeladen als de plugin wordt geactiveerd
		// API koppelinen enzo

		new Assets();
		// new Patterns();
		// new SearchApi();
		new VacatureApi();
		new TaxonomyApi();
		//CPT roept in deze versie 2 CPT's aan: Vacatures en Medewerkers
		new CPT();
		new Images();
		new Taxonomy();
		// global en per vacature en per medewerker
		new MetaData();
	}
}
