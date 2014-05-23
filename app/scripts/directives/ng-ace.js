(function(angular, ace, Firepad) {

  var app = angular.module('fireDeck');

  app.directive('ngAce', ['$timeout', 'Fb', function($timeout, Fb) {
    return {
      restrict: 'E',
      scope: {
        location: '@',
        load: '=',
        code: '=',
        auth: '=',
        change: '='
      },
      template: '<div id="firepad-container"></div>',
      link: function(scope, element, attrs) {

        $timeout(function() {

          var firepadRef = Fb.child('code').child(scope.location);
          var editor = ace.edit("firepad-container");
          editor.setTheme("ace/theme/monokai");

          scope.auth(editor).then(function(isAuthed) {

            if (!isAuthed) {
              editor.setReadOnly(true);
            }

          });

          var session = editor.getSession();
          session.setUseWrapMode(true);
          session.setUseWorker(false);
          session.setMode("ace/mode/javascript");


          //// Create Firepad.
          var firepad = Firepad.fromACE(firepadRef, editor);

          //// Initialize contents.
          firepad.on('ready', function() {
            if (firepad.isHistoryEmpty()) {
              firepad.setText(scope.load(scope.code));
            }
            editor.getSession().on('change', function(e) {
                // e.type, etc
              console.log(firepad.getText());
            });
          });

        });

      }
    };
  }]);

}(window.angular, window.ace, window.Firepad));
