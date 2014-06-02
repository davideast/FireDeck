/* SlideCtrl.js */
(function(window, angular) {

  var app = angular.module('fireDeck');

  app.controller('SlideCtrl', function($scope, $window, Auth, $q, $routeParams, Fb, $timeout, Code, $cookieStore) {

    $scope.pageClass = 'code';
    $scope.order = {};
    $scope.reloads = 0;
    $scope.title = $routeParams.title;

    if ($scope.title === '') {
      $scope.pageClass = 'info';
    }

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

    Fb.child('order-index').child($scope.title).once('value', function(snap) {
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

    Code.child($scope.title).child('post').on('value', function(snap) {
        if ($scope.reloads > 0) {
          var iframe = document.getElementById($scope.title + '-frame');

          if (iframe) {
            iframe.contentWindow.location.reload();
          }
        }

        $scope.reloads++;
    });

    var USER_VOTES = 'userVotes';

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
