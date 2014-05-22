/* MainCtrl.js */
(function(window, angular) {

  var app = angular.module('fireDeck');

  app.controller('SlideEditCtrl', ['$scope', '$window', 'Decks', '$routeParams',
   function($scope, $window, Decks, $routeParams) {

     $scope.deck = Decks.$child($routeParams.deckid);
     $scope.slide = $scope.deck.$child('slides').$child($routeParams.slideid);


  }]);

}(window, angular));
