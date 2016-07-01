/*
 * Textmate 1.0
 *
 * Mattias Johansson
 * Copyright 2016, Licensed GPL & MIT
 */

//Update to this http://stackoverflow.com/questions/2107556/how-to-inherit-from-a-class-in-javascript

var MOS = MOS || {};
MOS.Textmate = function (props) {

    var that = this;

    that.props = props;
    that.to = null;
    that.count = 0;
    that.scale = 1;
    that.letter = {};
    that.props.updateOnResize = that.props.updateOnResize || true;
    that.get = {
        $1: document.querySelector.bind(document), // Direct reference, usage: var alArr = $2('.my-class');
        $2: document.querySelectorAll.bind(document) //Node array, usage: var el = $1('.one-time-class');
    };
    that.target = that.get.$1(that.props.selector);

    that.target.prerunned = false;
    that.timelock = null;
    that.getOffset = function (el) {
        el = el.getBoundingClientRect();
        return {
            left: el.left + window.scrollX,
            top: el.top + window.scrollY
        };
    };

    that.onResize = function (delay) {

        if (that.timelock) window.clearTimeout(that.timelock);

        that.timelock = window.setTimeout(function() {
            that.data = that.refres();
            that.draw();
        }, delay);


    };

    that.onResize(0);
    if (that.props.updateOnResize) {
        window.addEventListener("resize", function () {
            that.onResize(200);
        });
    }

};

MOS.Textmate.prototype = {};

MOS.Textmate.prototype.draw = function (selector, scale) {

	var that = this,
        toOffset,
        parentOffset,
        html = '';

    if (selector) that.to = that.get.$1(selector);
    if (!that.to) return;

    that.scale = scale || that.scale;
    toOffset = that.getOffset(that.to);
    parentOffset = that.getOffset(that.target);

    if (!that.data) return;

    for (var i = 0; i < that.data.length; i++) {
        html += '<div id="tmLetter' + that.count + '_' + i + '" style="position: absolute; left: ' + (that.data[i].pos.left * that.scale - parentOffset.left) + 'px; top: ' + (that.data[i].pos.top * that.scale - parentOffset.top) + 'px;">' + that.data[i].letter + '</div>';
    }

    that.to.innerHTML = html;
    that.letter = {};

    var id;
    for (i = 0; i < that.data.length; i++) {
        id = 'tmLetter' + that.count + '_' + i;
        that.letter[id] = that.get.$1('#' + id);
    }

    that.count++;


};


MOS.Textmate.prototype.prerun = function () {

	var that = this,
        txt = that.target.innerHTML,
        html = '';

    for (var i = 0; i < txt.length; i++) {
        html += '<span class="__tm">' + txt.charAt(i) + '</span>';
    }

    that.target.innerHTML = html;
    that.target.prerunned = true;

};

MOS.Textmate.prototype.refres = function () {

	var that = this,
        letters,
        rv = [];

    if (!that.target.prerunned) {
        that.prerun();
    }

    letters = that.get.$2('.__tm');
    for (var i = 0; i < letters.length; i++) {
        rv.push({
            pos: that.getOffset(letters[i]),
            letter: letters[i].innerText
        });
    }
    return rv;

};
