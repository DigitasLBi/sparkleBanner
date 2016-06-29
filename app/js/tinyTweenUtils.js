/*
 * TinyTween utils 1.0
 */

if (tw) {
    tw.$1 = document.querySelector.bind(document); //Node array, usage: var el = $1('.one-time-class');
    tw.isDOM = function(obj) {
        // DOM, Level2
        if ("HTMLElement" in window) {
            return (obj && obj instanceof HTMLElement);
        }
        // Older browsers
        return !!(obj && typeof obj === "object" && obj.nodeType === 1 && obj.nodeName);
    };
    tw.supportsCssTransitions = (function(style) {
        var prefixes = ['', 'webkit', 'moz', 'ms', 'o'],
            prop;
        for (var i = 0, l = prefixes.length; i < l; i++) {
            prop = (i === 0) ? 'transition' : 'Transition';
            if (typeof style[prefixes[i] + prop] !== 'undefined') {
                return true;
            }
        }
        return false;
    })(document.createElement('div').style);
    tw.run = function(target, opt) {
        var $target;
        var that = this;
        if (typeof(target) === 'string') {
            $target = tw.$1(target);
        } else {
            $target = target;
        }

        opt.$target = $target;

        var onStep = opt.onStep || function() {},
            onComplete = opt.onComplete || function() {};

        if (tw.isDOM($target)) {
            tw.tween(opt.from, opt.to, opt.dur, function(data) {
                opt.data = data;
                opt.onTick(opt);
                onStep(data);
            }, function() {
                onComplete();
            });
        }
    };
    tw.x = function(target, opt) {
        opt.onTick = function(opt) {
            if (tw.supportsCssTransitions) {
                opt.$target.style.webkitTransform = 'translateX(' + opt.data.val + 'px)';
                opt.$target.style.transform = 'translateX(' + opt.data.val + 'px)';
            } else {
                opt.$target.style.left = opt.data.val + 'px';
            }
        };
        tw.run(target, opt);
    };
    tw.y = function(target, opt) {
        opt.onTick = function(opt) {
            if (tw.supportsCssTransitions) {
                opt.$target.style.webkitTransform = 'translateY(' + opt.data.val + 'px)';
                opt.$target.style.transform = 'translateY(' + opt.data.val + 'px)';
            } else {
                opt.$target.style.top = opt.data.val + 'px';
            }
        };
        tw.run(target, opt);
    };
} else {
    console.error('Load tinyTween first.');
}
