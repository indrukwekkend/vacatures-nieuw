<?php
/**
 * Assets Class.
 *
 * @package indrukwekkend-vacatures
 * 
 * Assets voegen de frontend en backend CSS en JS voor de blokken en de plugin toe
 */

namespace IndrukwekkendVacatures;

/**
 * Class Assets.
 */
class Assets {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->init();
	}

	/**
	 * Initialize.
	 */
	private function init() {
		/**
		 * The 'enqueue_block_assets' hook includes styles and scripts both in editor and frontend,
		 * except when is_admin() is used to include them conditionally
		 */
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_editor_assets' ] );
	}

	/**
	 * Enqueue Admin Scripts
   * nog niet af, zie Aquila Features plugin serie op Youtube van
   * Nog uitzoeken hoe ik de assets.php file moet gebruiken
	 */
	public function enqueue_editor_assets() {

		$asset_config_file = sprintf( '%s/frontend.asset.php', INDRUKWEKKEND_VACATURES_PLUGIN_BUILD_PATH );	

		if ( ! file_exists( $asset_config_file ) ) {
			return;
		}

		$asset_config = include_once $asset_config_file;

		// if ( empty( $asset_config['js/editor.js'] ) ) {
		// 	return;
		// }
		// 		$editor_asset    = $asset_config['js/editor.js'];

		$editor_asset    = $asset_config;
		$js_dependencies = ( ! empty( $editor_asset['dependencies'] ) ) ? $editor_asset['dependencies'] : [];
		$version         = ( ! empty( $editor_asset['version'] ) ) ? $editor_asset['version'] : filemtime( $asset_config_file );

		// Theme Gutenberg blocks JS.
		if ( is_admin() ) {
			wp_enqueue_script(
				'af-blocks-js',
				INDRUKWEKKEND_VACATURES_PLUGIN_BUILD_URL . '/index.js',
				$js_dependencies,
				$version,
				true
			);
		}

		// Theme Gutenberg blocks CSS.
		$css_dependencies = [
			'wp-block-library-theme',
			'wp-block-library',
		];

		if (!is_admin()) {
      wp_enqueue_script('indrukwekkendFrontendScript',
			INDRUKWEKKEND_VACATURES_PLUGIN_BUILD_URL . '/frontend.js',
			['wp-blocks', 'wp-components', 'wp-core-data', 'wp-data', 'wp-element', 'wp-polyfill'],
			$version,
			true
			);

			wp_enqueue_script('BullhornFrontendScript',
			'https://zaanstad.api-a.connexys.nl/public/javascriptform/packaged.js',
			[],
			$version,
			true
			);


			wp_enqueue_style(
				'fe-blocks-css',
				INDRUKWEKKEND_VACATURES_PLUGIN_BUILD_URL . '/frontend.css',
				$css_dependencies,
				filemtime( INDRUKWEKKEND_VACATURES_PLUGIN_BUILD_PATH . '/frontend.css' ),
				'all'
			);
    }

		wp_enqueue_style(
			'af-blocks-css',
			INDRUKWEKKEND_VACATURES_PLUGIN_BUILD_URL . '/index.css',
			$css_dependencies,
			filemtime( INDRUKWEKKEND_VACATURES_PLUGIN_BUILD_PATH . '/index.css' ),
			'all'
		);
	}
}
