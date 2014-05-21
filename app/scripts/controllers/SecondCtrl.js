/* SecondCtrl.js */
(function(window, angular) {

  var app = angular.module('fireDeck');

  app.controller('SecondCtrl', ['$scope', '$window', function($scope, $window) {
    $scope.pageClass = 'page-next';

    $scope.back = function() {
      $window.location.href = '/#/';
    };
  }]);

}(window, angular));
