/* MainCtrl.js */
(function(window, angular) {

  var app = angular.module('fireDeck');

  app.controller('DashCtrl', ['$scope', '$window', function($scope, $window) {

    $scope.pageClass = 'page-about';

  }]);

}(window, angular));
