/*
 * Slider 1.0
 *
 * Mattias Johansson
 * Copyright 2016, Licensed GPL & MIT
 */

//Update to this http://stackoverflow.com/questions/2107556/how-to-inherit-from-a-class-in-javascript

var MOS = MOS || {};
MOS.Slider = function(data) {

    var that = this;
    that.data = data;
    that.direction = that.data.direction || 'h';
    that.onChange = that.data.onChange || function() {};
    that.width = that.data.width || 'h';
    that.id = 'slider' + MOS.Slider.getId();
    that.touch = MOS.Slider.isTouchDevice();
    that.$target = MOS.Slider.get.$1(that.data.selector);
    that.$body = MOS.Slider.get.$1('body');
    that.$target.id = that.id;
    that.$handle = null;
    that.size = null;
    that.value = 0;
    that.pointerStartPos = {
        x: 0,
        y: 0
    };
    that.handleSize = null;
    that.mousePressed = false;

    if (that.touch) {
        that.pointer = {
            down: 'touchstart',
            move: 'touchmove',
            up: 'touchend'
        };
    } else {
        that.pointer = {
            down: 'mousedown',
            move: 'mousemove',
            up: 'mouseup'
        };
    }
    that.pointer.x = null;
    that.pointer.y = null;

    that.setup(that.data);

};

MOS.Slider.prototype = {};

MOS.Slider.prototype.setup = function() {

    var that = this,
        cssH,
        cssV,
        style;

    that.$target.innerHTML = '<div class="slider-handle"></div>';
    that.$target.classList.add('slider-wrapper');
    that.$handle = MOS.Slider.get.$1(that.data.selector + ' .slider-handle');

    if (that.direction === 'h') {
        that.size = that.$target.offsetWidth;
        that.handleSize = that.$handle.offsetWidth;
    } else {
        that.size = that.$target.offsetHeight;
        that.handleSize = that.$handle.offsetHeight;
    }

    MOS.Slider.prototype.updatePointerPosition = function(e) {

        var that = this;
        if (e.touches) {
            that.pointer.x = e.touches[0].pageX;
            that.pointer.y = e.touches[0].pageY;
        } else {
            that.pointer.x = e.clientX;
            that.pointer.y = e.clientY;
        }

    };

    MOS.Slider.prototype.getValue = function() {

        var that = this;
        return that.value;

    };

    MOS.Slider.prototype.onMouseMove = function(e) {

        var newPos,
            onThis;

        that.updatePointerPosition(e);

        if (that.mousePressed) {

            if (that.direction === 'h') {
                newPos = that.$handle.startX + (that.pointerStartPos.x - that.pointer.x) * -1;
                onThis = 'left';
            } else {
                newPos = that.$handle.startY + that.pointerStartPos.y - that.pointer.y;
                onThis = 'bottom';
            }

            if (newPos < 0) {
                that.$handle.style[onThis] = 0 + 'px';
            } else if (newPos > that.size - that.handleSize) {
                that.$handle.style[onThis] = that.size - that.handleSize + 'px';
            } else {
                that.$handle.style[onThis] = newPos + 'px';
            }

            that.value = parseInt(that.$handle.style[onThis]) / (that.size - that.handleSize);
            that.onChange(that.value);
        }

    };

    MOS.Slider.prototype.setValue = function(n) {

        var that = this,
            b;

        b = n * (that.size - that.handleSize);
        that.$handle.style.bottom = b + 'px';

    };

    that.$handle.addEventListener(that.pointer.down, function(e) {

        that.updatePointerPosition(e);
        that.$handle.startY = parseInt(that.$handle.style.bottom || 0);
        that.$handle.startX = parseInt(that.$handle.style.left || 0);
        that.pointerStartPos.x = parseInt(that.pointer.x);
        that.pointerStartPos.y = parseInt(that.pointer.y);

        that.mousePressed = true;
        that.$body.addEventListener(that.pointer.move, that.onMouseMove);

    });

    that.$body.addEventListener(that.pointer.up, that.dragEnded);
    window.addEventListener('mouseup', that.dragEnded);

    MOS.Slider.all[that.id] = that;

};

MOS.Slider.prototype.dragEnded = function(e) {

    var that,
        id;

    for (id in MOS.Slider.all) {
        if (MOS.Slider.all.hasOwnProperty(id)) {
            that = MOS.Slider.all[id];
            that.mousePressed = false;
            that.$body.removeEventListener(that.pointer.move, that.onMouseMove);
        }
    }

};

MOS.Slider.prototype.destroy = function() {

    var that = this;
    delete MOS.Slider.all[that.id];

};

MOS.Slider.prototype.getOffset = function(el) {

    var that = this,
        rect = el.getBoundingClientRect();

    return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
    };

};


MOS.Slider.all = {};

MOS.Slider.getId = function() {
    return (new Date().getTime()) + (parseInt(Math.random() * 100)).toString();
};

MOS.Slider.isTouchDevice = function() {

    return 'ontouchstart' in window     // works on most browsers
        || navigator.maxTouchPoints;    // works on IE10/11 and Surface

};

MOS.Slider.get = {
    $1: document.querySelector.bind(document), //Node array, usage: var el = $1('.one-time-class');
    $2: document.querySelectorAll.bind(document) // Direct reference, usage: var alArr = $2('.my-class');
};
