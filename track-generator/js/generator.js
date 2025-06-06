(function($) {
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    window.tg = {
        generateBPM: function(min, max) {
            return randomInt(min, max);
        },
        generateKey: function(modes) {
            var keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
            var key = keys[randomInt(0, keys.length - 1)];
            var mode = modes[randomInt(0, modes.length - 1)];
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

        renderProgression: function(degrees, keyObj, modifiers) {
            var scale = this.buildScale(keyObj.key, keyObj.mode);
            var qualities = this.degreeQualities[keyObj.mode] || this.degreeQualities['Major'];
            var chords = [];
            for(var i=0;i<degrees.length;i++) {
                var deg = degrees[i]-1;
                var mods = [];
                if (modifiers && modifiers.length) {
                    var idx = randomInt(-1, modifiers.length - 1);
                    if (idx !== -1) {
                        mods.push(modifiers[idx]);
                    }
                }
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

    $(function() {
        var stored = window.localStorage ? localStorage.getItem('tg-options') : null;
        if (stored) {
            try {
                var opts = JSON.parse(stored);
                if (opts.bpmMin !== undefined) {
                    $('#tg-bpm-min').val(opts.bpmMin);
                }
                if (opts.bpmMax !== undefined) {
                    $('#tg-bpm-max').val(opts.bpmMax);
                }
                if (Array.isArray(opts.modes)) {
                    $('input[name="tg-modes[]"]').prop('checked', false).each(function(){
                        if (opts.modes.indexOf($(this).val()) !== -1) {
                            $(this).prop('checked', true);
                        }
                    });
                }
                if (opts.progType) {
                    $('input[name="tg-prog-type"][value="' + opts.progType + '"]')
                        .prop('checked', true);
                }
                if (opts.progLength !== undefined) {
                    $('#tg-prog-length').val(opts.progLength);
                }
                if (opts.advEnabled) {
                    $('#tg-adv-toggle').prop('checked', true);
                    $('#tg-advanced').show();
                }
                if (Array.isArray(opts.modifiers)) {
                    $('input[name="tg-modifiers[]"]').prop('checked', false).each(function(){
                        if (opts.modifiers.indexOf($(this).val()) !== -1) {
                            $(this).prop('checked', true);
                        }
                    });
                }
            } catch(e) {}
        }
        $('#tg-adv-toggle').on('change', function(){
            $('#tg-advanced').toggle(this.checked);
        }).trigger('change');
    });

    $(document).on('click', '#tg-generate', function() {
        var bpmMin = parseInt($('#tg-bpm-min').val(), 10);
        var bpmMax = parseInt($('#tg-bpm-max').val(), 10);
        var modes = [];
        $('input[name="tg-modes[]"]:checked').each(function(){
            modes.push($(this).val());
        });
        var progType = $('input[name="tg-prog-type"]:checked').val();
        var progLength = parseInt($('#tg-prog-length').val(), 10) || 4;
        var advEnabled = $('#tg-adv-toggle').is(':checked');
        var modifiers = [];
        $('input[name="tg-modifiers[]"]:checked').each(function(){
            modifiers.push($(this).val());
        });

        if (window.localStorage) {
            var opts = {
                bpmMin: bpmMin,
                bpmMax: bpmMax,
                modes: modes,
                progType: progType,
                progLength: progLength,
                advEnabled: advEnabled,
                modifiers: modifiers
            };
            localStorage.setItem('tg-options', JSON.stringify(opts));
        }

        var keyObj = tg.generateKey(modes);
        var progDegrees = tg.generateProgression(progType, progLength);
        var result = '';
        result += '<p><strong>BPM:</strong> ' + tg.generateBPM(bpmMin, bpmMax) + '</p>';
        result += '<p><strong>Key:</strong> ' + keyObj.text + '</p>';
        result += '<p><strong>Progression:</strong> ' + progDegrees.join(' - ') + '</p>';
        var chords = [];
        if (advEnabled) {
            chords = tg.renderProgression(progDegrees, keyObj, modifiers);
            result += '<p><strong>Chords:</strong> ' + chords.join(' - ') + '</p>';
        }

        $('#tg-output').html(result);

        var $slots = $('#tg-slots');
        $slots.empty();
        if (chords.length) {
            for (var i = 0; i < chords.length; i++) {
                var $slot = $('<div class="slot"><div class="slot-reel"></div></div>');
                $slots.append($slot);
                spinSlot($slot, chords[i], i * 150);
            }
        }
    });
})(jQuery);
