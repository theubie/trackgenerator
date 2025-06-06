# Track Generator

A WordPress plugin that generates random ideas for new music tracks. It provides a tempo, a key with mode, and a chord progression at the press of a button.

## Features

- Random BPM within a configurable range
- Key and mode selector supporting all seven modes (Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian)
- Two chord progression modes: "Tried and True" or a fully random sequence
- Optional Advanced Mode with chord modifiers and rendered chord names

## Installation

1. Copy the `track-generator` directory into your WordPress `wp-content/plugins` folder.
2. Activate **Track Generator** from the Plugins page of your WordPress admin panel.
3. Insert the `[track_generator]` shortcode on any page or post to display the generator.

## Development

The plugin uses vanilla JavaScript and minimal styling. See [DESIGN.md](DESIGN.md) for the project design and planned enhancements.

### Advanced Mode

Check the **Advanced Mode** box to reveal weighted chord variations. Each variation (7th, sus2, etc.) can be given a probability and an **Unmodified** weight controls how often no change is applied. If Unmodified is set to **Always**, other variation weights are ignored.
