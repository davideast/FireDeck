(function(window, angular) {

  angular.module('fireDeck')
    .factory('Decks',['DECKS', '$firebase', function(DECKS, $firebase) {
      return $firebase(new Firebase(DECKS));
    }]);

}(window, angular));
