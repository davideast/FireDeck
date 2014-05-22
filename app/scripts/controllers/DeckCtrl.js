/* MainCtrl.js */
(function(window, angular) {

  var app = angular.module('fireDeck');

  app.controller('DeckCtrl', ['$scope', '$window', 'Decks', '$routeParams',
   function($scope, $window, Decks, $routeParams) {

     $scope.deck = Decks.$child($routeParams.deckid);
     $scope.slides = $scope.deck.$child('slides').$asArray();

     $scope.newSlide = function() {
       var newSlide = $scope.deck.$child('slides').$add({
         title: 'Untitled',
         type: 'info'
       });

       $window.location.href = '/#/deck/'
         + $routeParams.deckid
         + '/slide-edit/'
         + newSlide.$id;
     };

  }]);

}(window, angular));
