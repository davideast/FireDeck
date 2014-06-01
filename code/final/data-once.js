angular.module('Federer')

.constant('FBURL', 'https://fire-deck.firebaseio.com/')

.factory('Fb', function(FBURL) {
  return new Firebase(FBURL);
})

.controller('RivalsCtrl', function($scope, $timeout, Fb) {
    $scope.rivals = [];
    $scope.newFact = '';

    var rivalsRef = Fb.child('rivals');

    rivalsRef.once('value', function(snap) {
        $timeout(function() {
            $scope.rivals = snap.val();
        });
    });

});
