<?php
/**
 * Plugin Name:       Simple Highlight
 * Description:       A plugin that adds a simple highlighter format to use on text in the block editor.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.1
 * Author:            <a href="https://max.gruson.studio" target="_blank">Max Gruson</a>
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       simple-highlight
 *
 * @package           simple-highlight
 */

namespace SIMPLE_HIGHLIGHT;

const ROOT_DIR    = __DIR__;
const ROOT_FILE   = __FILE__;
const PLUGIN_SLUG = 'simple-highlight';


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Setup
 *
 * @return void
 */
function setup(): void {
	// Load text domain.
	load_plugin_textdomain( 'simple-highlight', false, ROOT_DIR . 'languages' );

	// Enqueue Block Editor Assets.
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_assets', 10 );
}

/**
 * Enqueue Block Editor Assets
 *
 * @throws Error Warn if asset dependencies do not exist.
 *
 * @return void
 */
function enqueue_block_editor_assets(): void {

	$asset_path = ROOT_DIR . '/build/index.asset.php';

	if ( ! file_exists( $asset_path ) ) {
		throw new Error(
			esc_html__( 'You need to run `npm start` or `npm run build` in the root of the plugin "simple highlight" first.', 'simple-highlight' )
		);
	}

	$scripts = '/build/index.js';
	$assets  = include $asset_path;

	wp_enqueue_script(
		PLUGIN_SLUG . '-block-scripts',
		plugins_url( $scripts, ROOT_FILE ),
		$assets['dependencies'],
		$assets['version'],
		false
	);

	wp_enqueue_style(
		PLUGIN_SLUG . '-styles',
		plugins_url( '/style.css', __FILE__ ),
		array(),
		'1.0.1',
		'all'
	);

	wp_set_script_translations(
		PLUGIN_SLUG . '-block-scripts',
		'simple-highlight',
		ROOT_DIR . 'languages'
	);
}

add_action( 'plugins_loaded', __NAMESPACE__ . '\setup' );
