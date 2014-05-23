/* SlideCtrl.js */
(function(window, angular) {

  var app = angular.module('fireDeck');

  app.controller('SlideCtrl', function($scope, $window, Auth, $q, $routeParams, Fb) {

    $scope.order = {};

    Fb.child('order-index').child($routeParams.title).once('value', function(snap) {
      var value = parseInt(snap.val(), 10);
      $scope.order.current = value;
      $scope.order.prev = value === 1 ? 0 : value - 1;
      $scope.order.next = value + 1;
    });

    $('body').on('keydown', null, 'alt+right', function() {
      // go to the next
      Fb.child('order').child($scope.order.next).once('value', function(snap) {
        var value = snap.val();
        if (value) {
          Fb.child('current').set(value);
          //$scope.current = '/#/slide/' + snap.val();
        }
      });
    });

    $('body').on('keydown', null, 'alt+left', function() {
      // go to the next
      if ($scope.order.prev === 0) {
        return;
      }
      Fb.child('order').child($scope.order.prev).once('value', function(snap) {
        var value = snap.val();
        if (value) {
          Fb.child('current').set(value);
          //$window.location.href = '/#/slide/' + snap.val();
        }
      });
    });

    $scope.pageClass = 'code';

    $scope.back = function() {
      $window.location.href = '/#/';
    };

    $scope.text = '<h1>Hi</h1>';

    $scope.auth = function(editor) {
      var deferred = $q.defer();
      var auth = Auth(function(error, user) {
        if (user) {
          deferred.resolve(true)
        } else {
          deferred.resolve(false);
        }
      });
      return deferred.promise;
    };

    $scope.change = function(config) {
      config.ref.child('post').set(config.pad.getText());
      document.getElementById('render-frame')
        .contentWindow.location.reload(true);
    };


  });

}(window, angular));
