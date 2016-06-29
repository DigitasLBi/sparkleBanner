/**
 * DigitasLBI
 * @version 0.1
 * @author www.digitaslbi.com/se
 * @copyright DigitasLBI 2016
 */

var NIBS = window.NIBS || {};
NIBS.main = (function() {

    // Private methods & properties ***

    function _run() {

        var mySlider = new MOS.Slider({
            selector: '.the-sparkle-controls',
            direction: 'h',
            onChange: function (n) {
                //console.log(n);
            },
            onStop: function(n) {
                //console.log(this.value);
            }
        });

        // var $el = document.getElementById('d1');
        // tw.tween(10, 600, 0.8, function(data) {
        //     $el.style.left = data.val + 'px';
        // }, function() {
        //     console.log('Complete!!');
        // });
        NIBS.logMsg.add();

    }

    // Public methods & properties ***
    return {
        run: _run
    };
}());
