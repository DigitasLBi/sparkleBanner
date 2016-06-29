/*
 * TinyTween 1.0
 */

tw = {
    c: 0,
    init: function() {
        tw.init = null;
        window.requestAnimFrame = (function() {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
        tw.loop();
    },
    loop: function() {

        requestAnimFrame(tw.loop);

        for (var t in tw.all) {
            if (tw.all.hasOwnProperty(t)) {
                tw.all[t].fn(tw.all[t]);
            }
        }

    },
    tween: function(from, to, dur, onStep, onComplete) {

        if (tw.init) tw.init();
        var id = 'tw' + (tw.c++);
        tw.all[id] = {
            from: from,
            id: id,
            val: from,
            to: to,
            prog: 0,
            time: 0,
            inc: dur / (60 * dur),
            dur: dur,
            onStep: onStep,
            onComplete: onComplete,
            fn: function(that) {

                that.prog = that.time / that.dur;
                that.val = tw.ease.easeInOut(that.prog * that.dur, that.from, that.prog * (that.to - that.from), that.dur);

                if (that.time >= that.dur) {
                    that.prog = 1;
                    that.val = that.to;
                    that.onComplete();
                    delete tw.all[that.id];
                }

                that.onStep({
                    prog: that.prog,
                    val: that.val
                });
                that.time += that.inc;

            }
        };

    },
    all: {},
    ease: {}
};

// To keep things small, only uncomment the ease you use

// tw.ease.linearTween = function(t, b, c, d) {
//     return c * t / d + b;
// };

tw.ease.easeInOut = function(t, b, c, d) {
    t /= d / 3;
    if (t < 1.5) return c / 3 * t * t + b;
    t--;
    return -c / 3 * (t * (t - 3) - 1) + b;
};

// tw.ease.easeInQuad = function(t, b, c, d) {
//     t /= d;
//     return c * t * t + b;
// };
// tw.ease.easeOutQuad = function(t, b, c, d) {
//     t /= d;
//     return -c * t * (t - 2) + b;
// };
// tw.ease.easeInOutQuad = function(t, b, c, d) {
//     t /= d / 2;
//     if (t < 1) return c / 2 * t * t + b;
//     t--;
//     return -c / 2 * (t * (t - 2) - 1) + b;
// };
// tw.ease.easeInCubic = function(t, b, c, d) {
//     t /= d;
//     return c * t * t * t + b;
// };
// tw.ease.easeOutCubic = function(t, b, c, d) {
//     t /= d;
//     t--;
//     return c * (t * t * t + 1) + b;
// };
// tw.ease.easeInOutCubic = function(t, b, c, d) {
//     t /= d / 2;
//     if (t < 1) return c / 2 * t * t * t + b;
//     t -= 2;
//     return c / 2 * (t * t * t + 2) + b;
// };
// tw.ease.easeInQuart = function(t, b, c, d) {
//     t /= d;
//     return c * t * t * t * t + b;
// };
// tw.ease.easeOutQuart = function(t, b, c, d) {
//     t /= d;
//     t--;
//     return -c * (t * t * t * t - 1) + b;
// };
// tw.ease.easeInOutQuart = function(t, b, c, d) {
//     t /= d / 2;
//     if (t < 1) return c / 2 * t * t * t * t + b;
//     t -= 2;
//     return -c / 2 * (t * t * t * t - 2) + b;
// };
// tw.ease.easeInQuint = function(t, b, c, d) {
//     t /= d;
//     return c * t * t * t * t * t + b;
// };
// tw.ease.easeOutQuint = function(t, b, c, d) {
//     t /= d;
//     t--;
//     return c * (t * t * t * t * t + 1) + b;
// };
// tw.ease.easeInOutQuint = function(t, b, c, d) {
//     t /= d / 2;
//     if (t < 1) return c / 2 * t * t * t * t * t + b;
//     t -= 2;
//     return c / 2 * (t * t * t * t * t + 2) + b;
// };
// tw.ease.easeInSine = function(t, b, c, d) {
//     return -c * cos(t / d * (PI / 2)) + c + b;
// };
// tw.ease.easeOutSine = function(t, b, c, d) {
//     return c * sin(t / d * (PI / 2)) + b;
// };
// tw.ease.easeInOutSine = function(t, b, c, d) {
//     return -c / 2 * (cos(PI * t / d) - 1) + b;
// };
// tw.ease.easeInExpo = function(t, b, c, d) {
//     return c * pow(2, 10 * (t / d - 1)) + b;
// };
// tw.ease.easeOutExpo = function(t, b, c, d) {
//     return c * (-pow(2, -10 * t / d) + 1) + b;
// };
// tw.ease.easeInOutExpo = function(t, b, c, d) {
//     t /= d / 2;
//     if (t < 1) return c / 2 * pow(2, 10 * (t - 1)) + b;
//     t--;
//     return c / 2 * (-pow(2, -10 * t) + 2) + b;
// };
// tw.ease.easeInCirc = function(t, b, c, d) {
//     t /= d;
//     return -c * (Math.sqrt(1 - t * t) - 1) + b;
// };
// tw.ease.easeOutCirc = function(t, b, c, d) {
//     t /= d;
//     t--;
//     return c * Math.sqrt(1 - t * t) + b;
// };
// tw.ease.easeInOutCirc = function(t, b, c, d) {
//     t /= d / 2;
//     if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
//     t -= 2;
//     return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
// };
