(function(angular, ace, Firepad) {

  var app = angular.module('fireDeck');

  app.directive('ngAce', ['$timeout', 'Fb', function($timeout, Fb) {
    return {
      restrict: 'E',
      scope: {
        location: '@',
        auth: '=',
        change: '='
      },
      template: '<div id="firepad-container"></div>',
      link: function(scope, element, attrs) {

        $timeout(function() {

          var firepadRef = Fb.child('code').child(scope.location);
          var editor = ace.edit("firepad-container");
          editor.setTheme("ace/theme/monokai");
          editor.setFontSize(18);
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
            editor.commands.addCommand({
              name: 'myCommand',
              bindKey: {win: 'Ctrl-K',  mac: 'Command-K'},
              exec: function(editor) {
               if (scope.change) {
                 scope.change.call(this, {
                   ref: firepadRef,
                   pad: firepad
                 });
               }
              },
              readOnly: false // false if this command should not apply in readOnly mode
            });
          });

        });

      }
    };
  }]);

}(window.angular, window.ace, window.Firepad));
