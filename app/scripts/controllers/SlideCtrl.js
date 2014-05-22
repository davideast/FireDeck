/* SlideCtrl.js */
(function(window, angular) {

  var app = angular.module('fireDeck');

  app.controller('SlideCtrl', function($scope, $window, data) {

    $scope.slide = data;

    $scope.pageClass = 'page-next';

    $scope.back = function() {
      $window.location.href = '/#/';
    };
  });

}(window, angular));
