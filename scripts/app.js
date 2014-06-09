/*app.js*/
/*jshint newcap: false  */
(function(window, angular) {
  "use strict";

  var app = angular.module('fireDeck', ['ngRoute', 'ngAnimate', 'ngSanitize', 'firebase', 'ngCookies']);

  app.config(function($routeProvider) {

    $routeProvider
			.when('/', {
				templateUrl : '../views/main.html',
				controller  : 'MainCtrl'
			})
      .when('/slide/:title', {
        templateUrl: function(params){
          console.log('/slides/' + params.title + '.html');
          return '/slides/' + params.title + '.html';
        },
        controller: 'SlideCtrl'
      })
      .when('/login', {
        templateUrl : '../views/login.html',
        controller  : 'LoginCtrl'
      })
      .otherwise('/');
  });

  // set up constants
  app.constant('FBURL', 'https://fire-deck.firebaseio.com/');
  app.constant('SLIDES', 'https://fire-deck.firebaseio.com/slides');
  app.constant('CURRENT', 'https://fire-deck.firebaseio.com/current');
  app.constant('CODEURL', 'https://fire-deck.firebaseio.com/code');

  app.run(function($window, Fb, $rootScope, $cookieStore, Auth, $q) {

    // create cookie for storing votes
    var userVotesCookie = $cookieStore.get('userVotes');
    if (!userVotesCookie) {
      $cookieStore.put('userVotes', {});
    }

    // global change page
    Fb.child('current').on('value', function(snap) {
      var value = snap.val();
      if (value) {
        $window.location.href = '/#/slide/' + value;
      }
    });

    // global auth function
    $rootScope.auth = function() {
      var deferred = $q.defer();
      var auth = Auth(function(error, user) {
        if (user) {
          deferred.resolve(true);
        } else {
          deferred.resolve(false);
        }
      });
      return deferred.promise;
    };

  });

}(window, angular));
