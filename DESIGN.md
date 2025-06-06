# Track Generator Web App (WordPress Plugin)

## Project Overview

This lightweight plugin adds a track idea generator to any WordPress site. It provides random prompts for tempo, key and mode, and chord progressions. The implementation uses vanilla JavaScript so it works with most WordPress setups.

## Core Features

1. **BPM Generator**
   - Users select a minimum and maximum BPM (default 60–160).
   - The app outputs a random BPM in that range.
2. **Key + Mode Selector**
   - Checkboxes allow the user to enable any of the seven modes (Ionian/Major, Dorian, Phrygian, Lydian, Mixolydian, Aeolian/Natural Minor, Locrian).
   - A key from A–G# is randomly chosen along with one of the selected modes.
3. **Chord Progression Generator**
   - *Tried and True*: chooses from a curated list of common progressions such as `1 - 4 - 5`.
   - *True Random*: user specifies a length (e.g. 3–8 chords) and the app generates random degrees `1–7`.

## UI Elements

| Element | Type | Notes |
| --- | --- | --- |
| BPM Min | `<input type="number">` | Default: 60 |
| BPM Max | `<input type="number">` | Default: 160 |
| Mode Select | `<input type="checkbox">` | Each mode has its own checkbox |
| Progression Type | `<input type="radio">` | "Tried and True" or "True Random" |
| Progression Length | `<input type="number">` | Visible only for "True Random" |
| Generate Button | `<button>` | Runs the generator |
| Output Display | `<div>` | Area where results appear |

## Business Logic Overview

```text
generateBPM(min, max)          -> random BPM between min and max
generateKey(modes)             -> random key (A–G#) and chosen mode
generateProgression(type, len) -> progression based on preset list or random digits
```

## File Structure

```text
track-generator/
├── css/
│   └── style.css            # Plugin styling
├── js/
│   └── generator.js         # Core generation logic
├── templates/
│   └── generator-ui.php     # Markup for the UI
├── track-generator.php      # Plugin bootstrap and shortcode
└── readme.txt               # WordPress metadata
```

## Example Output

```text
Generated Track Idea:
- BPM: 128
- Key: D# Natural Minor
- Progression: 6 - 4 - 1 - 5
```

## Installation (for WP Testing)

1. Clone this repo into your `wp-content/plugins` directory.
2. Activate the plugin in your WordPress dashboard.
3. Add `[track_generator]` shortcode to any page or post.

## Advanced Feature Roadmap

The following items outline the next phase of development. All advanced options
are gated behind an **Advanced Mode** toggle so the basic workflow remains
lightweight. When enabled, Advanced Mode will expose additional chord details
and controls.

1. **Advanced Mode Toggle** – Checkbox to reveal extra options such as chord
   modifiers and functional substitutions.
2. **Chord Modifier Options** – Select between 7th chords, suspended chords
   (`sus2`/`sus4`), diminished, augmented and power chords.
3. **Mode-to-Scale Table** – JavaScript object mapping each mode to its scale
   formula.
4. **Diatonic Scale Generation** – Build the scale for the chosen key and mode
   (e.g. `C` + `Dorian` → `C D Eb F G A Bb`).
5. **Degree-to-Chord Mapping** – Determine chord quality per scale degree based
   on the current mode.
6. **Chord Rendering Engine** – Convert key, degree and modifiers into a proper
   chord name such as `Gsus4` or `Cmaj7`.
7. **Random Modifiers** – Optionally assign a random modifier to each chord in a
   progression.
8. **Functional Flavor Options** – Borrowed chords from parallel modes and
   optional tritone substitutions for more complex progressions.
9. **LocalStorage** – Persist advanced settings like BPM range, enabled modes
   and progression type.
10. **Improved Display** – Show Roman numerals alongside chord names and provide
    a copy-to-clipboard button.
11. **Animated Generation** – Add a small animation when generating results,
    such as a slot-machine style spinner or rotating wheels, to make the UI feel
    livelier.
