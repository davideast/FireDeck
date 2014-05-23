(function(angular, ace, Firepad) {

  var app = angular.module('fireDeck');

  app.directive('ngAce', ['$timeout', function($timeout) {
    return {
      restrict: 'E',
      scope: {
        load: '=',
        code: '@'
      },
      template: '<div id="firepad-container"></div>',
      link: function(scope, element, attrs) {

        $timeout(function() {
          var editor = ace.edit("firepad-container");
          editor.setTheme("ace/theme/monokai");
          editor.setValue(scope.load(scope.code));
          
          var session = editor.getSession();
          session.setUseWrapMode(true);
          session.setUseWorker(false);
          session.setMode("ace/mode/javascript");

        });

      }
    };
  }]);

}(window.angular, window.ace, window.Firepad));
