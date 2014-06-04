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

          // grab the index of the page we are currently on
          Fb.child('order-index').child(currentPage).once('value', function(snap) {
            var value = parseInt(snap.val(), 10);
            // determine if we are going forwards or backwards
            var direction = fn.call(this, value);

            // get the page name of the slide by the index
            Fb.child('order').child(direction).once('value', function(snapshot) {
              var page = snapshot.val();
              if (page) {

                // if there is a global config then change the current
                // page value in firebase
                if (global) {
                  Fb.child('current').set(page);
                } else {
                  // if there is no global config, just switch the page
                  // locally
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
