/**
 * DigitasLBI
 * @version 0.1
 * @author www.digitaslbi.com/se
 * @copyright DigitasLBI 2016
 */

var NIBS = window.NIBS || {};
NIBS.main = (function() {

    // Private methods & properties ***

    var _sparkleControl,
        _dur = 0.2,
        _tm1,
        _$inner,
        _$textWrapper,
        _$labelBtn,

        _textWrapperX = 0,
        _sliderK = 1 / 7,
        $1 = document.querySelector.bind(document),
        $2 = document.querySelectorAll.bind(document);

    _$inner = $1('.dlbi-sparkle-banner-inner');
    _$textWrapper = $1('.dlbi-sparkle-banner-inner .text-wrapper');
    _$labelBtn = $1('.the-sparkle-control-wrapper .labels');
    _$lessLabelBtn = $1('.the-sparkle-control-wrapper .labels .lessBtn');
    _$mediumLabelBtn = $1('.the-sparkle-control-wrapper .labels .mediumBtn');
    _$waaayLabelBtn = $1('.the-sparkle-control-wrapper .labels .waaayBtn');
    _$customLabelBtn = $1('.the-sparkle-control-wrapper .labels .customBtn');

    function _setLessMode() {
        _animSlider(0.107, function() {
            _animInner(1);
            _animTextWrap(0, function() {
                _$labelBtn.className = 'labels less';
            });
        });
    }

    function _setMediumMode() {
        _animSlider(0.373, function() {
            _animInner(1);
            _animTextWrap(1, function() {
                tw.opacity(_$labelBtn, {
                    to: 0,
                    dur: 0.2,
                    onComplete: function() {
                        _$labelBtn.className = 'labels medium';
                        tw.opacity(_$labelBtn, {
                            to: 1,
                            dur: 0.4
                        });
                    }
                });
            });
        });
    }

    function _setWaaayMode() {
        _animSlider(0.625, function() {
            _animInner(1);
            _waayLabelAnim(function() {
                _$labelBtn.className = 'labels waaay';
            });
        });
    }

    function _waayLabelAnim(onComplete) {
        var dur1 = 0.3,
            offset = 20;


            var curr;
            var j = 0;
            for (var letter in _tm1.letter) {
                if (_tm1.letter.hasOwnProperty(letter)) {

                    var dur22 = 1.4;

                    tw.rotate(_tm1.letter[letter], {
                        to: _rand(-15, 15),
                        dur: dur22,
                        delay: 0.05 * j
                    });

                    tw.y(_tm1.letter[letter], {
                        to: _rand(-15, 15),
                        dur: dur22,
                        delay: 0.05 * j
                    });

                    j++;

                }
            }

        _animTextWrap(2, function() {

            tw.x(_$lessLabelBtn, {
                from: 0,
                to: offset,
                dur: dur1 * 0.8
            });
            tw.x(_$mediumLabelBtn, {
                from: 0,
                to: offset,
                dur: dur1 * 0.8
            });
            tw.x(_$waaayLabelBtn, {
                from: 0,
                to: offset,
                dur: dur1 * 0.8
            });
            tw.x(_$customLabelBtn, {
                from: 0,
                to: offset,
                dur: dur1 * 0.8
            });

            tw.opacity(_$labelBtn, {
                to: 0,
                dur: 0.3,
                onComplete: function() {
                    onComplete();

                    tw.x(_$lessLabelBtn, {
                        from: offset * -1,
                        to: 0,
                        dur: dur1 * 0.8
                    });
                    tw.x(_$mediumLabelBtn, {
                        from: offset * -1,
                        to: 0,
                        dur: dur1 * 0.8
                    });
                    tw.x(_$waaayLabelBtn, {
                        from: offset * -1,
                        to: 0,
                        dur: dur1 * 0.8
                    });
                    tw.x(_$customLabelBtn, {
                        from: offset * -1,
                        to: 0,
                        dur: dur1 * 0.8
                    });

                    tw.opacity(_$labelBtn, {
                        to: 1,
                        dur: dur1
                    });

                }
            });
        });
    }

    function _rand(from, to) {
    	return Math.floor(Math.random() * (to - from + 1) + from);
    }

    function _setCustomMode() {

        _animSlider(0.887, function() {
            _animTextWrap(2);
            _animInner(0.7, function() {

            });
            _waayLabelAnim(function() {
                _$labelBtn.className = 'labels waaay';
            });
        });
    }

    function _animTextWrap(to, callback) {

        callback = callback || function() {};
        var from = _textWrapperX;

        tw.tween(from, to, _dur * 1.3, function(data) {
            _$textWrapper.style.left = (data.val * -100) + '%';
            _textWrapperX = data.val;
        }, callback);

    }

    function _animInner(to, callback) {

        callback = callback || function() {};
        var from = parseInt(_$inner.style.width) / 100;
        tw.tween(from, to, _dur, function(data) {
            _$inner.style.width = (data.val * 100) + '%';
            _sparkleControl.resize();
        }, callback);

    }

    function _animSlider(to, callback) {

        callback = callback || function() {};
        var from = _sparkleControl.getValue();

        tw.tween(from, to, _dur, function(data) {
            _sparkleControl.setValue(data.val);
        }, callback);

    }

    function _setupEvents() {

        $1('.the-sparkle-control-wrapper .lessBtn').addEventListener('click', function(e) {
            e.stopPropagation();
            _setLessMode();
        });
        $1('.the-sparkle-control-wrapper .mediumBtn').addEventListener('click', function(e) {
            e.stopPropagation();
            _setMediumMode();
        });
        $1('.the-sparkle-control-wrapper .waaayBtn').addEventListener('click', function(e) {
            e.stopPropagation();
            _setWaaayMode();
        });
        $1('.the-sparkle-control-wrapper .customBtn').addEventListener('click', function(e) {
            e.stopPropagation();
            _setCustomMode();
        });

    }

    function _doSnap() {

        var limLess = 1.75,
            limMedium = limLess * 2,
            limwaaay = limLess * 3;

        if (_sparkleControl.value <= _sliderK * limLess) {
            _setLessMode();
        } else if (_sparkleControl.value > _sliderK * limLess && _sparkleControl.value <= _sliderK * limMedium) {
            _setMediumMode();
        } else if (_sparkleControl.value > _sliderK * limMedium && _sparkleControl.value <= _sliderK * limwaaay) {
            _setWaaayMode();
        } else {
            _setCustomMode();
        }

    }

    function _run() {

        var $data = $1('.dlbi-sparkle-banner .data'),
            code = '',
            data;

        if ($data) {
            data = $data.innerText.split('|');

            for (var i = 0; i < data.length; i++) {
                code += '<div class="fancy_text msg' + i + '">' + data[i] + '</div>';
            }

            $1('.less-container').innerHTML = code;
            $1('.medium-container').innerHTML = code;
            $1('.waaay-container').innerHTML = code;
        }

        _tm1 = new MOS.Textmate({
            selector: '.waaay-container .fancy_text.msg0',
            updateOnResize: false
        });

        _tm1.draw('.newText', 1);

        _sparkleControl = new MOS.Slider({
            selector: '.the-sparkle-control',
            direction: 'h',
            bg: 'transparent',
            onChange: function(n) {
                //console.log(n);
            },
            onStop: function(n) {
                _doSnap();
            }
        });

        //NIBS.logMsg.add();

        //_setLessMode();
        _setWaaayMode();

        _setupEvents();

    }

    // Public methods & properties ***
    return {
        run: _run
    };
}());
