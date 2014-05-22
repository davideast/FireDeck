/* MainCtrl.js */
(function(window, angular) {

  var app = angular.module('fireDeck');

  app.controller('MainCtrl', function($scope, $window, SLIDES) {
    $scope.pageClass = 'page-main';

    $scope.next = function() {
      $window.location.href = '/#/next';
    };

  });

}(window, angular));
