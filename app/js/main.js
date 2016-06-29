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

                if (this.value < 0.125) {
                    console.log(0);
                } else if (this.value > 0.125 && this.value <= 0.25) {
                    console.log(0.33);
                } else if (this.value > 0.25 && this.value <= 0.375) {
                    console.log(0.33);
                } else if (this.value > 0.375 && this.value <= 0.50) {
                    console.log(0.66);
                } else if (this.value > 0.50 && this.value <= 0.625) {
                    console.log(0.66);
                } else if (this.value > 0.625 && this.value <= 0.75) {
                    console.log(0.66);
                } else {
                    console.log(1);
                }

            }
        });

        // tw.x('#d1', {
        //     from: 10,
        //     to: 300,
        //     dur: 0.7
        // });

        //NIBS.logMsg.add();

    }

    // Public methods & properties ***
    return {
        run: _run
    };
}());
