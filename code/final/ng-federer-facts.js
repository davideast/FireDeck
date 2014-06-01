angular.module('Federer', ['firebase'])

.constant('FBURL', 'https://fire-deck.firebaseio.com/')

.factory('Fb', function(FBURL) {
    return new Firebase(FBURL);
})

.service('FactService', function(Fb, $firebase) {
    var facts = $firebase(Fb.child('facts'));
    return {
        add: function(fact) {
            facts.$add({
                fact: fact,
                time: Firebase.ServerValue.TIMESTAMP
            });
        },
        get: function() {
            return facts.$asArray();
        }
    }
})

.controller('FactsCtrl', function($scope, FactService) {
    $scope.facts = FactService.get();
    $scope.newFact = '';

    function addFact() {
        FactService.add($scope.newFact);
        $scope.newFact = '';
    }

    $scope.add = function() {
        addFact();
    };

    $scope.enter = function(e) {
        if (e && e.which === 13) {
           addFact();
        }
    };
});
