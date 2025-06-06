<div class="tg-container">
    <button id="tg-generate">Generate</button>
    <div id="tg-output"></div>

    <fieldset>
        <legend>Tempo</legend>
        <label for="tg-bpm-min">BPM Min</label>
        <input id="tg-bpm-min" type="number" value="60">

        <label for="tg-bpm-max">BPM Max</label>
        <input id="tg-bpm-max" type="number" value="160">
    </fieldset>

    <label><input type="checkbox" id="tg-adv-toggle"> Advanced Mode</label>

    <div id="tg-advanced" class="tg-advanced-options">
        <fieldset>
            <legend>Chord Modifiers</legend>
            <label>7th
                <select name="tg-mod-7" data-mod="7">
                    <option value="0">None</option>
                    <option value="1">Very Rare</option>
                    <option value="2">Rare</option>
                    <option value="3">Uncommon</option>
                    <option value="4">Common</option>
                    <option value="5">Abundant</option>
                    <option value="6">Always</option>
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
                    <option value="6">Always</option>
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
                    <option value="6">Always</option>
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
                    <option value="6">Always</option>
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
                    <option value="6">Always</option>
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
                    <option value="6">Always</option>
                </select>
            </label>
        </fieldset>
    </div>

    <fieldset>
        <legend>Modes</legend>
        <label>Major
            <select name="tg-mode-major" data-mode="Major">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3" selected>Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
                <option value="6">Always</option>
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
                <option value="6">Always</option>
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
                <option value="6">Always</option>
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
                <option value="6">Always</option>
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
                <option value="6">Always</option>
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
                <option value="6">Always</option>
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
                <option value="6">Always</option>
            </select>
        </label>
    </fieldset>

    <fieldset>
        <legend>Progression Settings</legend>
        <label><input type="radio" name="tg-prog-type" value="tried" checked> Tried and True</label>
        <label><input type="radio" name="tg-prog-type" value="random"> True Random</label>
        <label for="tg-prog-length">Progression Length (for True Random)</label>
        <input id="tg-prog-length" type="number" value="4">
    </fieldset>

    <fieldset>
        <legend>Progressions</legend>
        <div id="tg-prog-list" class="tg-prog-list"></div>
        <button type="button" id="tg-add-prog">Add Progression</button>
    </fieldset>

    <label><input type="checkbox" id="tg-suggest-song"> Suggest Song-Level Elements</label>
    <fieldset id="tg-song-elements" style="display:none;">
        <legend>Song-Level Elements</legend>
        <label>Key Change
            <select name="tg-song-keychange" data-song="Key Change">
                <option value="0">None</option>
                <option value="1">Very Rare</option>
                <option value="2">Rare</option>
                <option value="3">Uncommon</option>
                <option value="4">Common</option>
                <option value="5">Abundant</option>
                <option value="6">Always</option>
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
                <option value="6">Always</option>
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
                <option value="6">Always</option>
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
                <option value="6">Always</option>
            </select>
        </label>
    </fieldset>

</div>

