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

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


require_once 'vendor/autoload.php';

use IndrukwekkendVacatures\Plugin;

if ( class_exists( 'IndrukwekkendVacatures\Plugin' ) ) {
	$the_plugin = new Plugin();
}

/**
 * Block Initializer.
 */
// require_once plugin_dir_path( __FILE__ ) . 'phpApp/init.php';
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
