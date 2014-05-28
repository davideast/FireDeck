angular.module('Federer', ['firebase'])

.constant('FBURL', 'https://fire-deck.firebaseio.com/')

.factory('Fb', function(FBURL) {
  return new Firebase(FBURL);
})

.factory('Facts', function(Fb, $firebase) {
   return $firebase(Fb.child('facts'));
})

.controller('FactsCtrl', function($scope, Facts) {
    $scope.facts = Facts;
    $scope.newFact = '';

    $scope.add = function() {
        $scope.facts.$add($scope.newFact);
    };
});
