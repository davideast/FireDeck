(function(window, angular) {
  "use strict";
  
  angular.module('fireDeck')
    .factory('Fb', ['FBURL', function(FBURL) {
      return new Firebase(FBURL);
    }]);

}(window, angular));
