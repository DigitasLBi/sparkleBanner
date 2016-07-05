var NIBS = window.NIBS || {};
NIBS.background = (function() {

    // Initialise an empty canvas and place it on the page
    var canvas = document.getElementById('sparkleCanvas');
    var context = canvas.getContext("2d");
    var colors = ['#EC2327', '#F79920', '#F0E91B', '#329B48', '#3A54A4', '#C5238F'];

    var _bgSpin,
        _alpha = 0,
        _TO_RADIANS = Math.PI / 180,
        _currAngle = 0;

    function _rand(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    function _loadImage() {

        _bgSpin = new Image();
        _bgSpin.isLoaded = false;
        _bgSpin.src = 'images/bg-spin.png';
        _bgSpin.onload = function() {
            _bgSpin.isLoaded = true;
            //context.drawImage(_bgSpin, 100, 100);
        };
    }

    function _drawBgSpin() {

        function drawRotatedImage(image, x, y, angle) {
            context.save();
            context.translate(x, y);
            context.rotate(angle * _TO_RADIANS);
            context.globalAlpha = _alpha;
            context.drawImage(image, -(image.width / 2), -(image.height / 2));
            context.restore();
        }

        if (_bgSpin.isLoaded) {
            drawRotatedImage(_bgSpin, 550, 200, _currAngle);
            _currAngle += 1;
        }

    }

    function _draw() {
        if (NIBS.main.mode === 'waaay') {
            if (_alpha >= 1) {
                _alpha = 1;
            } else {
                _alpha += 0.05;
            }
            _drawBgSpin();
        } else {
            if (_alpha <= 0) {
                _alpha = 0;
            } else {
                _drawBgSpin();
                _alpha -= 0.05;
            }
        }
    }

    function _run() {
        _loadImage();
    }

    return {
        run: _run,
        draw: _draw,
        mode: 'less'
    };
}());
