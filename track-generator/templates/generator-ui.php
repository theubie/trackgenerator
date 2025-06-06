<div class="tg-container">
    <button id="tg-generate">Generate</button>
    <button type="button" id="tg-settings-toggle">Hide Settings</button>
    <label class="tg-dark-toggle"><input type="checkbox" id="tg-dark-toggle"> Dark Mode</label>
    <div id="tg-output"></div>

    <div id="tg-settings">

    <fieldset class="tg-collapsible collapsed">
        <legend title="Set the BPM range for generated tracks">Tempo</legend>
        <label for="tg-bpm-min">BPM Min</label>
        <input id="tg-bpm-min" type="number" value="60">

        <label for="tg-bpm-max">BPM Max</label>
        <input id="tg-bpm-max" type="number" value="160">
    </fieldset>

    <fieldset class="tg-collapsible collapsed">
        <legend title="Manage your list of progressions to generate">Progressions</legend>
        <div id="tg-prog-list" class="tg-prog-list"></div>
        <button type="button" id="tg-add-prog">Add Progression</button>
    </fieldset>

    <fieldset class="tg-collapsible collapsed">
        <legend title="Choose how progressions are built">Progression Settings</legend>
        <label><input type="radio" name="tg-prog-type" value="tried" checked> Tried and True</label>
        <label><input type="radio" name="tg-prog-type" value="random"> True Random</label>
        <label for="tg-prog-length">Progression Length (for True Random)</label>
        <input id="tg-prog-length" type="number" value="4">
    </fieldset>

    <fieldset class="tg-collapsible collapsed">
        <legend title="Limit which keys may be chosen">Allowed Keys</legend>
        <label><input type="checkbox" class="tg-key-option" value="A" checked> A</label>
        <label><input type="checkbox" class="tg-key-option" value="A#" checked> A#</label>
        <label><input type="checkbox" class="tg-key-option" value="B" checked> B</label>
        <label><input type="checkbox" class="tg-key-option" value="C" checked> C</label>
        <label><input type="checkbox" class="tg-key-option" value="C#" checked> C#</label>
        <label><input type="checkbox" class="tg-key-option" value="D" checked> D</label>
        <label><input type="checkbox" class="tg-key-option" value="D#" checked> D#</label>
        <label><input type="checkbox" class="tg-key-option" value="E" checked> E</label>
        <label><input type="checkbox" class="tg-key-option" value="F" checked> F</label>
        <label><input type="checkbox" class="tg-key-option" value="F#" checked> F#</label>
        <label><input type="checkbox" class="tg-key-option" value="G" checked> G</label>
        <label><input type="checkbox" class="tg-key-option" value="G#" checked> G#</label>
    </fieldset>

    <fieldset class="tg-collapsible collapsed">
        <legend title="Control the likelihood of each musical mode">Modes</legend>
        <label>Major
            <select name="tg-mode-major" data-mode="Major">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3" selected>Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
            </select>
        </label>
        <label>Natural Minor
            <select name="tg-mode-natural" data-mode="Natural Minor">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4" selected>Common</option>
                <option value="5">Abundant</option>
            </select>
        </label>
        <label>Dorian
            <select name="tg-mode-dorian" data-mode="Dorian">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
            </select>
        </label>
        <label>Phrygian
            <select name="tg-mode-phrygian" data-mode="Phrygian">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
            </select>
        </label>
        <label>Lydian
            <select name="tg-mode-lydian" data-mode="Lydian">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
            </select>
        </label>
        <label>Mixolydian
            <select name="tg-mode-mixolydian" data-mode="Mixolydian">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
            </select>
        </label>
        <label>Locrian
            <select name="tg-mode-locrian" data-mode="Locrian">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
            </select>
        </label>
    </fieldset>

    <fieldset class="tg-collapsible collapsed">
        <legend title="Weights for chord modifiers like 7ths and sus chords">Chord Variation</legend>
        <label>Unmodified
            <select name="tg-mod-unmodified" data-mod="unmodified">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
                <option value="6">Always</option>
            </select>
        </label>
        <label>7th
            <select name="tg-mod-7" data-mod="7">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
            </select>
        </label>
        <label>sus2
            <select name="tg-mod-sus2" data-mod="sus2">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
            </select>
        </label>
        <label>sus4
            <select name="tg-mod-sus4" data-mod="sus4">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
            </select>
        </label>
        <label>diminished
            <select name="tg-mod-dim" data-mod="dim">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
            </select>
        </label>
        <label>augmented
            <select name="tg-mod-aug" data-mod="aug">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
            </select>
        </label>
        <label>power
            <select name="tg-mod-power" data-mod="power">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
            </select>
        </label>
    </fieldset>

    <fieldset class="tg-collapsible collapsed">
        <legend title="Borrow chords or use tritone substitutions">Functional Flavor</legend>
        <label>Borrowed
            <select name="tg-flavor-borrowed" data-flavor="borrowed">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
                <option value="6">Always</option>
            </select>
        </label>
        <label>Tritone Sub
            <select name="tg-flavor-tritone" data-flavor="tritone">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
                <option value="6">Always</option>
            </select>
        </label>
    </fieldset>

    <fieldset id="tg-song-elements" class="tg-collapsible collapsed">
        <legend title="Optional suggestions for song-wide changes">Song-Level Elements</legend>
        <label>Key Change
            <select name="tg-song-keychange" data-song="Key Change">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
            </select>
        </label>
        <label>Tempo Shift
            <select name="tg-song-tempo" data-song="Tempo Shift">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
            </select>
        </label>
        <label>Dynamics Change
            <select name="tg-song-dynamics" data-song="Dynamics Change">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
            </select>
        </label>
        <label>Rhythm Variation
            <select name="tg-song-rhythm" data-song="Rhythm Variation">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
            </select>
        </label>
    </fieldset>

    </div> <!-- end tg-settings -->

    <div class="tg-about">
        <h3>About This App</h3>
        <p>
            Track Generator is brought to you by
            <a href="https://www.youtube.com/@theubie">TheUbie</a>.
            Found a bug or have a feature request?
            <a href="https://github.com/theubie/trackgenerator/issues">Let me know on GitHub</a>.
            Enjoying it? <a href="https://streamelements.com/theubie-fc49c/tip">leave a tip</a>
            if you like.
        </p>
    </div>

</div>

