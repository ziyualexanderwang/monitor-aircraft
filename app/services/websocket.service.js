/* global angular */

(function() {
  'use strict';

  angular
    .module('appServices')
    .factory('websocketService', websocketService);

  websocketService.$inject = ['$websocket'];

  function websocketService($websocket) {
    var telemetry = [];
    var data = {
      state: 1,
      landing_gear: false,
      airspeed: {},
      altitude: {}, 
      flaps: {'width': '20px'}
    }
    var callback = null;

    var service = {
      initService: initService,
      getData: getData
    };

    return service;

    function initService(funcCall) {
      callback = funcCall;
      startWebsocket();
    }
    function getData() {
      return data;
    }

    function calcAirspeed() {
      var value = 0;
      var length = 0;
      var max = 0;
      var min = Infinity;

      var len = telemetry.length;
      for (var i = 0; i < len; i++) {
        if (telemetry[i].airspeed) {
          length++;
          value += telemetry[i].airspeed;
          max = Math.max(max, telemetry[i].airspeed);
          min = Math.min(min, telemetry[i].airspeed);
        }
      }
      data.airspeed.max = max;
      data.airspeed.min = min;
      data.airspeed.avg = value / length;
    }

    function calcAltitude() {
      var value = 0;
      var length = 0;
      var max = 0;
      var min = Infinity;

      var len = telemetry.length;
      for (var i = 0; i < len; i++) {
        if (telemetry[i].altitude) {
          length++;
          value += telemetry[i].altitude;
          max = Math.max(max, telemetry[i].altitude);
          min = Math.min(min, telemetry[i].altitude);
        }
      }
      data.altitude.max = max;
      data.altitude.min = min;
      data.altitude.avg = value / length;
    }

    function startWebsocket() {
      var ws = $websocket.$new({
        url: 'ws://localhost:12345',
        mock: {
          fixtures: {
            'airspeed': {
              data: {
                airspeed: 125
              }
            },
            'altitude': {
              data: {
                altitude: 3.8
              }
            },
            'landing_gear': {
              data: {
                type: 'landing_gear', 
                value: 1 
              }
            },
            'flaps': {
              data: {
                type: 'flaps', 
                value: 1
              }
            }
          }
        }
      });

      ws.$on('$open', function () {
        ws.$emit('an event', 'connected')
          .$emit('airspeed')
          .$emit('altitude')
          .$emit('landing_gear')
          .$emit('flaps');
      })
      .$on('an event', function (message) {
        data.state = 2;
        callback.call();
      })
      .$on('airspeed', function (message) {
        telemetry.push(message);
        calcAirspeed();
        data.airspeed.curr = message.airspeed;
        callback.call();
      })
      .$on('altitude', function (message) {
        telemetry.push(message);
        calcAltitude();
        data.altitude.curr = message.altitude;
        callback.call();
      })
      .$on('landing_gear', function (message) {
        data.landing_gear = Boolean(message.value)
        callback.call();
      })
      .$on('flaps', function (message) {
        data.flaps.width = (message.value + 1) * 20 + 'px';
        callback.call();
      });
    }
  }
})();
