(function(window, angular) {

  angular.module('fireDeck')
    .factory('Fb', ['FBURL', function(FBURL) {
      return new Firebase(FBURL);
    }]);

}(window, angular));
