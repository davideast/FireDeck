/* SlideSwitcher.js */
(function(angular) {
  "use strict";

  var app = angular.module('fireDeck');

  app.factory('SlideSwitcher', function(Fb, $window) {

    var Switcher = function(global) {
      this.global = global;

      return {
        next: function(currentPage) {
          this.change(currentPage, function(value) {
            return value + 1;
          });
        },
        prev: function(currentPage) {
          this.change(currentPage, function(value) {
            return value === 1 ? 0 : value - 1;
          });
        },
        change: function(currentPage, fn) {

          Fb.child('order-index').child(currentPage).once('value', function(snap) {
            var value = parseInt(snap.val(), 10);
            var page = fn.call(this, value);

            Fb.child('order').child(page).once('value', function(snapshot) {
              var page = snapshot.val();
              if (page) {

                if (global) {
                  Fb.child('current').set(page);
                } else {
                  $window.location.href = '/#/slide/' + page;
                }

              }
            });

          });

        }
      };
    };

    Switcher.create = function(global) {
      return new Switcher(global);
    };

    return Switcher;

  });

}(angular));
