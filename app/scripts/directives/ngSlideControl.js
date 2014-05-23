(function(angular) {
   var app = angular.module('fireDeck');
   app.directive('control', function () {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        console.log('ghi');
        $('body').on('keydown', null, 'ctrl+b', function() {
          console.log('ctrl+b');
        });

        $('body').on('keydown', null, 'ctrl+n', function() {
          console.log('ctrl+n');
        });
      }
    };
});

}(angular));
