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
        _$textWrapper,
        _textWrapperX = 0,
        _sliderK = 1 / 7,
        $1 = document.querySelector.bind(document),
        $2 = document.querySelectorAll.bind(document);

    _$inner = $1('.dlbi-sparkle-banner-inner');
    _$textWrapper = $1('.dlbi-sparkle-banner-inner .text-wrapper');

    function _setLessMode() {
        _animSlider(0.107, function () {
            _animInner(1);
            _animTextWrap(0, function () {
                $1('.the-sparkle-control-wrapper .labels').className = 'labels less';
            });
        });
    }

    function _setMediumMode() {
        _animSlider(0.373, function () {
            _animInner(1);
            _animTextWrap(1, function () {
                $1('.the-sparkle-control-wrapper .labels').className = 'labels medium';
            });
        });
    }

    function _setWaaayMode() {
        _animSlider(0.625, function () {
            _animInner(1);
            _animTextWrap(2);
            $1('.the-sparkle-control-wrapper .labels').className = 'labels waaay';
        });
    }

    function _setCustomMode() {
        _animSlider(0.887, function () {
            _animTextWrap(2);
            _animInner(0.7, function () {

            });
        });
    }

    function _animTextWrap(to, callback) {

        callback = callback || function () {};
        var from = _textWrapperX;

        tw.tween(from, to, _dur * 1.3, function(data) {
             _$textWrapper.style.left = (data.val * -100) + '%';
            _textWrapperX = data.val;
        }, callback);

    }

    function _animInner(to, callback) {

        callback = callback || function () {};
        var from = parseInt(_$inner.style.width) / 100;
        tw.tween(from, to, _dur, function(data) {
            _$inner.style.width = (data.val * 100) + '%';
            _sparkleControl.resize();
        }, callback);

    }

    function _animSlider(to, callback) {

        callback = callback || function () {};
        var from = _sparkleControl.getValue();

        tw.tween(from, to, _dur, function(data) {
            _sparkleControl.setValue(data.val);
        }, callback);

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
        //_setCustomMode();

    }

    // Public methods & properties ***
    return {
        run: _run
    };
}());
