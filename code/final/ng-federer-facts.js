angular.module('Federer', ['firebase'])

.constant('FBURL', 'https://fire-deck.firebaseio.com/')

.factory('Fb', function(FBURL) {
    return new Firebase(FBURL);
})

.factory('Facts', function(Fb, $firebase) {
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

.controller('FactsCtrl', function($scope, Facts) {
    $scope.facts = Facts.get();
    $scope.newFact = '';

    function addFact() {
        Facts.add($scope.newFact);
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

// curl -X DELETE 'https://fire-deck.firebaseio.com/facts.json'
