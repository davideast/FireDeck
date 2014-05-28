angular.module('Federer')
.controller('FedererCtrl', function($scope, $timeout) {

    $scope.roger = {
        name: 'Roger Federer',
        wimbledons: '0',
        usOpens: '0'
    };

    // References can chain into other locations
    var firebseRef = new Firebase(
        'https://fire-deck.firebaseio.com'
    ),

    // root -> roger-federer
    // https://fire-deck.firebaseio.com/roger-federer
    rogerRef = firebseRef.child('roger-federer');
    
    // show the set override and then fix with an update
    $scope.updateRoger = function() {
        // set vs update
        rogerRef.set({
            name: 'Roger Federer',
            wimbledons: '323',
            usOpens: '212'
        });
    };

    // set the listener to update the values
    rogerRef.on('value', function(snap) {
       $timeout(function() {
          $scope.roger = snap.val();
          console.log($scope.roger);
       });
    });

});
