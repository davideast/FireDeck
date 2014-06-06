/* SlideCtrl.js */
/*jshint newcap: false  */
(function(window, angular) {
  "use strict";

  var app = angular.module('fireDeck');

  app.controller('SlideCtrl', function($scope, $window, Auth, $q, $routeParams, Fb, $timeout, Code, $cookieStore) {
    var USER_VOTES = 'userVotes';

    $scope.pageClass = 'code';
    $scope.order = {};
    $scope.reloads = 0;
    $scope.title = $routeParams.title;

    function setVote(id) {
      var userVotes = $cookieStore.get(USER_VOTES);
      userVotes[id] = true;
      $cookieStore.put(USER_VOTES, userVotes);
    }

    function hasVoted(id) {
      return !!$cookieStore.get(USER_VOTES)[id];
    }

    if ($scope.title === 'who-knows-fb') {
      var heard = Fb.child('heard'),
          heardYes = heard.child('yes'),
          heardNo = heard.child('no');


      $scope.heard = function(dir) {
        if (!hasVoted('heard')) {
          heard.child(dir).push(true);
          setVote('heard');
        }
      };

      heardYes.on('value', function(snap) {
        $timeout(function() {
          $scope.heardYes = snap.numChildren();
        });
      });

      heardNo.on('value', function(snap) {
        $timeout(function() {
          $scope.heardNo = snap.numChildren();
        });
      });

    }

    if ($scope.title === 'who-has-used-fb') {

      var used = Fb.child('used'),
          usedYes = used.child('yes'),
          usedNo = used.child('no');


      $scope.used = function(dir) {
        if (!hasVoted('used')) {
          used.child(dir).push(true);
          setVote('used');
        }
      };

      usedYes.on('value', function(snap) {
        $timeout(function() {
          $scope.usedYes = snap.numChildren();
        });
      });

      usedNo.on('value', function(snap) {
        $timeout(function() {
          $scope.usedNo = snap.numChildren();
        });
      });
    }

  });

}(window, angular));
