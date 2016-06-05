(function() {
'use strict';

  angular
    .module('angular2romeDemo')
    .controller('RomeDemoController', RomeDemoController);

  RomeDemoController.$inject = ['bgn.rome'];
  function RomeDemoController() {
    var vm = this;
  }
})();