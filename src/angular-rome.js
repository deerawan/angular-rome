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
      var inputElement = element.find('input');
      var input = element.find('input')[0];

      addNonDirectiveAttributes(attrs, element, inputElement);

      var romeConfig = {};

      if (attrs.initialValue) { romeConfig.initialValue = attrs.initialValue; }
      if (attrs.time) { romeConfig.time = attrs.time === 'true'; }
      if (attrs.date) { romeConfig.date = attrs.date === 'true'; }
      if (attrs.inputFormat) { romeConfig.inputFormat = attrs.inputFormat; }
      if (attrs.weekStart) { romeConfig.weekStart = Number(attrs.weekStart); }
      if (attrs.monthsInCalendar) { romeConfig.monthsInCalendar = Number(attrs.monthsInCalendar); }
      if (attrs.min) { romeConfig.min = attrs.min; }
      if (attrs.max) { romeConfig.max = attrs.max; }
      if (attrs.dayFormat) { romeConfig.dayFormat = attrs.dayFormat; }
      if (attrs.weekdayFormat) { romeConfig.weekdayFormat = attrs.weekdayFormat; }
      if (attrs.styles) { romeConfig.styles = JSON.parse(attrs.styles); }
      if (attrs.timeInterval) { romeConfig.timeInterval = Number(attrs.timeInterval); }
      if (attrs.autoHideOnBlur) { romeConfig.autoHideOnBlur = attrs.autoHideOnBlur === 'true'; }
      if (attrs.autoClose) { romeConfig.autoClose = attrs.autoClose === 'true'; }

      if (attrs.beforeEq) {
        var beforeElement = document.getElementById(attrs.beforeEq);
        romeConfig.dateValidator = rome.val.beforeEq(beforeElement);
      }

      if (attrs.before) {
        var beforeElement = document.getElementById(attrs.before);
        romeConfig.dateValidator = rome.val.after(beforeElement);
      }

      if (attrs.afterEq) {
        var afterElement = document.getElementById(attrs.afterEq);
        romeConfig.dateValidator = rome.val.afterEq(afterElement);
      }

      if (attrs.after) {
        var afterElement = document.getElementById(attrs.after);
        romeConfig.dateValidator = rome.val.after(afterElement);
      }

      var romeElement = rome(input, romeConfig);

      ngModelCtrl.$formatters.push(function(modelValue) {
        if (modelValue) {
          input.value = romeElement.setValue(modelValue);
        }
      });

      ngModelCtrl.$render = function() {
        input.value = romeElement.getDateString();
      };

      ngModelCtrl.$parsers.push(function(viewValue) {
        return romeElement.getDate();
      });

      romeElement.on('data', function (value) {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue({
            date: value
          });
          input.value = value;
        });
      });

      function addNonDirectiveAttributes(attrs, directiveElement, inputElement) {
        angular.forEach({
          'id': attrs.id
        }, function (value, name) {
          if (angular.isDefined(value)) {
            directiveElement.removeAttr(name);
            inputElement.attr(name, value);
          }
        });
      }
    }
  }
})();