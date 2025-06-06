(function($) {
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var weightLevels = {
        0: 0, // none
        1: 1, // very rare
        2: 2, // rare
        3: 3, // uncommon
        4: 4, // common
        5: 5, // abundant
        6: 6  // always
    };

    function weightedRandom(options) {
        var total = 0;
        for (var i = 0; i < options.length; i++) {
            total += options[i].weight;
        }
        if (total === 0) { return null; }
        var r = Math.random() * total;
        var sum = 0;
        for (var j = 0; j < options.length; j++) {
            sum += options[j].weight;
            if (r < sum) {
                return options[j].value;
            }
        }
        return null;
    }

    window.tg = {
        generateBPM: function(min, max) {
            return randomInt(min, max);
        },
        generateKey: function(modeWeights) {
            var keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
            var key = keys[randomInt(0, keys.length - 1)];
            var modeOptions = [];
            for (var m in modeWeights) {
                modeOptions.push({ value: m, weight: modeWeights[m] });
            }
            var mode = weightedRandom(modeOptions) || 'Major';
            return { key: key, mode: mode, text: key + ' ' + mode };
        },
        generateProgression: function(type, length) {
            var tried = [
                [1,4,5],
                [6,4,1,5],
                [2,5,1]
            ];
            if(type === 'tried') {
                return tried[randomInt(0, tried.length - 1)];
            }
            var prog = [];
            for(var i=0; i<length; i++) {
                prog.push(randomInt(1,7));
            }
            return prog;
        },

        modeFormulas: {
            'Major':      [0,2,4,5,7,9,11],
            'Natural Minor': [0,2,3,5,7,8,10],
            'Dorian':     [0,2,3,5,7,9,10],
            'Phrygian':   [0,1,3,5,7,8,10],
            'Lydian':     [0,2,4,6,7,9,11],
            'Mixolydian': [0,2,4,5,7,9,10],
            'Locrian':    [0,1,3,5,6,8,10]
        },

        degreeQualities: {
            'Major':      ['maj','min','min','maj','maj','min','dim'],
            'Natural Minor': ['min','dim','maj','min','min','maj','maj'],
            'Dorian':     ['min','min','maj','maj','min','dim','maj'],
            'Phrygian':   ['min','maj','maj','min','dim','maj','min'],
            'Lydian':     ['maj','maj','min','dim','maj','min','min'],
            'Mixolydian': ['maj','min','dim','maj','min','min','maj'],
            'Locrian':    ['dim','maj','min','min','maj','maj','min']
        },

        buildScale: function(key, mode) {
            var notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
            var start = notes.indexOf(key);
            if(start === -1) { start = 0; }
            var formula = this.modeFormulas[mode] || this.modeFormulas['Major'];
            var scale = [];
            for(var i=0;i<formula.length;i++) {
                scale.push(notes[(start + formula[i]) % 12]);
            }
            return scale;
        },

        renderChord: function(note, quality, modifiers) {
            // If a power chord is requested, return note + '5'
            if (modifiers && modifiers.indexOf('power') !== -1) {
                return note + '5';
            }

            var name = note;
            if(quality === 'min') { name += 'm'; }
            if(quality === 'dim') { name += 'dim'; }
            // Omit explicit 'maj' for major chords
            // This keeps plain majors like 'E' instead of 'Emaj'
            if(modifiers && modifiers.length) {
                name += modifiers.join('');
            }
            return name;
        },

        songElements: [
            'Key Change',
            'Tempo Shift',
            'Dynamics Change',
            'Rhythm Variation'
        ],

        generateSongElements: function(weights, count) {
            var opts = [];
            for (var k in weights) {
                opts.push({ value: k, weight: weights[k] });
            }
            var results = [];
            for (var i = 0; i < count; i++) {
                var pick = weightedRandom(opts);
                if (pick) { results.push(pick); }
            }
            return results;
        },

        renderProgression: function(degrees, keyObj, modWeights) {
            var scale = this.buildScale(keyObj.key, keyObj.mode);
            var qualities = this.degreeQualities[keyObj.mode] || this.degreeQualities['Major'];
            var chords = [];
            var modOptions = [];
            if (modWeights) {
                var unmod = modWeights['unmodified'] || 0;
                var unmodAlways = unmod === weightLevels[6];
                modOptions.push({ value: null, weight: unmod });
                if (!unmodAlways) {
                    for (var m in modWeights) {
                        if (m === 'unmodified') { continue; }
                        modOptions.push({ value: m, weight: modWeights[m] });
                    }
                }
            }
            for(var i=0;i<degrees.length;i++) {
                var deg = degrees[i]-1;
                var mods = [];
                var chosen = weightedRandom(modOptions);
                if (chosen) { mods.push(chosen); }
                var chord = this.renderChord(scale[deg], qualities[deg], mods);
                chords.push(chord);
            }
            return chords;
        }
    };

    function spinSlot($slot, chord, delay) {
        var pool = ['A','Am','B','Bm','C','Cm','D','Dm','E','Em','F','Fm','G','Gm'];
        var $reel = $slot.find('.slot-reel');
        $reel.empty();
        var items = [];
        for (var i = 0; i < 10; i++) {
            items.push(pool[randomInt(0, pool.length - 1)]);
        }
        items.push(chord);
        for (var j = 0; j < items.length; j++) {
            $reel.append('<div class="slot-item">' + items[j] + '</div>');
        }
        var itemHeight = $reel.find('.slot-item').outerHeight(true);
        var finalTop = -itemHeight * (items.length - 1);
        $reel.css('marginTop', 0);
        setTimeout(function(){
            $reel.animate({ marginTop: finalTop }, 500);
        }, delay || 0);
    }

    function addProgRow(name) {
        var $row = $('<div class="tg-prog-row">' +
            '<input type="text" class="tg-prog-name" placeholder="Progression name">' +
            '<button type="button" class="tg-remove-prog">Remove</button>' +
            '</div>');
        if (name) { $row.find('input').val(name); }
        $('#tg-prog-list').append($row);
    }

    $(function() {
        $('#tg-adv-toggle').on('change', function(){
            $('#tg-advanced').toggle(this.checked);
        }).trigger('change');

        $('#tg-suggest-song').on('change', function(){
            $('#tg-song-elements').toggle(this.checked);
        }).trigger('change');

        $('#tg-add-prog').on('click', function(){
            addProgRow();
        });

        $(document).on('click', '.tg-remove-prog', function(){
            $(this).closest('.tg-prog-row').remove();
            if ($('#tg-prog-list .tg-prog-row').length === 0) {
                addProgRow('Progression 1');
            }
        });

        if ($('#tg-prog-list .tg-prog-row').length === 0) {
            addProgRow('Progression 1');
        }
    });

    $(document).on('click', '#tg-generate', function() {
        var bpmMin = parseInt($('#tg-bpm-min').val(), 10);
        var bpmMax = parseInt($('#tg-bpm-max').val(), 10);
        var modeWeights = {};
        $('select[data-mode]').each(function(){
            modeWeights[$(this).data('mode')] = parseInt($(this).val(), 10);
        });
        var progType = $('input[name="tg-prog-type"]:checked').val();
        var progLength = parseInt($('#tg-prog-length').val(), 10) || 4;
        var advEnabled = $('#tg-adv-toggle').is(':checked');
        var modWeights = {};
        $('select[data-mod]').each(function(){
            modWeights[$(this).data('mod')] = parseInt($(this).val(), 10);
        });
        var progNames = [];
        $('#tg-prog-list .tg-prog-row').each(function(idx){
            var name = $(this).find('.tg-prog-name').val().trim();
            if (!name) { name = 'Progression ' + (idx + 1); }
            progNames.push(name);
        });
        var suggestSong = $('#tg-suggest-song').is(':checked');
        var songWeights = {};
        $('select[data-song]').each(function(){
            songWeights[$(this).data('song')] = parseInt($(this).val(), 10);
        });

        var bpm = tg.generateBPM(bpmMin, bpmMax);
        var keyObj = tg.generateKey(modeWeights);
        var result = '';
        result += '<p><strong>BPM:</strong> ' + bpm + '</p>';
        result += '<p><strong>Key:</strong> ' + keyObj.text + '</p>';
        var allChords = [];
        for (var p = 0; p < progNames.length; p++) {
            var progDegrees = tg.generateProgression(progType, progLength);
            var chords = tg.renderProgression(progDegrees, keyObj, advEnabled ? modWeights : null);
            result += '<section class="tg-prog-result">';
            result += '<h4>' + progNames[p] + '</h4>';
            result += '<p><strong>Degrees:</strong> ' + progDegrees.join(' - ') + '</p>';
            result += '<p><em>Chords:</em> ' + chords.join(' - ') + '</p>';
            result += '<div class="tg-slots-group"></div>';
            result += '</section>';
            allChords.push(chords);
        }

        if (suggestSong) {
            var suggestions = tg.generateSongElements(songWeights, 2);
            if (suggestions.length) {
                result += '<p><strong>Song Suggestions:</strong> ' + suggestions.join('; ') + '</p>';
            }
        }

        $('#tg-output').html(result);

        $('#tg-output .tg-prog-result').each(function(p){
            var chords = allChords[p];
            var $group = $(this).find('.tg-slots-group');
            for (var i = 0; i < chords.length; i++) {
                var $slot = $('<div class="slot"><div class="slot-reel"></div></div>');
                $group.append($slot);
                spinSlot($slot, chords[i], p * 500 + i * 150);
            }
        });
    });
})(jQuery);
