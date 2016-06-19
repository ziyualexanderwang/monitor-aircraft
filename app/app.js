/* global angular */

(function() {
  'use strict';

  /* App Module */

  angular
    .module('app', [
      'ngRoute',
      'ngWebsocket',
      'appControllers',
      'appServices'
    ]);

  angular
    .module('appServices', [
      'ngResource'
    ]);

  angular.module('appControllers', []);
})();

