angular.module('Federer', [])

.factory('FactStore', function() {
    var facts = [];
    return {
        add: function(fact) {
            facts.push({
                fact: fact,
                time: new Date()
            });
        },
        get: function() {
            return facts;
        }
    }
})

.controller('FactsCtrl', function($scope, FactStore) {
    $scope.facts = FactStore.get();
    $scope.newFact = '';

    function addFact() {
        FactStore.add($scope.newFact);
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
