/* global Firebase */
(function(window, angular) {

  var app = angular.module('fireDeck', ['ngRoute', 'ngAnimate', 'ngSanitize', 'firebase']);

  app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
			.when('/', {
				templateUrl : '../views/main.html',
				controller  : 'MainCtrl'
			})
      .when('/slide/:title', {
        templateUrl: function(params){
          return '../slides/' + params.title + '.html';
        },
        controller: 'SlideCtrl'
      })
      .when('/login', {
        templateUrl : '../views/login.html',
        controller  : 'LoginCtrl'
      })
      .otherwise('/');

  }]);

  // set up constants
  app.constant('FBURL', 'https://fire-deck.firebaseio.com/');
  app.constant('SLIDES', 'https://fire-deck.firebaseio.com/slides');
  app.constant('CURRENT', 'https://fire-deck.firebaseio.com/current');

  app.run(function($window, Fb, $rootScope) {
    // global change page
    Fb.child('current').on('value', function(snap) {
      var value = snap.val();
      if (value) {
        $window.location.href = '/#/slide/' + value;
      }
    });

  });

}(window, angular));
