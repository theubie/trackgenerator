# Track Generator Web App (WordPress Plugin)

## Project Overview

This lightweight plugin adds a track idea generator to any WordPress site. It provides random prompts for tempo, key and mode, and chord progressions. The implementation uses vanilla JavaScript so it works with most WordPress setups.

## Core Features

1. **BPM Generator**
   - Users select a minimum and maximum BPM (default 60–160).
   - The app outputs a random BPM in that range.
2. **Key + Mode Selector**
   - Checkboxes allow the user to enable modes (Major or Natural Minor).
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

## Future Enhancements

- More modes (Dorian, Mixolydian, etc.)
- Display actual chords instead of numbers
- Support 7th/9th/aug/dim variations
- Ability to save or copy results
- Dark mode toggle
- OBS overlay-friendly output
