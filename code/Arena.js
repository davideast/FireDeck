angular.module('Foo')
  .factory('Arena', function(Ball) {

    var Arena = (function() {
      function Arena(can, onAdd) {
        var element = document.getElementById(can);
        this.can = element;
        this.ctx = element.getContext("2d");
        this.items = [];
        this.num = 0;
        this.onAdd = onAdd;

        // Get canvas and set size to window size
        this.can.width = window.innerWidth;
        this.can.height = (window.innerHeight * .5);

        var self = this;
        this.can.onclick = function() {
          self.addBall.call(self);
        };
      }
      Arena.prototype = {
        constructor: Arena,

        addBall: function(e) {
          var ball = new Ball(this.can, this.ctx)
          this.items[this.num] = ball;

          if (e) {
            this.items[this.num].pos = [e.clientX, e.clientY];
          }

          this.items[this.num].color = "rgb(" + parseInt(Math.random() * 255) + ", "
            + parseInt(Math.random() * 255) + ", " + parseInt(Math.random() * 255) + ")";
          this.items[this.num].velocity = [
            Math.random() * 20 - 10,
            Math.random() * 5 - 2.5
          ];
          this.items[this.num].bounciness = Math.random() * 0.1 + 0.9;
          this.items[this.num].friction = Math.random() * 0.05 + 1;
          this.items[this.num].init();
          this.num++;

          if (this.onAdd) {
            this.onAdd.call(this, ball);
          }
        }

      };
      return Arena;
    }());

    Arena.create = function(can, onAdd) {
      return new Arena(can, onAdd);
    };

    return Arena;
  });
