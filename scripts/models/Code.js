(function(window, angular) {

  angular.module('fireDeck')
    .factory('Code', ['CODEURL', function(CODEURL) {
      return new Firebase(CODEURL);
    }]);

}(window, angular));