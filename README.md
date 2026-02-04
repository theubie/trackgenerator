# Track Generator

A WordPress plugin that generates random ideas for new music tracks. It provides a tempo, a key with mode, and a chord progression at the press of a button.

## Features

- Random BPM within a configurable range
- Key + mode generation with weighted mode selection and optional allowed-key filtering
- Two chord progression modes: "Tried and True" or a fully random sequence
- Multiple named progressions per run with per-progression reroll
- Chord rendering with modifiers (7th, sus2, sus4, dim, aug, power)
- Optional functional flavoring (borrowed chords, tritone substitutions)
- Roman numerals and scale chord listing with borrowed-chord callouts
- Song-level suggestions (key change, tempo shift, dynamics change, rhythm variation)
- Collapsible settings panel and localStorage persistence
- Optional dark mode toggle for low-light environments

## Installation

1. Download the latest release zip from the **Releases** page.
2. In your WordPress dashboard go to **Plugins → Add New → Upload Plugin** and select the downloaded zip file.
3. Activate **Track Generator** after upload and insert the `[track_generator]` shortcode on any page or post to display the generator.

## Development

The plugin uses jQuery for UI interactions and loads the Scales & Chords API for chord popups. See [DESIGN.md](DESIGN.md) for the project design and enhancement roadmap.

## Community and Support

Track Generator is brought to you by [TheUbie](https://www.youtube.com/@theubie).
If you encounter issues or have feature requests, please open an issue on
[GitHub](https://github.com/theubie/trackgenerator/issues).
Generously given to you for free! If you want to be generous back,
[click here](https://streamelements.com/theubie-fc49c/tip) to leave a tip.
