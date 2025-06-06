<?php
/**
 * Plugin Name:       Track Generator
 * Description:       Generates random BPM, key, mode, and chord progressions.
 * Version:           0.5.0
 * Author:            Randell Miller of Infinite Possibility Media
 * Plugin URI:        https://infinitepossibility.media
 * Author URI:        https://infinitepossibility.media
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

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
