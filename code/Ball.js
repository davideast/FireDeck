angular.module('Foo')
  .factory('Ball', function() {
    /**
     * @author Pablo Molina <http://p2kmgcl.com>
     * @date 2012-07-18
     */

    /** Object Pelota */
    var Pelota = function (can, ctx) {
      this.can = can;
      this.ctx = ctx;
      this.size = 20;
      this.gravity = 9.81;
      this.velocity = [7.5, 0];
      this.bounciness = 0.9;
      this.friction = 1.01;
      this.pos = [100, 0];
      this.color = "black";
      this.stop = false;

      this.stopTimes = 0;
      this.stopLimit = 10;
      this.id = ++this.constructor.prototype.ID;

      var me = this;
      this.init = function () {
        me.fall();
        me.draw();
        if (!me.stop)
          window.requestAnimFrame(me.init);
      };
    };

    /** Number of instances for this class */
    Pelota.prototype.ID = 0;

    /** Draw the ball on the canvas */
    Pelota.prototype.draw = function () {
      if (this.id === 1) {
        this.ctx.clearRect(0, 0, this.can.width, this.can.height);
      }
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.strokeStyle = "white";
      this.ctx.moveTo(this.pos[0] + this.size, this.pos[1]);
      this.ctx.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI * 2, true);
      this.ctx.fill();
      //this.ctx.stroke();
      this.ctx.closePath();
    };

    /** Calculates the ball's position */
    Pelota.prototype.fall = function () {
      if (parseInt(this.velocity[1]) === 0 &&
          parseInt(this.velocity[0]) === 0) {
        this.stopTimes += 1;
      } else {
        this.stopTimes = 0;
      }

      if (this.stopTimes < this.stopLimit) {
        this.velocity[1] += this.gravity / 10;
        this.pos[0] += this.velocity[0];
        this.pos[1] += this.velocity[1];

        if (this.pos[1] > this.can.height - this.size) {
          this.pos[1] = this.can.height - this.size;
          this.velocity[1] = this.velocity[1] * (-1) * this.bounciness;
          this.velocity[0] /= this.friction;
        }

        if (this.pos[0] <= 0 + this.size) {
          this.pos[0] = this.size;
          this.velocity[0] *= (-1);
        } else if (this.pos[0] >= this.can.width - this.size) {
          this.pos[0] = this.can.width - this.size;
          this.velocity[0] *= (-1);
        }
      }
    };

    /** Stops the animation */
    Pelota.prototype.finish = function () {
      this.stop = true;
    };

    return Pelota;
  });
