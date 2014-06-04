// not actually an angular module

(function(window, angular) {

  window.ngHack = function(params) {

    var codeRef = new Firebase(params.fbUrl);
    var providers = {};
    angular.module(params.moduleName, [], function($controllerProvider, $compileProvider, $provide) {
        providers = {
            $controllerProvider: $controllerProvider,
            $compileProvider: $compileProvider,
            $provide: $provide
        };
    });

    codeRef.on('value', function(snapshot) {

      eval(snapshot.val());
      angular.bootstrap($('body'), [params.moduleName]);

      // Store our _invokeQueue length before loading our controllers/directives/services
      // This is just so we don't re-register anything
      var queueLen = angular.module(params.moduleName)._invokeQueue.length;

      //Load html file with content which uses above content
      var htmlFile = $.get(params.templateUrl, function(data) {
        $(data).appendTo('body');

        // Register the controls/directives/services we just loaded
        var queue = angular.module(params.moduleName)._invokeQueue;
        for(var i=queueLen;i<queue.length;i++) {
            var call = queue[i];
            // call is in the form [providerName, providerFunc, providerArguments]
            var provider = providers[call[0]];
            if(provider) {
                // e.g. $controllerProvider.register("Ctrl", function() { ... })
                provider[call[1]].apply(provider, call[2]);
            }
        }

        // compile the new element
        $('body').injector().invoke(function($compile, $rootScope) {
            $compile($('#ctrl'))($rootScope);
            $rootScope.$apply();
        });

      });
    });

  };

}(window, angular));
