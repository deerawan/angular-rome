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
        initialValue: attrs.ngModel,
        time: attrs.time === 'true',
        inputFormat: attrs.inputFormat
      };

      var inputElement = element.find('input')[0];
      var romeElement = rome(inputElement, romeConfig);

      ngModelCtrl.$formatters.push(function(modelValue) {
        return {
          date: modelValue
        }
      });

      ngModelCtrl.$render = function() {
        inputElement.value = moment(ngModelCtrl.$viewValue.date).format(attrs.inputFormat);
      };

      ngModelCtrl.$parsers.push(function(viewValue) {
        var test =  moment(viewValue.date, attrs.inputFormat).format('YYYY-MM-DD');
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