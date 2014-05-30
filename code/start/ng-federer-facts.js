angular.module('Federer', ['firebase'])

.service('FactService', function() {
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
