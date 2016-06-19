/* global angular */

(function() {
  'use strict';

  angular
    .module('appServices')
    .factory('canvasSpeedService', canvasSpeedService);

  canvasSpeedService.$inject = ['$resource'];

  /* @ngInject */
  function canvasSpeedService($resource) {
    var canvas = null;
    var ctx;
    var radius;
    var maxSpeed = 500;

    return {
      drawScene: drawScene
    };

    function init() {
      if (!canvas) {
        canvas = document.getElementById("canvas-speed");
        ctx = canvas.getContext("2d");
        radius = canvas.height / 2;
        ctx.translate(radius, radius);
        radius = radius * 0.90;
      }
    }

    function clear() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    function drawScene(value) {
      init();
      clear();
      drawPanel(value);
    }

    function drawPanel(value) {
      ctx.save();
      var theta = (value - 125) * 2 * Math.PI / maxSpeed;
      ctx.rotate(theta);
      ctx.beginPath();
      ctx.moveTo(0, -5);
      ctx.lineTo(0, 5);
      ctx.lineTo(radius * 0.7, 1);
      ctx.lineTo(radius * 0.7, -1);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
      ctx.fillStyle = '#9c9c9c';
      ctx.fill();
      ctx.restore();
    }
  }
})();

