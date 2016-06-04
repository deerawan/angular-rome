var angular = require('angular');

(function() {
  'use strict';

  angular
    .module('bgn.rome')
    .directive('rome', rome);

  rome.$inject = [];
  function rome() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
        bindToController: true,
        controller: RomeController,
        controllerAs: 'vm',
        link: link,
        restrict: 'A',
        scope: {
        }
    };
    return directive;

    function link(scope, element, attrs) {
    }
  }
  /* @ngInject */
  function RomeController () {

  }
})();