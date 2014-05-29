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
              editor.resize();
            })

            Code.child(scope.location).child('panel-full').on('value', function(snap) {
              var $frame = $('#render-container');
              if (!snap.val()) {
                $frame.removeClass('full');
              } else {
                $frame.addClass('full');
              }
              editor.resize();
            });

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
              bindKey: {win: 'Ctrl-I',  mac: 'Command-I'},
              exec: function(editor) {
                var isFull = $('#' + scope.location).hasClass('full');
                var fsRef = Code.child(scope.location).child('fullscreen');
                fsRef.set(!isFull);
              },
              readOnly: false // false if this command should not apply in readOnly mode
            });

            editor.commands.addCommand({
              name: 'LocalFullScreen',
              bindKey: {win: 'Ctrl-F',  mac: 'Command-F'},
              exec: function(editor) {
                var $container = $('#' + scope.location);
                var isFull = $container.hasClass('full');

                if (isFull) {
                  $container.removeClass('full');
                } else {
                  $container.addClass('full');
                }

                editor.resize();
              },
              readOnly: true // false if this command should not apply in readOnly mode
            });

            editor.commands.addCommand({
              name: 'PanelFullScreen',
              bindKey: {win: 'Ctrl-J',  mac: 'Command-J'},
              exec: function(editor) {
                var $frame = $('#render-container');
                var isFull = $frame.hasClass('full');
                var fsRef = Code.child(scope.location).child('panel-full');
                fsRef.set(!isFull);
              },
              readOnly: false // false if this command should not apply in readOnly mode
            });

            editor.commands.addCommand({
              name: 'LocalPanelFullScreen',
              bindKey: {win: 'Ctrl-B',  mac: 'Command-B'},
              exec: function(editor) {
                var $frame = $('#render-container');

                var isFull = $frame.hasClass('full');

                if (isFull) {
                  $frame.removeClass('full');
                } else {
                  $frame.addClass('full');
                }

                editor.resize();
              },
              readOnly: true // false if this command should not apply in readOnly mode
            });

          });

        });

      }
    };
  }]);

}(window.angular, window.ace, window.Firepad));
