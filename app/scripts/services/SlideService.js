// SlideService.js
(function(window, angular) {

  var app = angular.module('fireDeck');

  app.service('SlideService', function($q, SLIDES) {
    var ref = new Firebase(SLIDES);
    var slideService = {};

    slideService.get = function getSlide(id) {
      var deferred = $q.defer();
      ref.child(id).once('value', function(snapshot) {
        var value = snapshot.val();
        deferred.resolve(value);
      });
      return deferred.promise;
    };

    return slideService;
  });

}(window, angular));
