<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Write debug information to Query Monitor if available.
 * Falls back to error_log when WP_DEBUG is enabled.
 *
 * @param mixed $message Message to log.
 * @return void
 */
function tg_log_debug($message) {
    do_action('qm/debug', $message);

    if (defined('WP_DEBUG') && WP_DEBUG) {
        error_log(print_r($message, true));
    }
}

/**
 * Check GitHub releases for plugin updates.
 *
 * Hooks into site_transient_update_plugins and injects update
 * information when a newer version is available.
 */
function tg_check_for_updates($transient) {
    tg_log_debug('Checking GitHub for Track Generator updates. Current version: ' . TRACK_GENERATOR_VERSION);

    if (empty($transient->checked)) {
        tg_log_debug('No plugins checked yet, exiting update check.');
        return $transient;
    }

    $response = wp_remote_get(
        'https://api.github.com/repos/theubie/trackgenerator/releases/latest',
        [
            'headers' => [
                'Accept' => 'application/vnd.github+json',
                'User-Agent' => 'TrackGenerator/' . TRACK_GENERATOR_VERSION .
                    ' (+https://github.com/theubie/trackgenerator)'
            ],
            'timeout' => 10,
            'redirection' => 3,
        ]
    );
    tg_log_debug('GitHub update check response code: ' . wp_remote_retrieve_response_code($response));

    if (is_wp_error($response)) {
        tg_log_debug('Update check HTTP error: ' . $response->get_error_message());
        return $transient;
    }

    $release = json_decode(wp_remote_retrieve_body($response));
    tg_log_debug(['release_data' => $release]);
    if (!$release || empty($release->tag_name) || empty($release->zipball_url)) {
        tg_log_debug('Incomplete release information received from GitHub.');
        return $transient;
    }

    $latest_version = ltrim($release->tag_name, 'v');
    tg_log_debug('Latest GitHub version: ' . $latest_version);
    if (version_compare($latest_version, TRACK_GENERATOR_VERSION, '>')) {
        tg_log_debug('Update available. Preparing plugin info.');
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

        tg_log_debug(['update_plugin_data' => $plugin]);
        $transient->response[$plugin_slug] = $plugin;
    } else {
        tg_log_debug('No update found.');
    }

    return $transient;
}
add_filter('site_transient_update_plugins', 'tg_check_for_updates');
