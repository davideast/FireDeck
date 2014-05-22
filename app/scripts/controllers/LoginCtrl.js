/* MainCtrl.js */
(function(window, angular) {

  var app = angular.module('fireDeck');

  app.controller('LoginCtrl', ['$scope', '$window', 'Auth',
   function($scope, $window, Auth) {
    $scope.pageClass = 'page-about';

    $scope.auth = Auth(function(error, user) {
      if (user) {
        $window.location.href = '/#/dashboard';
      }
    });

    $scope.user = {};

    $scope.login = function() {
      auth.login('password', {
        email: $scope.user.name,
        password: $scope.user.pass,
        rememberMe: true
      });
    };

  }]);

}(window, angular));
