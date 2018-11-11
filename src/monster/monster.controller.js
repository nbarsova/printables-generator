(function () {
"use strict";

angular.module('RechnenRucksack')
  .controller('MonsterController', MonsterController);

MonsterController.$inject =
  ['$q', '$translate',
  'EquationsGeneratorService',
  'PrintService',
  'HTMLService','$rootScope', 'StringUtilService'];

function MonsterController
    ($q, $translate,
      EquationsGeneratorService,
      PrintService,
      HTMLService, $rootScope, StringUtilService)
{

}
})();
