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
        _autoPlaying = true,
        _autoPlayingTimeLock,
        _autoPlayingInterval,
        _dur = 0.2,
        _textTimeline,
        _$inner,
        _$textWrapper,
        _$labelBtn,
        _textWrapperX = 0,
        _sliderK = 1 / 7,
        _bursTimer,
        $1 = document.querySelector.bind(document),
        $2 = document.querySelectorAll.bind(document);

    function _burst(data) {

        NIBS.main.settings.posx = $('.dlbi-sparkle-banner').width() * _sparkleControl.getValue();
        NIBS.main.settings.numbOfSparks = data.numbOfSparks;
        NIBS.main.settings.xOffset = data.xOffset;
        NIBS.main.settings.yOffset = data.yOffset;
        NIBS.main.settings.particleSize = data.particleSize;
        NIBS.main.settings.lifeTime = data.lifeTime;
        if (_bursTimer) clearTimeout(_bursTimer);
        _bursTimer = setTimeout(function() {
            NIBS.main.settings.numbOfSparks = 0;
            NIBS.main.settings.xOffset = 0;
            NIBS.main.settings.gravity = 0.6;
            NIBS.main.settings.particleSize = 1;
            NIBS.main.settings.lifeTime = 40;
        }, data.dur * 1000);
    }

    function _setLessMode() {

        NIBS.main.mode = 'less';

        if (!_autoPlaying) {
            if (_textTimeline) _textTimeline.stop();
            _textTimeline = _makeTL('less', 0.1);
        }

        _textReset('less');
        _animSlider(0.15, function() {
            $1('.the-sparkle-control .slider-handle').className = 'slider-handle less';
            _animInner(1);
            _animTextWrap(0, function() {
                _$labelBtn.className = 'labels less';
                _burst({
                    numbOfSparks: 25,
                    xOffset: 10,
                    yOffset: -5,
                    dur: 1,
                    particleSize: 0.6,
                    lifeTime: 40
                });
            });

        });
    }

    function _makeTL(what, dur) {

        if (_textTimeline) {
            _textTimeline.kill();
        }

        var
            wait = 1.2,
            gap = 0.1,
            tl = new tw.Q({
            onComplete: function() {
                this.restart();
            }
        });

        tl.add({
            t: '.' + what + '-container .fancy_text.msg0',
            what: 'opacity',
            to: 1,
            dur: dur
        });

        tl.add({
            t: '.' + what + '-container .fancy_text.msg0',
            what: 'opacity',
            to: 0,
            dur: dur,
            delay: wait
        });

        tl.add({
            t: '.' + what + '-container .fancy_text.msg1',
            what: 'opacity',
            to: 1,
            dur: dur,
            delay: gap
        });

        tl.add({
            t: '.' + what + '-container .fancy_text.msg1',
            what: 'opacity',
            to: 0,
            dur: dur,
            delay: wait
        });

        tl.add({
            t: '.' + what + '-container .fancy_text.msg2',
            what: 'opacity',
            to: 1,
            dur: dur,
            delay: gap
        });

        tl.add({
            t: '.' + what + '-container .fancy_text.msg2',
            what: 'opacity',
            to: 0,
            dur: dur,
            delay: wait
        });

        tl.add({
            t: '.' + what + '-container .fancy_text.msg3',
            what: 'opacity',
            to: 1,
            dur: dur,
            delay: gap
        });

        tl.add({
            t: '.' + what + '-container .fancy_text.msg3',
            what: 'opacity',
            to: 0,
            dur: dur,
            delay: wait
        });

        tl.add({
            t: '.' + what + '-container .fancy_text.msg4',
            what: 'opacity',
            to: 1,
            dur: dur,
            delay: gap
        });

        tl.add({
            t: '.' + what + '-container .fancy_text.msg4',
            what: 'opacity',
            to: 0,
            dur: dur,
            delay: wait * 5
        });

        tl.play();

        return tl;

    }

    function _textReset(selector) {

        $('.text-wrapper').show();
        var $t = $('.' + selector + '-container .fancy_text ');
        $t.css('opacity', 0);
        $t.eq(0).css('opacity', 1);

    }

    function _setMediumMode() {

        NIBS.main.mode = 'medium';

        if (!_autoPlaying) {
            if (_textTimeline) _textTimeline.stop();
            _textTimeline = _makeTL('medium', 0.3);
        }

        _textReset('medium');
        _animSlider(0.49, function() {
            $1('.the-sparkle-control .slider-handle').className = 'slider-handle medium';
            _animInner(1);
            _animTextWrap(1, function() {
                tw.opacity(_$labelBtn, {
                    to: 0,
                    dur: 0.2,
                    onComplete: function() {
                        _$labelBtn.className = 'labels medium';
                        _burst({
                            numbOfSparks: 70,
                            xOffset: 4,
                            yOffset: -5,
                            dur: 5,
                            particleSize: 1.0,
                            lifeTime: 40
                        });
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

        _textReset('waaay');
        _animSlider(0.833, function() {
            $1('.the-sparkle-control .slider-handle').className = 'slider-handle waaay';
            _animInner(1);
            _waayLabelAnim(function() {
                _burst({
                    numbOfSparks: 150,
                    xOffset: -10,
                    yOffset: -5,
                    dur: 180,
                    ParticleDiff: 0.01,
                    particleSize: 2,
                    lifeTime: 50
                });
            });

        });
    }

    function _waayLabelAnim(onComplete) {

        NIBS.main.mode = 'waaay';

        var dur1 = 0.3,
            offset = 20;

        if (!_autoPlaying) {
            if (_textTimeline) _textTimeline.stop();
            _textTimeline = _makeTL('waaay', 0.3);
        }

        _animTextWrap(2, function() {
            var $label = $2('.the-sparkle-control-wrapper .labels a');
            tw.m($label, 'scale', {
                to: 0.5,
                dur: _dur * 0.8
            });
            tw.m($label, 'opacity', {
                to: 0,
                dur: _dur * 0.8
            }, function() {
                onComplete();
                tw.m($label, 'scale', {
                    from: 2.5,
                    to: 1,
                    dur: _dur * 0.8
                });
                tw.m($label, 'opacity', {
                    to: 1,
                    dur: _dur * 0.8
                }, function() {
                    _$labelBtn.className = 'labels waaay';
                });
            });
        });
    }

    function _rand(from, to) {
        return Math.random() * (to - from + 1) + from;
    }

    function _each(all, fn) {

        if (all instanceof Array) {
            var len = all.length,
                i, curr;
            for (i = 0; i < len; i += 1) {
                fn(all[i], i);
            }
        } else {
            var index = 0;
            for (var it in all) {
                fn(it, index);
                index++;
            }
        }

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
        tw.tween(_sparkleControl.getValue(), to, _dur, function(data) {
            _sparkleControl.setValue(data.val);
        }, callback);

    }

    function _autoPlayOn() {

        _autoPlaying = true;
        if (_autoPlayingInterval) {
            clearInterval(_autoPlayingInterval);
        }
        _autoPlayingInterval = setInterval(function() {

            if (NIBS.main.mode === 'less') {
                _setMediumMode();
            } else if (NIBS.main.mode === 'medium') {
                _setWaaayMode();
            } else if (NIBS.main.mode === 'waaay')  {
                _setLessMode();
            }

        }, 3000);
    }

    function _autoPlayOff() {

        _autoPlaying = false;
        clearInterval(_autoPlayingInterval);
        if (_autoPlayingTimeLock) clearTimeout(_autoPlayingTimeLock);
        _autoPlayingTimeLock = setTimeout(_autoPlayOn, 3 * 60000);

    }

    function _setupEvents() {

        $1('.dlbi-sparkle-banner .HA').addEventListener('click', function(e) {
            if (window.clickTag) {
                window.open(clickTag, "_blank");
            } else {
                console.log('Hit Area clicked');
            }
        });

        $1('.the-sparkle-control-wrapper .lessBtn').addEventListener('click', function(e) {
            e.stopPropagation();
            _autoPlayOff();
            _setLessMode();
        });
        $1('.the-sparkle-control-wrapper .mediumBtn').addEventListener('click', function(e) {
            e.stopPropagation();
            _autoPlayOff();
            _setMediumMode();
        });
        $1('.the-sparkle-control-wrapper .waaayBtn').addEventListener('click', function(e) {
            e.stopPropagation();
            _autoPlayOff();
            _setWaaayMode();
        });
    }

    function _doSnap() {

        var limLess = 2.3,
            limMedium = limLess * 2,
            limwaaay = limLess * 3;

        if (_sparkleControl.value <= _sliderK * limLess) {
            _setLessMode();
        } else if (_sparkleControl.value > _sliderK * limLess && _sparkleControl.value <= _sliderK * limMedium) {
            _setMediumMode();
        } else if (_sparkleControl.value > _sliderK * limMedium && _sparkleControl.value <= _sliderK * limwaaay) {
            _setWaaayMode();
        }
    }

    function _run() {

        window.requestAnimFrame = (function() {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        var $data = $1('.dlbi-sparkle-banner .data'),
            code = '',
            data;

        _$inner = $1('.dlbi-sparkle-banner-inner');
        _$textWrapper = $1('.dlbi-sparkle-banner-inner .text-wrapper');
        _$labelBtn = $1('.the-sparkle-control-wrapper .labels');
        _$lessLabelBtn = $1('.the-sparkle-control-wrapper .labels .lessBtn');
        _$mediumLabelBtn = $1('.the-sparkle-control-wrapper .labels .mediumBtn');
        _$waaayLabelBtn = $1('.the-sparkle-control-wrapper .labels .waaayBtn');

        if ($data) {
            $('.text-wrapper').hide();
            data = $data.innerHTML.split('|');
            for (var i = 0; i < data.length; i++) {
                code += '<div class="fancy_text msg' + i + '">' + data[i] + '</div>';
            }
            $1('.less-container').innerHTML = code;
            $1('.medium-container').innerHTML = code;
            $1('.waaay-container').innerHTML = code;
        }

        _sparkleControl = new MOS.Slider({
            selector: '.the-sparkle-control',
            direction: 'h',
            bg: 'transparent',
            onChange: function(n) {
                //console.log(n);
            },
            onStop: function(n) {
                _doSnap();
                _autoPlayOff();
            }
        });

        //NIBS.logMsg.add();

        _setLessMode();
        _autoPlayOn();
        //_setMediumMode();
        //_setWaaayMode();

        _setupEvents();
        requestAnimFrame(NIBS.sparkle.actions);

        NIBS.background.run();

    }

    // Public methods & properties ***
    return {
        run: _run,
        mode: 'less',
        settings: {
            posx: 400,
            posy: $('.dlbi-sparkle-banner').height() - 70,
            trailAlpha: 1,
            numbOfSparks: 0,
            gravity: 0.6,
            speed: 0.5,
            particleSize: 1,
            ParticleDiff: 0.8,
            spread: 20,
            xOffset: 0,
            yOffset: 5,
            lifeTime: 40
        }
    };
}());
