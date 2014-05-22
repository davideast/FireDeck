/* global Firebase */
(function(window, angular) {

  var app = angular.module('fireDeck', ['ngRoute', 'ngAnimate']);

  app.config(function($routeProvider) {

    $routeProvider
			.when('/', {
				templateUrl : 'app/views/main.html',
				controller  : 'MainCtrl'
			})
      .when('/slide/:id', {
        templateUrl: 'app/views/next.html',
        controller: 'SlideCtrl',
        resolve: {
          data: function($route, SlideService) {
            return SlideService.get($route.current.params.id);
          }
        }
      })
      .otherwise('/');

  });

  // set up constants
  app.constant('FBURL', 'https://fire-deck.firebaseio.com/');
  app.constant('SLIDES', 'https://fire-deck.firebaseio.com/slides');
  app.constant('CURRENT', 'https://fire-deck.firebaseio.com/current');

  app.run(function($window, CURRENT) {
    console.log(CURRENT);
    // global change page
    var currentRef = new Firebase(CURRENT);
    currentRef.on('value', function(snapshot) {
      var value = snapshot.val();
      if (value) {
        $window.location.href = '/#/slide/' + value;
      }
    });

  });

}(window, angular));
