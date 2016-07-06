var NIBS = window.NIBS || {};
NIBS.logMsg = (function() {
    function _add() {

        var theColor = 255,
            theOtherColor = 100,
            styles = [
                'background: -moz-linear-gradient( top , rgba(' + theColor + ', ' + theOtherColor + ', ' + theOtherColor + ', 1) 0%, rgba(' + theColor + ', ' + theColor + ', ' + theOtherColor + ', 1) 15%, rgba(' + theOtherColor + ', ' + theColor + ', ' + theOtherColor + ', 1) 30%, rgba(' + theOtherColor + ', ' + theColor + ', ' + theColor + ', 1) 50%, rgba(' + theOtherColor + ', ' + theOtherColor + ', ' + theColor + ', 1) 65%, rgba(' + theColor + ', ' + theOtherColor + ', ' + theColor + ', 1) 80%, rgba(' + theColor + ', ' + theOtherColor + ', ' + theOtherColor + ', 1) 100%);',
                'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(' + theColor + ', ' + theOtherColor + ', ' + theOtherColor + ', 1)), color-stop(15%, rgba(' + theColor + ', ' + theColor + ', ' + theOtherColor + ', 1)), color-stop(30%, rgba(' + theOtherColor + ', ' + theColor + ', ' + theOtherColor + ', 1)), color-stop(50%, rgba(' + theOtherColor + ', ' + theColor + ', ' + theColor + ', 1)), color-stop(65%, rgba(' + theOtherColor + ', ' + theOtherColor + ', ' + theColor + ', 1)), color-stop(80%, rgba(' + theColor + ', ' + theOtherColor + ', ' + theColor + ', 1)), color-stop(100%, rgba(' + theColor + ', ' + theOtherColor + ', ' + theOtherColor + ', 1)));',
                'background: gradient(linear, left top, left bottom, color-stop(0%, rgba(' + theColor + ', ' + theOtherColor + ', ' + theOtherColor + ', 1)), color-stop(15%, rgba(' + theColor + ', ' + theColor + ', ' + theOtherColor + ', 1)), color-stop(30%, rgba(' + theOtherColor + ', ' + theColor + ', ' + theOtherColor + ', 1)), color-stop(50%, rgba(' + theOtherColor + ', ' + theColor + ', ' + theColor + ', 1)), color-stop(65%, rgba(' + theOtherColor + ', ' + theOtherColor + ', ' + theColor + ', 1)), color-stop(80%, rgba(' + theColor + ', ' + theOtherColor + ', ' + theColor + ', 1)), color-stop(100%, rgba(' + theColor + ', ' + theOtherColor + ', ' + theOtherColor + ', 1)));',
                'border: 0px solid #000000',
                'color: #000',
                'padding: 20px',
                'display: block',
                'line-height: 60px',
                'font-weight: bold',
                'font-size: 20px'
            ].join(';'),
            msg = ['Hi geek!',
                'You’re obviously the kind of curious super-duper-magical-rainbow-developer with lots of sparkle we’re looking for.',
                'Or you’re just bored with whatever it is you’re supposed to be doing.',
                'Either way, it’s best that you become a unicorn. –:)',
                'https://careers-digitaslbi.icims.com/jobs',                
                '//See you!'
            ];

        if (console.clear) {
            console.clear();
        }

        for (var i = 0; i < msg.length; i++) {
            console.log('%c' + msg[i], styles);
        }


    }

    return {
        add: _add
    };
}());
