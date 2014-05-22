/* MainCtrl.js */
(function(window, angular) {

  var app = angular.module('fireDeck');

  app.controller('DashCtrl', ['$scope', '$window', 'Decks', function($scope, $window, Decks) {

    $scope.decks = Decks.$asArray();

  }]);

}(window, angular));
