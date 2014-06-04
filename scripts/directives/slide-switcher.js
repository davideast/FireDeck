// slide-switcher.js
// Directive
// This directive appends two buttons to a page that will control the flow
// of the slides.
(function(angular) {
  "use strict";

  var app = angular.module('fireDeck');

  app.directive('slideSwitcher', function(Fb, SlideSwitcher, $routeParams, $q, $rootScope) {
    return {
      restrict: 'E',
      scope: {
        auth: '=',
        global: '='
      },
      templateUrl: 'views/slide-switcher.html',
      link: function(scope, element, attrs) {

        var global, auth;
        function checkGlobal() {
          var isGlobal = $q.defer();
          Fb.child('global').once('value', function(snap) {
            isGlobal.resolve(snap.val());
          });
          return isGlobal.promise;
        }

        var globalAuth = checkGlobal();

        globalAuth
          .then(function(config) {
            global = config;
            return $rootScope.auth();
          })
          .then(function(authed) {

            scope.allowed = function() {

              if (!global) {
                return false;
              }

              if (!authed && global.hide) {
                return false;
              }

              var switcher = SlideSwitcher.create(global.global);

              scope.prev = function() {
                switcher.prev($routeParams.title);
              };

              scope.next = function() {
                switcher.next($routeParams.title);
              };

              return true;

            };

          });

      }
    };
  });

}(angular));
