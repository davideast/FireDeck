/* global Firebase */
(function(window, angular) {

  var app = angular.module('fireDeck', ['ngRoute', 'ngAnimate', 'ngSanitize', 'firebase']);

  app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
			.when('/', {
				templateUrl : 'app/views/main.html',
				controller  : 'MainCtrl'
			})
      .when('/render-frame', {
        templateUrl: 'app/views/render-frame.html',
        controller: function($scope) {

          $scope.dynamicJS = {}; // whatever Im listening to;

        }
      })
      .when('/slide/:title', {
        templateUrl: function(params){
          return 'app/slides/' + params.title + '.html';
        },
        controller: 'SlideCtrl',
        // resolve: {
        //   data: function($route, SlideService) {
        //     return SlideService.get($route.current.params.id);
        //   }
        // }
      })
      .when('/login', {
        templateUrl : 'app/views/login.html',
        controller  : 'LoginCtrl'
      })
      .otherwise('/');

  }]);

  // set up constants
  app.constant('FBURL', 'https://fire-deck.firebaseio.com/');
  app.constant('SLIDES', 'https://fire-deck.firebaseio.com/slides');
  app.constant('CURRENT', 'https://fire-deck.firebaseio.com/current');

  app.run(function($window, Fb) {
    // global change page
    Fb.child('current').on('value', function(snap) {
      var value = snap.val();
      if (value) {
        $window.location.href = '/#/slide/' + value;
      }
    });
  });

}(window, angular));
