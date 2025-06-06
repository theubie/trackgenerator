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
            return key + ' ' + mode;
        },
        generateProgression: function(type, length) {
            var tried = [
                '1 - 4 - 5',
                '6 - 4 - 1 - 5',
                '2 - 5 - 1'
            ];
            if(type === 'tried') {
                return tried[randomInt(0, tried.length - 1)];
            }
            var prog = [];
            for(var i=0; i<length; i++) {
                prog.push(randomInt(1,7));
            }
            return prog.join(' - ');
        }
    };

    $(function() {
        if (!window.localStorage) { return; }
        var stored = localStorage.getItem('tg-options');
        if (!stored) { return; }
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
        } catch(e) {}
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

        if (window.localStorage) {
            var opts = {
                bpmMin: bpmMin,
                bpmMax: bpmMax,
                modes: modes,
                progType: progType,
                progLength: progLength
            };
            localStorage.setItem('tg-options', JSON.stringify(opts));
        }

        var result = '';
        result += '<p><strong>BPM:</strong> ' + tg.generateBPM(bpmMin, bpmMax) + '</p>';
        result += '<p><strong>Key:</strong> ' + tg.generateKey(modes) + '</p>';
        result += '<p><strong>Progression:</strong> ' + tg.generateProgression(progType, progLength) + '</p>';

        $('#tg-output').html(result);
    });
})(jQuery);
