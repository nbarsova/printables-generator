(function () {
"use strict";

angular.module('RechnenRucksack')
  .controller('MonsterController', MonsterController);

MonsterController.$inject =
  ['$q', '$translate',
  'MonsterGeneratorService',
  'PrintService',
  'HTMLService','$rootScope', 'StringUtilService'];

function MonsterController
    ($q, $translate,
      MonsterGeneratorService,
      PrintService,
      HTMLService, $rootScope, StringUtilService)
{
  var monsterController = this;

  monsterController.complexity=10;

  monsterController.equations=[];

  monsterController.monstersNum =2;

  monsterController.operations = [
  {code: "+", value: "+", selected: true, available:true},
  {code: "-", value: "-", selected: true, available:true},
  {code: "*", value: "*", selected: false, available:true},
  {code: ":", value: ":", selected: false, available:true}
];

  monsterController.createEquations = function ()
  {

    var selectedOps=[];
    for (var i = 0; i < monsterController.operations.length; i++)
    {
    if (monsterController.operations[i].selected)
      {
        selectedOps.push(monsterController.operations[i].code);
      }
    }

    if (selectedOps.length===0)
    {
      var errorPr = $translate("noOperationsMessage").then(function (result) {
        monsterController.errorMessage = result;
      });
      monsterController.generationEnabled=false;
    } else {
      monsterController.errorMessage="";
      monsterController.generationEnabled=true;
    }

    var prom = MonsterGeneratorService.createEquations(selectedOps);

    prom.then(function (result)
    {
      console.log(result);
    }, function (error) {
      console.log("monster equations promise not returned");
      console.log(errorResponse);
    });
  }
}
})();
