/* global angular */

(function() {
  'use strict';

  /* App Config */

  angular
    .module('app')
    .config([
      '$routeProvider',
      config
    ]);

  function config($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/dashboard'
      });
  }
})();

