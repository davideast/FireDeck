(function(angular, ace, Firepad) {

  var app = angular.module('fireDeck');

  app.directive('ngAce', ['$timeout', 'Code', function($timeout, Code) {
    return {
      restrict: 'E',
      scope: {
        location: '@',
        auth: '=',
        change: '='
      },
      template: '<div id="{{location}}" class="firepad-container"></div>',
      link: function(scope, element, attrs) {

        $timeout(function() {

          var firepadRef = Code.child(scope.location);
          var editor = ace.edit(scope.location);
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

            Code.child(scope.location).child('fullscreen').on('value', function(snap) {
              var $container = $('#' + scope.location);
              if (snap.val()) {
                $container.addClass('full');
              } else {
                $container.removeClass('full');
              }
            })

            editor.commands.addCommand({
              name: 'Reload',
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

            editor.commands.addCommand({
              name: 'FullScreen',
              bindKey: {win: 'Ctrl-Y',  mac: 'Command-Y'},
              exec: function(editor) {
                var isFull = $('#' + scope.location).hasClass('full');
                var fsRef = Code.child(scope.location).child('fullscreen');
                fsRef.set(!isFull);
              },
              readOnly: false // false if this command should not apply in readOnly mode
            });

          });

        });

      }
    };
  }]);

}(window.angular, window.ace, window.Firepad));
