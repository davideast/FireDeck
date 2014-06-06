/**
 * Firepad Directive
 * This is a very rudimentary implementation of a FirePad directive. That
 * really only supports this presentation. 
 **/
(function (angular, ace, Firepad) {
	"use strict";

	var app = angular.module('fireDeck');

	app.directive('firePad', function ($timeout, Code, $q) {
		return {
			restrict: 'E',
			scope: {
				location: '@',
				auth: '=',
				frame: '@',
				fontSize: '@'
			},
			template: '<div id="{{location}}" class="firepad-container"></div>',
			link: function (scope, element, attrs) {
        $timeout(function() {
          var firepadRef, editor, session, firepad, commands;

          // initalize reloads to 0
          scope.reloads = 0;
          firepadRef = Code.child(scope.location);
          editor = ace.edit(scope.location);

          // set options
          editor.setTheme("ace/theme/monokai");
          editor.setFontSize(scope.fontSize || 18);

          // set auth for editing
          scope.auth(editor).then(function (isAuthed) {

            if (!isAuthed) {
              editor.setReadOnly(true);
            }

          });

          // set session options
          session = editor.getSession();
          session.setUseWrapMode(true);
          session.setUseWorker(false);
          // JavaScript is only supported at the time
          session.setMode("ace/mode/javascript");

          // Create Firepad.
          firepad = Firepad.fromACE(firepadRef, editor);

          // Initialize contents.
          firepad.on('ready', function () {

            if (firepad.isHistoryEmpty()) {
              firepad.setText(scope.load(scope.code));
            }

            // listener to change firepad to fullscreen
            firepadRef.child('fullscreen').on('value', function (snap) {
              var $container = $('#' + scope.location);
              if (snap.val()) {
                $container.addClass('full');
              } else {
                $container.removeClass('full');
              }
              editor.resize();
            });

            // reloads the iframe
            firepadRef.child('post').on('value', function (snap) {

              if (scope.reloads > 0) {
                var iframe = document.getElementById(scope.location + '-frame');

                if (iframe) {
                  iframe.contentWindow.location.reload();
                }
              }

              scope.reloads++;
            });

            // factory for creating commands
            function ctrlCommand(params) {
              return {
                name: params.name,
                bindKey: {
                  win: 'Ctrl-' + params.key,
                  mac: 'Command-' + params.key
                },
                exec: function (editor) {
                  params.exec.call(this, editor);
                },
                readOnly: params.readOnly || false
              };
            }

            // create commands for ace

            editor.commands.addCommand(ctrlCommand({
              name: 'Reload',
              key: 'K',
              exec: function(editor) {
                firepadRef.child('post').set(firepad.getText());
              }
            }));

            editor.commands.addCommand(ctrlCommand({
              name: 'FullScreen',
              key: 'I',
              exec: function(editor) {
                var isFull = $('#' + scope.location).hasClass('full');
                var fsRef = firepadRef.child('fullscreen');
                fsRef.set(!isFull);
              }
            }));

            editor.commands.addCommand(ctrlCommand({
              name: 'LocalFullScreen',
              key: 'F',
              exec: function(editor) {
                var $container = $('#' + scope.location);
                var isFull = $container.hasClass('full');

                if (isFull) {
                  $container.removeClass('full');
                } else {
                  $container.addClass('full');
                }

                editor.resize();
              }
            }));

          });


        });
			}
		};
	});

}(window.angular, window.ace, window.Firepad));
