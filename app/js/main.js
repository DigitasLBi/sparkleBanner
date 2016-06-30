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
        _$inner,
        _sliderK = 1 / 7,
        _get;

    _get = {
        $1: document.querySelector.bind(document), //Node array, usage: var el = $1('.one-time-class');
        $2: document.querySelectorAll.bind(document) // Direct reference, usage: var alArr = $2('.my-class');
    };

    _$inner = _get.$1('.dlbi-sparkle-banner-inner');

    function _setLessMode() {
        _animSlider(0.107, function () {
            _animInner(1);
        });
    }

    function _setMediumMode() {
        _animSlider(0.373, function () {
            _animInner(1);
        });
    }

    function _setWaaayMode() {
        _animSlider(0.625, function () {
            _animInner(1);
        });
    }

    function _setCustomMode() {
        _animSlider(0.887, function () {
            _animInner(0.7, function () {


            });
        });
    }

    function _animInner(n, callback) {

        var from = parseInt(_$inner.style.width) / 100;

        callback = callback || function () {};
        tw.tween(from, n, _dur, function(data) {
            _$inner.style.width = (data.val * 100) + '%';
            _sparkleControl.resize();
        }, callback);


    }

    function _animSlider(n, callback) {

        callback = callback || function () {};
        var from = _sparkleControl.getValue(),
            to = n;

        tw.tween(from, to, _dur, function(data) {
            _sparkleControl.setValue(data.val);
        }, callback);

    }

    function _run() {

        _sparkleControl = new MOS.Slider({
            selector: '.the-sparkle-control',
            direction: 'h',
            bg: 'transparent',
            onChange: function (n) {
                //console.log(n);
            },
            onStop: function(n) {

                var limLess = 1.75,
                    limMedium = limLess * 2,
                    limwaaay = limLess * 3;

                if (this.value <= _sliderK * limLess) {
                    _setLessMode();
                } else if (this.value > _sliderK * limLess && this.value <= _sliderK * limMedium) {
                    _setMediumMode();
                } else  if (this.value > _sliderK * limMedium && this.value <= _sliderK * limwaaay) {
                    _setWaaayMode();
                } else {
                    _setCustomMode();
                }

            }
        });

        //NIBS.logMsg.add();

        _setLessMode();

    }

    // Public methods & properties ***
    return {
        run: _run
    };
}());
