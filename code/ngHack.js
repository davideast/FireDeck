// not actually an angular module

(function(window, angular) {

  window.ngHack = function(params) {

    var codeRef = new Firebase(params.fbUrl);

    codeRef.on('value', function(snapshot) {

      // add the code to the page
      eval(snapshot.val());

      // bootstrap the app
      angular.bootstrap($('body'), [params.moduleName]);

      // Load html file
      $.get(params.templateUrl, function(data) {
        $(data).appendTo('body');

        // compile the new page
        $('body').injector().invoke(function($compile, $rootScope) {
            $compile($('#ctrl'))($rootScope);
            $rootScope.$apply();
        });

      });

    });

  };

}(window, angular));
