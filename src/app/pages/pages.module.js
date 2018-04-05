/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.ui',
    'BlurAdmin.pages.components',
    'BlurAdmin.pages.form',
    'BlurAdmin.pages.tables',
    'BlurAdmin.pages.charts',
    'BlurAdmin.pages.maps',
    'BlurAdmin.pages.profile',
  ])
      .config(routeConfig).run(["$rootScope", function($rootScope) {
        var hadRouteChange = false;

        $rootScope.$on("$routeChangeStart", function() {
            hadRouteChange = true;
        });
        // The following listener is required if you're using ui-router
        $rootScope.$on("$stateChangeStart", function() {
            hadRouteChange = true;
        });

        function hookAngularBoomerang() {
            if (window.BOOMR && BOOMR.version) {
                if (BOOMR.plugins && BOOMR.plugins.Angular) {
                    BOOMR.plugins.Angular.hook($rootScope, hadRouteChange);
                }
                return true;
            }
        }

        if (!hookAngularBoomerang()) {
            if (document.addEventListener) {
                document.addEventListener("onBoomerangLoaded", hookAngularBoomerang);
            } else if (document.attachEvent) {
                document.attachEvent("onpropertychange", function(e) {
                    e = e || window.event;
                    if (e && e.propertyName === "onBoomerangLoaded") {
                        hookAngularBoomerang();
                    }
                });
            }
        }
    }]);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/dashboard');

    baSidebarServiceProvider.addStaticItem({
      title: 'Pages',
      icon: 'ion-document',
      subMenu: [{
        title: 'Sign In',
        fixedHref: 'auth.html',
        blank: true
      }, {
        title: 'Sign Up',
        fixedHref: 'reg.html',
        blank: true
      }, {
        title: 'User Profile',
        stateRef: 'profile'
      }, {
        title: '404 Page',
        fixedHref: '404.html',
        blank: true
      }]
    });
    baSidebarServiceProvider.addStaticItem({
      title: 'Menu Level 1',
      icon: 'ion-ios-more',
      subMenu: [{
        title: 'Menu Level 1.1',
        disabled: true
      }, {
        title: 'Menu Level 1.2',
        subMenu: [{
          title: 'Menu Level 1.2.1',
          disabled: true
        }]
      }]
    });
  }

})();
