/* global Firebase */
(function(window, angular) {

  var app = angular.module('fireDeck', ['ngRoute', 'ngAnimate', 'firebase']);

  app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
			.when('/', {
				templateUrl : 'app/views/main.html',
				controller  : 'MainCtrl'
			})
      .when('/slide/:id', {
        templateUrl: function(params){
          return 'app/slides/' + params.id + '.html';
        },
        controller: 'SlideCtrl',
        resolve: {
          data: function($route, SlideService) {
            return SlideService.get($route.current.params.id);
          }
        }
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
  app.constant('USERS', 'https://fire-deck.firebaseio.com/users');

  app.run(function() {
    // global change page
    // var currentRef = new Firebase(CURRENT);
    // currentRef.on('value', function(snapshot) {
    //   var value = snapshot.val();
    //   if (value) {
    //     $window.location.href = '/#/slide/' + value;
    //   }
    // });

  });

}(window, angular));
