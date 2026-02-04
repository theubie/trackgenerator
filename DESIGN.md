# Track Generator Web App (WordPress Plugin)

## Project Overview

This lightweight plugin adds a track idea generator to any WordPress site. It provides random prompts for tempo, key and mode, chord progressions, and optional advanced harmony details like chord qualities, borrowing, and tritone substitutions. The implementation uses jQuery-based JavaScript so it works with most WordPress setups.

## Core Features

1. **BPM Generator**
   - Users select a minimum and maximum BPM (default 60–160).
   - The app outputs a random BPM in that range.
2. **Key + Mode Selector**
   - Each mode (Major, Natural Minor, Dorian, Phrygian, Lydian, Mixolydian, Locrian) uses a weighted dropdown.
   - Allowed keys can be restricted via checkboxes; otherwise A–G# are available.
3. **Chord Progression Generator**
   - *Tried and True*: chooses from a curated list of common progressions such as `1 - 4 - 5`.
   - *True Random*: user specifies a length (e.g. 3–8 chords) and the app generates random degrees `1–7`.
   - Multiple progressions can be generated at once, each with custom names, and rerolled individually.
4. **Harmony & Display Enhancements**
   - Scale and chord qualities are generated for the chosen mode.
   - Chords are rendered with optional modifiers (7th, sus2, sus4, dim, aug, power).
   - Roman numerals are shown alongside chord names and borrowed chords are labeled.
   - Optional borrowed-chord and tritone-substitution flavoring is applied.
5. **Song-Level Suggestions**
   - Optional weighted suggestions for key changes, tempo shifts, dynamics changes, and rhythm variation.

## UI Elements

| Element | Type | Notes |
| --- | --- | --- |
| BPM Min | `<input type="number">` | Default: 60 |
| BPM Max | `<input type="number">` | Default: 160 |
| Mode Weights | `<select>` | Set probability for each mode |
| Progression Type | `<input type="radio">` | "Tried and True" or "True Random" |
| Progression Length | `<input type="number">` | Always visible; used for "True Random" |
| Generate Button | `<button>` | Runs the generator |
| Settings Toggle | `<button>` | Shows/hides the settings panel |
| Dark Mode | `<input type="checkbox">` | Toggles dark UI styling |
| Output Display | `<div>` | Area where results appear |
| Progression List | `<input type="text">` | Names each progression result |
| Chord Variation Weights | `<select>` | Weighted modifiers (7th, sus, dim, aug, power) |
| Functional Flavor | `<select>` | Borrowed chords + tritone substitutions |
| Song Elements | `<select>` | Weighted song-level suggestions |

## Business Logic Overview

```text
generateBPM(min, max)                     -> random BPM between min and max
generateKey(modes, allowedKeys)           -> random key and chosen mode
generateProgression(type, len)            -> progression based on preset list or random digits
buildScale(key, mode)                      -> diatonic scale array
renderProgression(degrees, key, mods, fx)  -> chord objects with Roman numerals
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
- Chords: Bm - G - D - A
- Roman Numerals: vi - IV - I - V
```

## Installation (for WP Testing)

1. Clone this repo into your `wp-content/plugins` directory.
2. Activate the plugin in your WordPress dashboard.
3. Add `[track_generator]` shortcode to any page or post.

## Implemented Advanced Features

The following advanced items are now part of the live implementation:

1. **Chord Modifier Options** – Select between 7th chords, suspended chords
   (`sus2`/`sus4`), diminished, augmented, and power chords. Power chords render
   with a `5` suffix (e.g. `E5`).
2. **Mode-to-Scale Table** – JavaScript object mapping each mode to its scale
   formula.
3. **Diatonic Scale Generation** – Build the scale for the chosen key and mode
   (e.g. `C` + `Dorian` → `C D Eb F G A Bb`).
4. **Degree-to-Chord Mapping** – Determine chord quality per scale degree based
   on the current mode.
5. **Chord Rendering Engine** – Convert key, degree, and modifiers into proper
   chord names such as `Gsus4`.
6. **Random Modifiers** – Optionally assign a random modifier to each chord in a
   progression.
7. **Functional Flavor Options** – Borrowed chords from parallel modes and
   optional tritone substitutions for more complex progressions.
8. **LocalStorage** – Persist settings like BPM range, enabled modes, progression
   type, and UI preferences.
9. **Improved Display** – Show Roman numerals alongside chord names, plus scale
   chords and borrowed lists.
10. **Animated Generation** – Slot-style animation shows chords as they land.
11. **Expanded Workflow** – Multiple named progressions with reroll buttons,
    dark mode, and song-level suggestions.

## Future Enhancements

1. **Advanced Mode Toggle** – Optional switch to hide advanced panels for a
   lighter default view.
2. **Additional Song Elements** – Expand the suggestions list beyond the current
   key/tempo/dynamics/rhythm options.
