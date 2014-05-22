(function(window, angular) {

  angular.module('fireDeck')
    .factory('Decks',['DECKS', function(DECKS) {
      return new Firebase(DECKS);
    }]);

}(window, angular));
