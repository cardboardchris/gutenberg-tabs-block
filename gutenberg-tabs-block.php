<?php
/**
 * Plugin Name:     Gutenberg Tabs Block
 * Description:     Example block written with ESNext standard and JSX support – build step required.
 * Version:         0.1.1
 * Author:          Chris Metivier
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     gutenberg-tabs-block
 *
 * @package         custom-blocks
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function create_block_tabs_block_init()
{
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists($script_asset_path)) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "custom-blocks/gutenberg-tabs-block" first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require($script_asset_path);
	wp_register_script(
		'custom-blocks-editor',
		plugins_url($index_js, __FILE__),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations('custom-blocks-editor', 'gutenberg-tabs-block');

	$editor_css = 'build/index.css';
	wp_register_style(
		'custom-blocks-editor',
		plugins_url($editor_css, __FILE__),
		array(),
		filemtime("$dir/$editor_css")
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'custom-blocks',
		plugins_url($style_css, __FILE__),
		array(),
		filemtime("$dir/$style_css")
	);

	register_block_type(
		'custom-blocks/gutenberg-tabs-block',
		array(
			'editor_script'    => 'custom-blocks-editor',
			'editor_style'     => 'custom-blocks-editor',
			'style'            => 'custom-blocks',
		)
	);
}

add_action('init', 'create_block_tabs_block_init');
