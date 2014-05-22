(function(window, angular) {

  angular.module('fireDeck')
    .factory('Auth', ['Fb', '$q', function(Fb, $q) {

      function setAuth(cb) {
        var auth = new FirebaseSimpleLogin(Fb, function(error, user) {
          cb.call(this, error, user);
        });
        return auth;
      }

      return setAuth;
    }]);

}(window, angular));
