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

    var romanNums = ['I','II','III','IV','V','VI','VII'];

    // Holds the most recently generated settings so individual
    // progressions can be rerolled without affecting others
    var tgState = null;

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
        generateKey: function(modeWeights, allowedKeys) {
            var keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
            var pool = (allowedKeys && allowedKeys.length) ? allowedKeys : keys;
            var key = pool[randomInt(0, pool.length - 1)];
            var modeOptions = [];
            for (var m in modeWeights) {
                modeOptions.push({ value: m, weight: modeWeights[m] });
            }
            var mode = weightedRandom(modeOptions) || 'Major';
            return { key: key, mode: mode, text: key + ' ' + mode };
        },
        generateProgression: function(type, length) {
            var tried = [
                [1, 4, 5],
                [6, 4, 1, 5],
                [2, 5, 1],
                [1, 5, 6, 4],
                [1, 6, 4, 5],
                [1, 5, 4],
                [1, 2, 5],
                [1, 3, 4, 5],
                [6, 4, 5],
                [6, 5, 4, 5],
                [6, 3, 7, 1],
                [2, 6, 5, 1],
                [4, 2, 5, 1],
                [1, 5, 7, 4],
                [1, 4, 6, 5],
                [1, 4, 2, 5],
                [1, 6, 3, 7],
                [4, 5, 1, 6],
                [6, 1, 2, 5]
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

        romanNumeral: function(degree, quality) {
            var n = romanNums[degree - 1] || '';
            if (quality === 'min') { n = n.toLowerCase(); }
            if (quality === 'dim') { n = n.toLowerCase() + '\u00B0'; }
            return n;
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

        renderProgression: function(degrees, keyObj, modWeights, flavorWeights) {
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
            var borrowProb = flavorWeights ? (flavorWeights['borrowed'] || 0) / weightLevels[6] : 0;
            var tritoneProb = flavorWeights ? (flavorWeights['tritone'] || 0) / weightLevels[6] : 0;
            var parallelMap = {
                'Major': 'Natural Minor',
                'Natural Minor': 'Major'
            };
            var parallel = parallelMap[keyObj.mode] || keyObj.mode;
            var parScale = this.buildScale(keyObj.key, parallel);
            var parQual = this.degreeQualities[parallel] || qualities;
            var notesArray = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
            var borrowIndex = -1;
            if (borrowProb > 0 && Math.random() < borrowProb) {
                var eligible = [];
                for (var b = 0; b < degrees.length; b++) {
                    if (degrees[b] !== 1 && degrees[b] !== 5) {
                        eligible.push(b);
                    }
                }
                if (eligible.length) {
                    borrowIndex = eligible[randomInt(0, eligible.length - 1)];
                }
            }
            for(var i=0;i<degrees.length;i++) {
                var deg = degrees[i]-1;
                var mods = [];
                var chosen = weightedRandom(modOptions);
                if (chosen) { mods.push(chosen); }
                var note = scale[deg];
                var qual = qualities[deg];
                var borrowed = false;
                if (i === borrowIndex) {
                    note = parScale[deg];
                    qual = parQual[deg];
                    borrowed = true;
                }
                if (Math.random() < tritoneProb) {
                    var idx = notesArray.indexOf(note);
                    note = notesArray[(idx + 6) % 12];
                }
                var chord = this.renderChord(note, qual, mods);
                var roman = this.romanNumeral(degrees[i], qual);
                chords.push({ chord: chord, roman: roman, borrowed: borrowed });
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
        setTimeout(function(){
            $slot.fadeOut(400, function(){ $(this).remove(); });
        }, (delay || 0) + 2000);
    }

function addProgRow(name) {
        var $row = $('<div class="tg-prog-row">' +
            '<input type="text" class="tg-prog-name" placeholder="Progression name">' +
            '<button type="button" class="tg-remove-prog">Remove</button>' +
            '</div>');
        if (name) { $row.find('input').val(name); }
        $('#tg-prog-list').append($row);
        saveProgNames();
}

function saveProgNames() {
        var names = [];
        $('#tg-prog-list .tg-prog-row').each(function(idx){
            var n = $(this).find('.tg-prog-name').val().trim();
            if (!n) { n = 'Progression ' + (idx + 1); }
            names.push(n);
        });
        var existing = {};
        try {
            existing = JSON.parse(localStorage.getItem('tgSettings')) || {};
        } catch(e) {}
        existing.progNames = names;
        try {
            localStorage.setItem('tgSettings', JSON.stringify(existing));
        } catch(e) {}
}

    function loadSettings() {
        try {
            var s = JSON.parse(localStorage.getItem('tgSettings'));
        } catch(e) { return; }
        if (!s) { return; }
        if (s.bpmMin) { $('#tg-bpm-min').val(s.bpmMin); }
        if (s.bpmMax) { $('#tg-bpm-max').val(s.bpmMax); }
        if (s.modeWeights) {
            $('select[data-mode]').each(function(){
                var m = $(this).data('mode');
                if (s.modeWeights[m] !== undefined) { $(this).val(s.modeWeights[m]); }
            });
        }
        if (s.progType) {
            $('input[name="tg-prog-type"][value="' + s.progType + '"]').prop('checked', true);
        }
        if (s.progLength) { $('#tg-prog-length').val(s.progLength); }
        if (s.modWeights) {
            $('select[data-mod]').each(function(){
                var k = $(this).data('mod');
                if (s.modWeights[k] !== undefined) { $(this).val(s.modWeights[k]); }
            });
        }
        if (s.flavorWeights) {
            $('select[data-flavor]').each(function(){
                var k = $(this).data('flavor');
                if (s.flavorWeights[k] !== undefined) { $(this).val(s.flavorWeights[k]); }
            });
        }
        if (s.keys) {
            $('.tg-key-option').each(function(){
                $(this).prop('checked', s.keys.indexOf($(this).val()) !== -1);
            });
        }
        if (s.darkMode) {
            $('#tg-dark-toggle').prop('checked', true);
            $('.tg-container').addClass('tg-dark-mode');
        }
        if (s.progNames && s.progNames.length) {
            $('#tg-prog-list').empty();
            for (var i = 0; i < s.progNames.length; i++) {
                addProgRow(s.progNames[i]);
            }
        }
    }

    function saveDarkSetting(val) {
        var existing = {};
        try {
            existing = JSON.parse(localStorage.getItem('tgSettings')) || {};
        } catch(e) {}
        existing.darkMode = val;
        try {
            localStorage.setItem('tgSettings', JSON.stringify(existing));
        } catch(e) {}
    }

    $(function() {
        loadSettings();
        $(".tg-collapsible").addClass("collapsed");
        $("#tg-settings-toggle").on("click", function(){
            $("#tg-settings").toggleClass("collapsed");
            $(this).text($("#tg-settings").hasClass("collapsed") ? "Show Settings" : "Hide Settings");
        });

        $('#tg-add-prog').on('click', function(){
            addProgRow();
        });

        $(document).on('click', '.tg-remove-prog', function(){
            $(this).closest('.tg-prog-row').remove();
            if ($('#tg-prog-list .tg-prog-row').length === 0) {
                addProgRow('Progression 1');
            }
            saveProgNames();
        });

        $(document).on('input', '.tg-prog-name', saveProgNames);

        $(document).on('click', '.tg-collapsible > legend', function(){
            $(this).parent().toggleClass('collapsed');
        });

        $('#tg-dark-toggle').on('change', function(){
            $('.tg-container').toggleClass('tg-dark-mode', this.checked);
            saveDarkSetting(this.checked);
        }).trigger('change');

        if ($('#tg-prog-list .tg-prog-row').length === 0) {
            addProgRow('Progression 1');
        }
    });

    $(document).on('click', '#tg-generate', function() {
        $("#tg-settings .tg-collapsible").addClass("collapsed");
        var bpmMin = parseInt($('#tg-bpm-min').val(), 10);
        var bpmMax = parseInt($('#tg-bpm-max').val(), 10);
        var modeWeights = {};
        $('select[data-mode]').each(function(){
            modeWeights[$(this).data('mode')] = parseInt($(this).val(), 10);
        });
        var progType = $('input[name="tg-prog-type"]:checked').val();
        var progLength = parseInt($('#tg-prog-length').val(), 10) || 4;
        var modWeights = {};
        $('select[data-mod]').each(function(){
            modWeights[$(this).data('mod')] = parseInt($(this).val(), 10);
        });
        var flavorWeights = {};
        $('select[data-flavor]').each(function(){
            flavorWeights[$(this).data('flavor')] = parseInt($(this).val(), 10);
        });
        var progNames = [];
        $('#tg-prog-list .tg-prog-row').each(function(idx){
            var name = $(this).find('.tg-prog-name').val().trim();
            if (!name) { name = 'Progression ' + (idx + 1); }
            progNames.push(name);
        });
        saveProgNames();
        var songWeights = {};
        $('select[data-song]').each(function(){
            songWeights[$(this).data('song')] = parseInt($(this).val(), 10);
        });
        var allowedKeys = [];
        $('.tg-key-option:checked').each(function(){
            allowedKeys.push($(this).val());
        });

        var settings = {
            bpmMin: bpmMin,
            bpmMax: bpmMax,
            modeWeights: modeWeights,
            progType: progType,
            progLength: progLength,
            modWeights: modWeights,
            flavorWeights: flavorWeights,
            keys: allowedKeys,
            darkMode: $('#tg-dark-toggle').is(':checked'),
            progNames: progNames
        };
        try {
            localStorage.setItem('tgSettings', JSON.stringify(settings));
        } catch(e) {}

        var bpm = tg.generateBPM(bpmMin, bpmMax);
        var keyObj = tg.generateKey(modeWeights, allowedKeys);

        tgState = {
            bpm: bpm,
            keyObj: keyObj,
            progType: progType,
            progLength: progLength,
            modWeights: modWeights,
            flavorWeights: flavorWeights,
            progNames: progNames
        };
        var scaleNotes = tg.buildScale(keyObj.key, keyObj.mode);
        var scaleQualities = tg.degreeQualities[keyObj.mode] || tg.degreeQualities['Major'];
        var scaleChords = scaleNotes.map(function(note, idx){
            return tg.renderChord(note, scaleQualities[idx], []);
        });
        var result = '<div id="tg-output-summary"><strong>' + keyObj.text + '</strong> - ' + bpm + ' BPM</div>';
        var sectionsHtml = '';
        var allChords = [];
        for (var p = 0; p < progNames.length; p++) {
            var progDegrees = tg.generateProgression(progType, progLength);
            var chords = tg.renderProgression(progDegrees, keyObj, modWeights, flavorWeights);
            sectionsHtml += '<section class="tg-prog-result" data-idx="' + p + '">';
            sectionsHtml += '<h4>' +
                '<button type="button" class="tg-reroll-prog" data-idx="' + p + '" aria-label="Reroll">&#x21bb;</button>' +
                progNames[p] +
                '</h4>';
            sectionsHtml += '<p class="tg-degrees"><strong>Degrees:</strong> ' + progDegrees.join(' - ') + '</p>';
            var chordLinks = chords.map(function(c){
                var borrowedLabel = c.borrowed ? ' <span class="tg-borrowed">(borrowed)</span>' : '';
                var borrowedClass = c.borrowed ? ' tg-chord-borrowed' : '';
                return '<span class="tg-chord-wrap' + borrowedClass + '"><a href="#" class="tg-chord-link" data-chord="' + c.chord + '">' + c.chord + '</a> <span class="tg-roman">(' + c.roman + ')</span>' + borrowedLabel + '</span>';
            });
            sectionsHtml += '<p class="tg-chords"><em>Chords:</em> ' + chordLinks.join(' ') + '</p>';
            sectionsHtml += '<div class="tg-slots-group"></div>';
            sectionsHtml += '</section>';
            allChords.push(chords);
        }

        result += renderScaleChordsMarkup(scaleChords, collectBorrowedChords(allChords));
        result += sectionsHtml;

        var suggestions = tg.generateSongElements(songWeights, 2);
        if (suggestions.length) {
            result += "<p><strong>Song Suggestions:</strong> " + suggestions.join("; ") + "</p>";
        }

        $('#tg-output').html(result);

        tgState.allChords = allChords;
        tgState.scaleChords = scaleChords;

        $('#tg-output .tg-prog-result').each(function(p){
            var chords = allChords[p];
            var $group = $(this).find('.tg-slots-group');
            for (var i = 0; i < chords.length; i++) {
                var ch = chords[i].chord;
                var $slot = $('<div class="slot" data-chord="' + ch + '"><div class="slot-reel"></div></div>');
                $group.append($slot);
                spinSlot($slot, ch, p * 500 + i * 150);
            }
        });
    });

    // Reroll a single progression without affecting others
    $(document).on('click', '.tg-reroll-prog', function(){
        var idx = parseInt($(this).data('idx'), 10);
        if (tgState && !isNaN(idx)) {
            var progDegrees = tg.generateProgression(tgState.progType, tgState.progLength);
            var chords = tg.renderProgression(progDegrees, tgState.keyObj, tgState.modWeights, tgState.flavorWeights);
            var $section = $('#tg-output .tg-prog-result').eq(idx);
            $section.find('.tg-degrees').html('<strong>Degrees:</strong> ' + progDegrees.join(' - '));
            var chordLinks = chords.map(function(c){
                var borrowedLabel = c.borrowed ? ' <span class="tg-borrowed">(borrowed)</span>' : '';
                var borrowedClass = c.borrowed ? ' tg-chord-borrowed' : '';
                return '<span class="tg-chord-wrap' + borrowedClass + '"><a href="#" class="tg-chord-link" data-chord="' + c.chord + '">' + c.chord + '</a> <span class="tg-roman">(' + c.roman + ')</span>' + borrowedLabel + '</span>';
            });
            $section.find('.tg-chords').html('<em>Chords:</em> ' + chordLinks.join(' '));
            var $group = $section.find('.tg-slots-group').empty();
            for (var i = 0; i < chords.length; i++) {
                var ch = chords[i].chord;
                var $slot = $('<div class="slot" data-chord="' + ch + '"><div class="slot-reel"></div></div>');
                $group.append($slot);
                spinSlot($slot, ch, i * 150);
            }
            if (tgState) {
                if (!tgState.allChords) {
                    tgState.allChords = [];
                }
                tgState.allChords[idx] = chords;
                if (tgState.scaleChords) {
                    $('#tg-output .tg-scale-chords').replaceWith(
                        renderScaleChordsMarkup(tgState.scaleChords, collectBorrowedChords(tgState.allChords))
                    );
                }
            }
        }
    });


    $(document).on('click', '.tg-chord-link', function(e){
        e.preventDefault();
        var chord = $(this).data('chord');
        if (chord) {
            showChordPopup(chord);
        }
    });

    function showChordPopup(chord) {
        var $overlay = $('<div class="tg-chord-overlay"></div>');
        var $popup = $('<div class="tg-chord-popup"></div>');
        var $close = $('<button type="button" class="tg-chord-close">&times;</button>');
        var customId = 'scapi-' + Date.now();
        var $content = $('<div class="scales_chords_api" chord="' + chord + '" instrument="guitar" output="image" customid="' + customId + '"></div>');
        $popup.append($close).append($content);
        $('body').append($overlay).append($popup);
        $close.on('click', remove);
        $overlay.on('click', remove);
        if (window.scales_chords_api_refresh) {
            window.scales_chords_api_refresh(customId);
        } else if (window.renderScalesChords) {
            window.renderScalesChords();
        }
        function remove() {
            $overlay.remove();
            $popup.remove();
        }
    }

    function collectBorrowedChords(chordsList) {
        var borrowed = [];
        var seen = {};
        for (var i = 0; i < chordsList.length; i++) {
            var chords = chordsList[i] || [];
            for (var j = 0; j < chords.length; j++) {
                var chord = chords[j];
                if (chord.borrowed && !seen[chord.chord]) {
                    seen[chord.chord] = true;
                    borrowed.push(chord.chord);
                }
            }
        }
        return borrowed;
    }

    function renderScaleChordsMarkup(scaleChords, borrowedChords) {
        var chordLinks = scaleChords.map(function(chord){
            return '<span class="tg-chord-wrap"><a href="#" class="tg-chord-link" data-chord="' + chord + '">' + chord + '</a></span>';
        });
        var borrowedMarkup = '';
        if (borrowedChords && borrowedChords.length) {
            var borrowedLinks = borrowedChords.map(function(chord){
                return '<span class="tg-chord-wrap tg-chord-borrowed"><a href="#" class="tg-chord-link" data-chord="' + chord + '">' + chord + '</a> <span class="tg-borrowed">(borrowed)</span></span>';
            });
            borrowedMarkup = ' <span class="tg-borrowed-list"><strong>Borrowed:</strong> ' + borrowedLinks.join(' ') + '</span>';
        }
        return '<div class="tg-scale-chords"><strong>Scale Chords:</strong> ' + chordLinks.join(' - ') + borrowedMarkup + '</div>';
    }
})(jQuery);
