/* SlideCtrl.js */
(function(window, angular) {

  var app = angular.module('fireDeck');

  app.controller('SlideCtrl', function($scope, $window, Auth, $q, $routeParams, Fb, $timeout) {
    $scope.pageClass = 'code';
    $scope.order = {};
    Auth(function(error, user) {
      if (user) {
        $timeout(function() {
          $('<div id="control-bar"></div>').appendTo('body');
          $('<button class="btn button-warning" style="position:absolute;top:0;right:60px;z-index:99999999">Prev</button>')
            .on('click', function() {
              Fb.child('order').child($scope.order.prev).once('value', function(snap) {
                var value = snap.val();
                if (value) {
                  Fb.child('current').set(value);
                }
              });
            })
            .appendTo('#control-bar');
          $('<button class="btn button-primary" style="position:absolute;top:0;right:0px;z-index:99999999">Next</button>')
            .on('click', function() {
              Fb.child('order').child($scope.order.next).once('value', function(snap) {
                var value = snap.val();
                if (value) {
                  Fb.child('current').set(value);
                }
              });
            })
            .appendTo('#control-bar');
        });
      }
    });

    Fb.child('order-index').child($routeParams.title).once('value', function(snap) {
      var value = parseInt(snap.val(), 10);
      $scope.order.current = value;
      $scope.order.prev = value === 1 ? 0 : value - 1;
      $scope.order.next = value + 1;
    });

    $scope.auth = function(editor) {
      var deferred = $q.defer();
      var auth = Auth(function(error, user) {
        if (user) {
          deferred.resolve(true);
        } else {
          deferred.resolve(false);
        }
      });
      return deferred.promise;
    };

    Fb.child('code').child($routeParams.title).child('post').on('value', function(snap) {
        document.getElementById($routeParams.title)
          .contentWindow.location.reload(true);
    });

    $scope.change = function(config) {
      config.ref.child('post').set(config.pad.getText());
    };

  });

}(window, angular));
