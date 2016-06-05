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
      var element = element.find('input');
      var inputElement = element[0];
      console.log(element);

      var romeElement = rome(element[0], { time: false });

      var dateFormat = 'D-MM-YYYY';

      ngModelCtrl.$formatters.push(function(modelValue) {
        console.log(modelValue);
        return {
          date: '2015-05-05'
        };
      });

      ngModelCtrl.$render = function() {
        // scope.date = moment(ngModelCtrl.$viewValue.date).format(dateFormat);
        inputElement.value = moment(ngModelCtrl.$viewValue.date).format(dateFormat);
      };

      ngModelCtrl.$parsers.push(function(viewValue) {
        var test =  moment(viewValue.date, dateFormat).format('YYYY-MM-DD');
        console.log(test);
        return test;
      });

      romeElement.on('data', function (value) {
        scope.$apply(function () {
          // scope.ngModel = value;
          // formatDate();
          var gila = moment(value).format(dateFormat);
          console.log(gila);
          ngModelCtrl.$setViewValue({
            date: gila
          });
          // ngModelCtrl.$render();
          // scope.date = gila;
          inputElement.value = gila;
        });
      });
    }
  }
  /* @ngInject */
  function RomeController () {

  }
})();