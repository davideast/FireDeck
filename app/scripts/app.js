(function(window, angular) {

  var app = angular.module('fireDeck', ['ngRoute', 'ngAnimate']);

  app.config(function($routeProvider) {

    $routeProvider
			.when('/', {
				templateUrl : 'app/views/main.html',
				controller  : 'MainCtrl'
			})
      .when('/next', {
        templateUrl: 'app/views/next.html',
        controller: 'SecondCtrl'
      })
      .otherwise('/');

  });

}(window, angular));
