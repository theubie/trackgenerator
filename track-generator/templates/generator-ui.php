<div class="tg-container">
    <label for="tg-bpm-min">BPM Min</label>
    <input id="tg-bpm-min" type="number" value="60">

    <label for="tg-bpm-max">BPM Max</label>
    <input id="tg-bpm-max" type="number" value="160">

    <label><input type="checkbox" id="tg-adv-toggle"> Advanced Mode</label>

    <div id="tg-advanced" class="tg-advanced-options">
        <fieldset>
            <legend>Chord Modifiers</legend>
            <label><input type="checkbox" name="tg-modifiers[]" value="7"> 7th</label>
            <label><input type="checkbox" name="tg-modifiers[]" value="sus2"> sus2</label>
            <label><input type="checkbox" name="tg-modifiers[]" value="sus4"> sus4</label>
            <label><input type="checkbox" name="tg-modifiers[]" value="dim"> diminished</label>
            <label><input type="checkbox" name="tg-modifiers[]" value="aug"> augmented</label>
            <label><input type="checkbox" name="tg-modifiers[]" value="power"> power</label>
        </fieldset>
    </div>

    <fieldset>
        <legend>Modes</legend>
        <label><input type="checkbox" name="tg-modes[]" value="Major" checked> Major</label>
        <label><input type="checkbox" name="tg-modes[]" value="Natural Minor" checked> Natural Minor</label>
        <label><input type="checkbox" name="tg-modes[]" value="Dorian"> Dorian</label>
        <label><input type="checkbox" name="tg-modes[]" value="Phrygian"> Phrygian</label>
        <label><input type="checkbox" name="tg-modes[]" value="Lydian"> Lydian</label>
        <label><input type="checkbox" name="tg-modes[]" value="Mixolydian"> Mixolydian</label>
        <label><input type="checkbox" name="tg-modes[]" value="Locrian"> Locrian</label>
    </fieldset>

    <fieldset>
        <legend>Progression Type</legend>
        <label><input type="radio" name="tg-prog-type" value="tried" checked> Tried and True</label>
        <label><input type="radio" name="tg-prog-type" value="random"> True Random</label>
    </fieldset>

    <label for="tg-prog-length">Progression Length (for True Random)</label>
    <input id="tg-prog-length" type="number" value="4">

    <button id="tg-generate">Generate</button>

    <div id="tg-output"></div>
    <div id="tg-slots" class="tg-slots"></div>
</div>
