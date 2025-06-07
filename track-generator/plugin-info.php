<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function tg_fetch_latest_release() {
    $response = wp_remote_get(
        'https://api.github.com/repos/theubie/trackgenerator/releases/latest',
        [
            'headers' => [
                'Accept' => 'application/vnd.github+json',
                'User-Agent' => 'TrackGenerator/' . TRACK_GENERATOR_VERSION . ' (+https://github.com/theubie/trackgenerator)'
            ],
            'timeout' => 10,
            'redirection' => 3,
        ]
    );

    if (is_wp_error($response)) {
        return null;
    }

    $release = json_decode(wp_remote_retrieve_body($response));
    if (!$release || empty($release->body) || empty($release->tag_name)) {
        return null;
    }

    return (object) [
        'version' => ltrim($release->tag_name, 'v'),
        'changelog' => $release->body,
    ];
}

function tg_override_plugin_info($res, $action, $args) {
    if ($action === 'plugin_information' && isset($args->slug) && $args->slug === 'track-generator') {
        $release = tg_fetch_latest_release();
        $version = $release ? $release->version : TRACK_GENERATOR_VERSION;
        $changelog = $release ? $release->changelog : '';

        return (object) [
            'name' => 'Track Generator',
            'slug' => 'track-generator',
            'version' => $version,
            'author' => '<a href="https://infinitepossibility.media">TheUbie</a>',
            'homepage' => 'https://github.com/theubie/trackgenerator',
            'short_description' => 'Randomized track and progression generator for songwriters and streamers.',
            'sections' => [
                'description' => 'Create musical inspiration in seconds with customizable key, tempo, and chord options.',
                'changelog' => $changelog,
            ],
        ];
    }
    return $res;
}
add_filter('plugins_api', 'tg_override_plugin_info', 20, 3);
