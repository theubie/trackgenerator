<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Check GitHub releases for plugin updates.
 *
 * Hooks into pre_set_site_transient_update_plugins and injects update
 * information when a newer version is available.
 */
function tg_check_for_updates($transient) {
    if (empty($transient->checked)) {
        return $transient;
    }

    $response = wp_remote_get(
        'https://api.github.com/repos/theubie/trackgenerator/releases/latest',
        [
            'headers' => [
                'Accept' => 'application/vnd.github+json',
                'User-Agent' => 'WordPress'
            ]
        ]
    );

    if (is_wp_error($response)) {
        return $transient;
    }

    $release = json_decode(wp_remote_retrieve_body($response));
    if (!$release || empty($release->tag_name) || empty($release->zipball_url)) {
        return $transient;
    }

    $latest_version = ltrim($release->tag_name, 'v');
    if (version_compare($latest_version, TRACK_GENERATOR_VERSION, '>')) {
        $plugin_slug = plugin_basename(__DIR__ . '/track-generator.php');

        $download_url = $release->zipball_url;
        if (!empty($release->assets) && is_array($release->assets)) {
            $expected = 'track-generator-' . $latest_version . '.zip';
            foreach ($release->assets as $asset) {
                if (isset($asset->name) && isset($asset->browser_download_url) && $asset->name === $expected) {
                    $download_url = $asset->browser_download_url;
                    break;
                }
            }
        }

        $plugin = (object) [
            'slug' => 'track-generator',
            'plugin' => $plugin_slug,
            'new_version' => $latest_version,
            'url' => $release->html_url,
            'package' => $download_url,
        ];

        $transient->response[$plugin_slug] = $plugin;
    }

    return $transient;
}
add_filter('pre_set_site_transient_update_plugins', 'tg_check_for_updates');
