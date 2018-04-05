/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.components.mail', [])
    .config(routeConfig)
    .run(["$rootScope", function($rootScope) {
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
  function routeConfig($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('components.mail', {
          url: '/mail',
          abstract: true,
          templateUrl: 'app/pages/components/mail/mail.html',
          controller: "MailTabCtrl",
          controllerAs: "tabCtrl",
          title: 'Mail',
          sidebarMeta: {
            order: 0,
          },
        }).state('components.mail.label', {
          url: '/:label',
          templateUrl: 'app/pages/components/mail/list/mailList.html',
          title: 'Mail',
          controller: "MailListCtrl",
          controllerAs: "listCtrl"
        }).state('components.mail.detail', {
          url: '/:label/:id',
          templateUrl: 'app/pages/components/mail/detail/mailDetail.html',
          title: 'Mail',
          controller: "MailDetailCtrl",
          controllerAs: "detailCtrl"
        });
    $urlRouterProvider.when('/components/mail','/components/mail/inbox');
  }

})();
