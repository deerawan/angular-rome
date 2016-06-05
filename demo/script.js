(function() {
'use strict';

  angular
    .module('romeDemo', ['bgn.rome'])
    .controller('RomeDemoController', RomeDemoController);

  function RomeDemoController() {
    var vm = this;
    vm.myDate = new Date();
    vm.dateInputFormat = new Date();
  }
})();