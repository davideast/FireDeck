// slide-switcher.js
// Directive
// This directive appends two buttons to a page that will control the flow
// of the slides.
(function(angular) {
  "use strict";

  var app = angular.module('fireDeck');

  app.directive('slideSwitcher', function($window, SlideSwitcher, $routeParams) {
    return {
      restrict: 'E',
      scope: {
        auth: '=',
        global: '='
      },
      templateUrl: 'views/slide-switcher.html',
      link: function(scope, element, attrs) {
        var switcher = SlideSwitcher.create();

        // scope.auth.then(function() {
        //
        // });

        scope.prev = function() {
          switcher.prev($routeParams.title);
        };

        scope.next = function() {
          switcher.next($routeParams.title);
        };
      }
    };
  });

}(angular));
