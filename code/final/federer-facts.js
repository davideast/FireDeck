angular.module('Federer')

.constant('FBURL', 'https://fire-deck.firebaseio.com/')

.factory('Fb', function(FBURL) {
  return new Firebase(FBURL);
})

.controller('FactsCtrl', function($scope, $timeout, Fb) {
    $scope.facts = [];
    $scope.newFact = '';

    var factsRef = Fb.child('facts');

    factsRef.on('child_added', function(snap) {
        $timeout(function() {
            $scope.facts.push(snap.val());
        });
    });

    $scope.add = function() {
        factsRef.push($scope.newFact);
        $scope.newFact = '';
    };
});
