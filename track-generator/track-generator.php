<?php
/**
 * Plugin Name:       Track Generator
 * Description:       Generates random BPM, key, mode, and chord progressions.
 * Version:           0.11.0
 * Author:            Randell Miller of Infinite Possibility Media
 * Plugin URI:        https://github.com/theubie/trackgenerator
 * Author URI:        https://infinitepossibility.media
 * Requires at least: 5.0
 * Tested up to: 6.5.3
 * Requires PHP: 7.4
 * License: BSD-3-Clause
 * License URI: https://opensource.org/licenses/BSD-3-Clause
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

if (!defined('TRACK_GENERATOR_VERSION')) {
    define('TRACK_GENERATOR_VERSION', '0.11.0');
}

require_once plugin_dir_path(__FILE__) . 'update-checker.php';
require_once plugin_dir_path(__FILE__) . 'plugin-info.php';

function tg_enqueue_assets() {
    wp_enqueue_style(
        'track-generator-style',
        plugin_dir_url(__FILE__) . 'css/style.css'
    );
    wp_enqueue_script(
        'track-generator-js',
        plugin_dir_url(__FILE__) . 'js/generator.js',
        array('jquery'),
        null,
        true
    );
    wp_enqueue_script(
        'scales-chords-api',
        'https://www.scales-chords.com/api/scales-chords-api.js',
        array(),
        null,
        true
    );
}
add_action('wp_enqueue_scripts', 'tg_enqueue_assets');

function tg_render_generator() {
    ob_start();
    include plugin_dir_path(__FILE__) . 'templates/generator-ui.php';
    return ob_get_clean();
}
add_shortcode('track_generator', 'tg_render_generator');
?>
