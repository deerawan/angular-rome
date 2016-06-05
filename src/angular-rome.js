var rome = require('rome');
var moment = require('moment');

(function() {
  'use strict';

  angular
    .module('bgn.rome', [])
    .directive('rome', romeDirective);

  romeDirective.$inject = [];
  function romeDirective() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
        bindToController: true,
        controller: RomeController,
        controllerAs: 'vm',
        require: 'ngModel',
        link: link,
        restrict: 'E',
        scope: {
        },
        template: '<input type="text" />'
    };
    return directive;

    function link(scope, element, attrs, ngModelCtrl) {
      var romeConfig = {
        initialValue: ngModelCtrl.$modelValue.value
      };

      if (attrs.initialValue) {
        romeConfig.initialValue = attrs.initialValue;
      }

      if (attrs.time) {
        romeConfig.time = attrs.time === 'true';
      }

      if (attrs.date) {
        romeConfig.date = attrs.date === 'true';
      }

      if (attrs.inputFormat) {
        romeConfig.inputFormat = attrs.inputFormat;
      }

      if (attrs.weekStart) {
        romeConfig.weekStart = Number(attrs.weekStart);
      }

      if (attrs.monthsInCalendar) {
        romeConfig.monthsInCalendar = Number(attrs.monthsInCalendar);
      }

      if (attrs.min) {
        romeConfig.min = attrs.min;
      }

      if (attrs.max) {
        romeConfig.max = attrs.max;
      }

      var inputElement = element.find('input')[0];
      var romeElement = rome(inputElement, romeConfig);

      ngModelCtrl.$formatters.push(function(modelValue) {
        return {
          date: modelValue
        }
      });

      ngModelCtrl.$render = function() {
        inputElement.value = romeElement.getDateString();
      };

      ngModelCtrl.$parsers.push(function(viewValue) {
        var test =  romeElement.getDate();
        console.log(test);
        return test;
      });

      romeElement.on('data', function (value) {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue({
            date: value
          });
          inputElement.value = value;
        });
      });
    }
  }
  /* @ngInject */
  function RomeController () {

  }
})();