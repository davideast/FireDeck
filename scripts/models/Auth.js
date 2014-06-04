(function(window, angular) {
  "use strict";

  angular.module('fireDeck')
    .factory('Auth', ['Fb', function(Fb) {

      function setAuth(cb) {
        var auth = new FirebaseSimpleLogin(Fb, function(error, user) {
          cb.call(this, error, user);
        });
        return auth;
      }

      return setAuth;
    }]);

}(window, angular));
