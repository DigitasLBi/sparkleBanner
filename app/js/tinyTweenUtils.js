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

        var that = this,
            onStep = tw.setDefFn(opt.onStep),
            onComplete = tw.setDefFn(opt.onComplete);

        opt.$target = tw.getTarget(target);
        opt.dur = (typeof(opt.dur) !== 'undefined') ? opt.dur : 1;
        opt.delay = opt.delay || 0;
        opt.from = opt.from || tw.getFromValue(opt);

        var t = tw.tween(opt.from, opt.to, opt.dur, function(data) {
                opt.data = data;
                opt.onTick(opt);
                onStep(data);
            }, function() {
                onComplete();
            },
            opt.delay);

        t.tm = setTimeout(function() {
            t.tm = null;
            if (t) t.paused = false;
        }, opt.delay * 1000);

        return t;

    };

    tw.getCssProperty = function(elem, property) {
        return window.getComputedStyle(elem, null).getPropertyValue(property);
    };
    tw.getFromValue = function(opt) {

        var rv;

        if (opt.toTween === 'x') {
            if (tw.supportsCssTransitions) {
                rv = tw.getVal(opt.$target, 'translateX') || 0;
            } else {
                rv = tw.getCssProperty(opt.$target, 'left') || 0;
            }
        } else if (opt.toTween === 'y') {
            if (tw.supportsCssTransitions) {
                rv = tw.getVal(opt.$target, 'translateY') || 0;
            } else {
                rv = tw.getCssProperty(opt.$target, 'top') || 0;
            }
        } else if (opt.toTween === 'rotate' || opt.toTween === 'scaleX') {
            rv = tw.getVal(opt.$target, opt.toTween) || 0;
        } else if (opt.toTween === 'scale' || opt.toTween === 'scaleX') {
            rv = tw.getVal(opt.$target, 'scaleX') || 1;

        } else {

            var defVal = 1;
            if (opt.toTween === 'opacity') {
                defVal = 0;
            }
            rv = tw.getCssProperty(opt.$target, opt.toTween) || defVal;
        }

        return parseFloat(rv);

    };
    tw.getTarget = function(t) {

        var $target;
        if (typeof(t) === 'string') {
            $target = tw.$1(t);
        } else {
            $target = t;
        }
        return $target;

    };
    tw.setDefFn = function(fn) {
        return fn || function() {};
    };
    tw.getVal = function($target, find) {

        var currTransStr = $target.style.transform || $target.style.webkitTransform,
            start = currTransStr.indexOf(find);

        if (start > -1) {
            var b = currTransStr.substr(start + find.length + 1);
            return b.substr(0, b.indexOf(')'));
        } else {
            return null;
        }
    };
    tw.transform = function($target, transformName, val) {

        var currTransStr = $target.style.transform || $target.style.webkitTransform,
            currVal = tw.getVal($target, transformName),
            transformString;

        if (!currVal) {
            transformString = currTransStr + ' ' + transformName + '(' + val + ')';
        } else {
            transformString = currTransStr.split(transformName + '(' + currVal + ')').join(transformName + '(' + val + ')');
        }

        if ($target instanceof Array) {
            for (var i = 0; i < $target.length; i++) {
                $target[i].style[style] = val;
                $target[i].style.webkitTransform = transformString;
                $target[i].style.transform = transformString;
            }
        } else {
            $target.style.webkitTransform = transformString;
            $target.style.transform = transformString;
        }

    };

    tw.setStyle = function ($target, style, val) {

        if ($target instanceof Array) {
            for (var i = 0; i < $target.length; i++) {
                $target[i].style[style] = val;
            }
        } else {
            $target.style[style] = val;
        }
    };

    tw.x = function(target, opt) {

        opt.toTween = 'x';
        opt.onTick = function(opt) {
            if (tw.supportsCssTransitions) {
                tw.transform(opt.$target, 'translateX', opt.data.val + 'px');
            } else {
                opt.$target.style.left = opt.data.val + 'px';
            }
        };
        return tw.run(target, opt);
    };
    tw.y = function(target, opt) {
        opt.toTween = 'y';
        opt.onTick = function(opt) {
            if (tw.supportsCssTransitions) {
                tw.transform(opt.$target, 'translateY', opt.data.val + 'px');
            } else {
                //opt.$target.style.top = opt.data.val + 'px';
                tw.setStyle(opt.$target, 'top', opt.data.val + 'px');
            }
        };
        return tw.run(target, opt);
    };
    tw.scale = function(target, opt) {
        opt.toTween = 'scale';
        opt.onTick = function(opt) {
            tw.transform(opt.$target, 'scaleX', opt.data.val);
            tw.transform(opt.$target, 'scaleY', opt.data.val);
        };
        return tw.run(target, opt);
    };
    tw.rotate = function(target, opt) {
        opt.toTween = 'rotate';
        opt.onTick = function(opt) {
            tw.transform(opt.$target, 'rotate', opt.data.val + 'deg');
        };
        return tw.run(target, opt);
    };
    tw.opacity = function(target, opt) {
        opt.toTween = 'opacity';
        opt.onTick = function(opt) {
            tw.setStyle(opt.$target, 'opacity', opt.data.val);
        };
        return tw.run(target, opt);
    };

    tw.m = function (arr, what, opt, onComplete) {

        for (var i = 0; i < arr.length; i++) {
            var optClone = JSON.parse(JSON.stringify(opt));
            if (i === arr.length - 1) {
                optClone.onComplete = onComplete;
            }
            tw[what](arr[i], optClone);
        }

    };

    tw.q = function (tws) {

        var QObj = function () {
            this.tws = null;
        };

        var q = new QObj();
        q.tws = tws;

        return q;

    };

} else {
    console.error('Load tinyTween first.');
}
