var NIBS = window.NIBS || {};
NIBS.sparkle = (function() {

    // Initialise an empty canvas and place it on the page
    var canvas = document.getElementById('sparkleCanvas');
    var context = canvas.getContext("2d");
    var colors = [ '#EC2327', '#F79920', '#F0E91B', '#329B48', '#3A54A4', '#C5238F'];

    canvas.width = $('.dlbi-sparkle-banner').width();
    canvas.height = $('.dlbi-sparkle-banner').height();

    var _frameCount = 0;
    var _fps = 60;
    var particles = {},
        particleIndex = 0;

    function _rand(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    // Set up a function to create multiple particles
    function Particle() {
        // Establish starting positions and velocities
        this.x = NIBS.main.settings.posx;
        this.y = NIBS.main.settings.posy;

        // Determine original X-axis speed based on setting limitation
        this.vx = Math.random() * NIBS.main.settings.spread - (NIBS.main.settings.spread / 2);
        this.vx += NIBS.main.settings.xOffset;

        this.vy = Math.random() * NIBS.main.settings.spread - (NIBS.main.settings.spread / 2);
        this.vy += NIBS.main.settings.yOffset;

        this.color = colors[_rand(0, colors.length - 1)];
        this.size = NIBS.main.settings.particleSize * _rand(1 - NIBS.main.settings.ParticleDiff, 1 + NIBS.main.settings.ParticleDiff);
        this.rotation = 0;
        this.alpha = 1;

        // Add new particle to the index
        // Object used as it's simpler to manage that an array
        particleIndex++;
        particles[particleIndex] = this;
        this.id = particleIndex;
        this.life = 0;
        this.maxLife = NIBS.main.settings.lifeTime;
    }

    // Some prototype methods for the particle's "draw" function
    Particle.prototype.draw = function() {

        this.x += this.vx;
        this.y += this.vy;

        // Adjust for gravity
        this.vy += (NIBS.main.settings.gravity);

        // Age the particle
        this.life++;

        // If Particle is old, it goes in the chamber for renewal
        if (this.life >= this.maxLife) {
            delete particles[this.id];
        }

        // Create the shapes

        var that = this;
        var drawDot = function() {
            context.beginPath();
            context.fillStyle = that.color;
            context.arc(that.x, that.y, NIBS.main.settings.particleSize, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
        };

        var drawStar = function() {
            context.save();
            context.beginPath();
            context.fillStyle = that.color;
            var nuSize = that.size;
            context.moveTo(that.x, that.y);
            context.lineTo(that.x + (1.5 * nuSize), that.y + (4 * nuSize));
            context.lineTo(that.x + (5 * nuSize), that.y + (5 * nuSize));
            context.lineTo(that.x + (1.5 * nuSize), that.y + (7 * nuSize));
            context.lineTo(that.x + 0, that.y + (10 * nuSize));
            context.lineTo(that.x - (1.5 * nuSize), that.y + (7 * nuSize));
            context.lineTo(that.x - (5 * nuSize), that.y + (5 * nuSize));
            context.lineTo(that.x - (1.5 * nuSize), that.y + (4 * nuSize));
            context.closePath();
            context.fill();
            context.restore();
        };

        context.clearRect(canvas.width, canvas.height, canvas.width, canvas.height);
        drawStar();

    };

    function _actions() {

        requestAnimFrame(NIBS.sparkle.actions);

        //Clean canvas
        context.fillStyle = 'rgba(255, 255, 255, ' + NIBS.main.settings.trailAlpha + ')';
        context.fillRect(0, 0, canvas.width, canvas.height);

        //Draw background stuff
        NIBS.background.draw();

        // Draw the particles
        for (var i = 0; i < NIBS.main.settings.numbOfSparks; i++) {
            if (Math.random() > 0.97) {
                new Particle();
            }
        }

        for (i in particles) {
            particles[i].draw();
        }

        _frameCount++;

    }

    return {
        actions: _actions
    };
}());
