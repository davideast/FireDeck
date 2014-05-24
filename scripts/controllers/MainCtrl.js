/* MainCtrl.js */
(function(window, angular) {

  var app = angular.module('fireDeck');

  app.controller('MainCtrl', ['$scope', '$window', function($scope, $window) {

    $scope.pageClass = 'page-about';

  }]);

}(window, angular));
