var NIBS = window.NIBS || {};
NIBS.background = (function() {

    // Initialise an empty canvas and place it on the page
    var canvas = document.getElementById('sparkleCanvas');
    var context = canvas.getContext("2d");
    var colors = ['#EC2327', '#F79920', '#F0E91B', '#329B48', '#3A54A4', '#C5238F'];

    var _bgSpin,
        _alpha = 0,
        _sinVal = 0,
        _waaayNumbSparks = 20,
        _TO_RADIANS = Math.PI / 180,
        _currAngle = 0;

    function _rand(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    function _loadImage() {

        _bgSpin = new Image();
        _bgSpin.isLoaded = false;
        _bgSpin.src = 'images/bg-spin.svg';
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
            context.scale(canvas.width * 1.3 / image.width, canvas.width * 1.3 / image.width);
            context.drawImage(image, -(image.width / 2), -(image.height / 2));
            context.restore();

            context.beginPath();
            context.rect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "rgba(0, 0, 0, 0.4)";
            context.fillRect(0, 0, canvas.width, canvas.height);

        }

        if (_bgSpin.isLoaded) {
            drawRotatedImage(_bgSpin, 550, 300, _currAngle);
            _currAngle -= (2.2 + Math.sin(_sinVal));
            _sinVal  += 0.05;
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

            var numbSpark = 70;
            if (NIBS.main.idle) {
                numbSpark = 20;
            }

            if (_waaayNumbSparks < numbSpark) {
                _waaayNumbSparks += 0.1;
                NIBS.main.settings.numbOfSparks = Math.round(_waaayNumbSparks);
            }

        } else {
            _waaayNumbSparks = 20;
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
