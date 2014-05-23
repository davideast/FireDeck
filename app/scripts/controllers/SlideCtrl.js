/* SlideCtrl.js */
(function(window, angular) {

  var app = angular.module('fireDeck');

  app.controller('SlideCtrl', function($scope, $window) {

    $scope.pageClass = 'info';

    $scope.back = function() {
      $window.location.href = '/#/';
    };

    $scope.text = '<h1>Hi</h1>';

    $scope.loadCode = function(code) {
      return "alert('hi');";
    };

  });

}(window, angular));
