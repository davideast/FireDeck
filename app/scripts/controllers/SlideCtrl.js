/* SlideCtrl.js */
(function(window, angular) {

  var app = angular.module('fireDeck');

  app.controller('SlideCtrl', function($scope, $window, Auth, $q, $http) {

    $scope.pageClass = 'info';

    $scope.back = function() {
      $window.location.href = '/#/';
    };

    $scope.text = '<h1>Hi</h1>';

    $scope.auth = function(editor) {
      var deferred = $q.defer();
      var auth = Auth(function(error, user) {
        if (user) {
          deferred.resolve(true)
        } else {
          deferred.resolve(false);
        }
      });
      return deferred.promise;
    };

    $scope.change = function(text) {
      console.log(text);
    };


  });

}(window, angular));
