/* global angular */

(function() {
  'use strict';

  angular
    .module('appControllers')
    .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$scope', 'websocketService', 'canvasSpeedService', 'canvasAltitudeService'];

  /* @ngInject */
  function DashboardCtrl($scope, websocketService, canvasSpeedService, canvasAltitudeService) {
    /* jshint validthis: true */
    var vm = this;

    vm.data = websocketService.getData();

    init();
    // //////////////////

    function init() {
      websocketService.initService(getUpdate);
    }

    function getUpdate() {
      $scope.$apply(function() {
        if (vm.data.airspeed.curr) {
          canvasSpeedService.drawScene(vm.data.airspeed.curr);
        }
        if (vm.data.altitude.curr) {
          canvasAltitudeService.drawScene(vm.data.altitude.curr);
        }
      });
    }
  }
})();
