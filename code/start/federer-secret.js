angular.module('Federer', ['firebase'])

.constant('FBURL', 'https://<your-firebase>.firebaseio.com/')

.factory('Fb', function(FBURL) {
    return new Firebase(FBURL);
})

.factory('Secret', function(Fb, $firebase) {
    return $firebase(Fb.child('secret'))
})

.factory('Auth', function(Fb, $firebaseSimpleLogin, $rootScope) {
    var simpleLogin = $firebaseSimpleLogin(Fb);
    return {
        login: function(user) {
          return simpleLogin.$login('password', {
               email: user.email,
               password: user.password
            });
        },
        logout: function() {
            simpleLogin.$logout();
        },
        onLogin: function(cb) {
            $rootScope.$on('$firebaseSimpleLogin:login',
            function(e, user) {
                cb(e, user);
            });
        }
    }
})

.controller('SecretCtrl', function($scope, Auth, Secret) {
    $scope.secret = '';
});
