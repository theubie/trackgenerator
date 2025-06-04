🎵 Track Generator Web App (WordPress Plugin)
📌 Project Overview
This project is a lightweight, standalone WordPress plugin that adds a track idea generator to your website. The generator provides musicians with random prompts for:

Tempo (BPM)

Key (including selectable modes)

Chord Progression (either from a curated list or randomized)

The plugin is built with vanilla JavaScript and minimal dependencies to keep it light and compatible with most WordPress setups.

🛠️ Core Features
1. BPM Generator
User sets min and max BPM (defaults: 60–160).

Output is a random BPM in the selected range.

2. Key + Mode Selector
Dropdown or checkbox interface to select allowed modes:

Major (Ionian)

Natural Minor (Aeolian)

[future support] Dorian, Phrygian, Mixolydian, etc.

Output is a randomly selected key (A–G#) and one of the selected modes.

3. Chord Progression Generator
Option 1: Tried and True

Randomly selects from a hardcoded list of common progressions (e.g., 1-4-5, 6-4-1-5, 2-5-1).

Option 2: True Random

User sets a length (e.g., 3–8 chords).

App generates a list of numbers 1–7 (diatonic chord degrees) with random picks per slot.

🧩 UI Elements
Element	Type	Notes
BPM Min	<input type="number">	Default: 60
BPM Max	<input type="number">	Default: 160
Mode Select	<input type="checkbox">	Each mode has its own checkbox
Progression Type	<input type="radio">	"Tried and True" or "True Random"
Progression Length	<input type="number">	Only shows if "True Random" is selected
Generate Button	<button>	Triggers the generator logic
Output Display	<div>	Area to display generated result

🧠 Business Logic Overview
generateBPM(min, max)
Returns a random integer BPM between min and max.

generateKey(modes)
Randomly selects a key from A to G#.

Randomly selects one of the enabled modes from the checkbox list.

generateProgression(type, length)
If type == "tried", selects from a predefined array of progressions.

If type == "random", returns an array of length integers from 1–7.

🗂️ File Structure
bash
Copy
Edit
track-generator/
├── css/
│   └── style.css             # Custom styling for the plugin UI
├── js/
│   └── generator.js          # All logic (BPM, Key, Progression generation)
├── templates/
│   └── generator-ui.php      # HTML markup for the UI
├── track-generator.php       # Main plugin file (enqueue assets, shortcode handler)
└── readme.txt                # WordPress plugin metadata
🧪 Example Output
yaml
Copy
Edit
🎲 Generated Track Idea:
- BPM: 128
- Key: D# Natural Minor
- Progression: 6 - 4 - 1 - 5
📦 Installation (for WP Testing)
Clone this repo into your wp-content/plugins directory.

Activate the plugin in your WordPress dashboard.

Add [track_generator] shortcode to any page/post to embed the tool.

🧱 Future Enhancements
More modes (Dorian, Mixolydian, etc.)

Display actual chords instead of just numbers

Option to include 7th/9th/aug/dim variations

Save or copy results

Dark mode toggle

OBS overlay-friendly version (bare output + hotkey support)
