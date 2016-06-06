(function() {
'use strict';

  angular
    .module('romeDemo', ['bgn.rome'])
    .controller('RomeDemoController', RomeDemoController);

  function RomeDemoController() {
    var vm = this;
    vm.myDate = new Date();
    vm.dateInputFormat = new Date('2015-05-05');
    vm.dateExistingModel = new Date('2015-01-01');
    vm.dateNgChanged = new Date('2016-01-01');
    vm.customStyle = {
      container: 'rd-container green-container'
    };

    vm.updateDate = function() {
      vm.dateTimeNgChanged = new Date().toISOString();
      console.log('update');
    }

    vm.inputFormat = 'D/MM/YYYY';
  }
})();