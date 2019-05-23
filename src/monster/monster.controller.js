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

  monsterController.easyComplexity = 1;

  monsterController.advancedComplexity={
    complexity:10,
    monstersNum: 2,
    operations: [
      {code: "+", value: "+", selected: true, available:true},
      {code: "-", value: "-", selected: true, available:true},
      {code: "*", value: "*", selected: false, available:true},
      {code: ":", value: ":", selected: false, available:true}
    ]};

  monsterController.equations=[];

  monsterController.resultEquations="";

  monsterController.errorMessage="";

  monsterController.changeComplexity = function ()
  {
    switch (monsterController.easyComplexity)
    {
      case ('1'): // easy, addition and substraction 0-10
        monsterController.advancedComplexity.complexity=10;

        for (var i=0; i<monsterController.advancedComplexity.operations.length; i++)
        {
          if ((monsterController.advancedComplexity.operations[i].value==="*") ||
              (monsterController.advancedComplexity.operations[i].value===":"))
          {
            monsterController.advancedComplexity.operations[i].selected = false;
          }

          if ((monsterController.advancedComplexity.operations[i].value==="+") ||
              (monsterController.advancedComplexity.operations[i].value==="-"))
          {
            monsterController.advancedComplexity.operations[i].selected = true;
          }
        }
        monsterController.generationAllowed=true;
        monsterController.errorMessage="";
        break;

      case ('2'): //moderate, addition and substraction up to 25
        monsterController.advancedComplexity.complexity=25;

        for (var i=0; i< monsterController.advancedComplexity.operations.length; i++)
        {
          if (( monsterController.advancedComplexity.operations[i].value==="*") ||
              ( monsterController.advancedComplexity.operations[i].value===":"))
          {
            monsterController.advancedComplexity.operations[i].selected = false;
          }

          if (( monsterController.advancedComplexity.operations[i].value==="+") ||
              ( monsterController.advancedComplexity.operations[i].value==="-"))
          {
            monsterController.advancedComplexity.operations[i].selected = true;
          }
        }
        monsterController.generationAllowed=true;
        monsterController.errorMessage="";
        break;

      case ('3'): // hard, all arithmetic operations, up to 25
        monsterController.advancedComplexity.complexity=25;
        for (var i=0; i< monsterController.advancedComplexity.operations.length; i++)
        {
          monsterController.advancedComplexity.operations[i].selected = true;
        }
        monsterController.generationAllowed=true;
        monsterController.errorMessage="";
        break;

      case ('100'): // custom selection
        if (Number( monsterController.advancedComplexity.complexity)===10)
        {
          monsterController.advancedComplexity.fieldSize=5;
          for (var i=0; i<monsterController.advancedComplexity.operations.length; i++)
          {
            if (( monsterController.advancedComplexity.operations[i].value==="*") ||
                ( monsterController.advancedComplexity.operations[i].value===":"))
            {
              monsterController.advancedComplexity.operations[i].available = false;
              monsterController.advancedComplexity.operations[i].selected = false;
            }
          }

        }
        if (Number( monsterController.advancedComplexity.complexity)===25)
        {
          monsterController.advancedComplexity.fieldSize=10;
          for (var i=0; i< monsterController.advancedComplexity.operations.length; i++)
          {
            if (( monsterController.advancedComplexity.operations[i].value==="*") ||
                ( monsterController.advancedComplexity.operations[i].value===":"))
            {
              monsterController.advancedComplexity.operations[i].available = true;
            }
          }
        }
        monsterController.alterOperations();

        break;
    }

  };

  monsterController.alterOperations = function()
  {
    var operationSelected = false;
    for (var i = 0; i < monsterController.advancedComplexity.operations.length; i++)
    {
      if (monsterController.advancedComplexity.operations[i].selected)
      {
        operationSelected = true;
      }
    }

    if (operationSelected === false)
    {
      monsterController.generationAllowed=false;

      var pr = StringUtilService.requestTranslation("noOperationsMessage");
      pr.then(function(result)
      {
        monsterController.errorMessage=StringUtilService.translationsObject.noOperationsMessage;
      }, function (error){
        console.log(error);
      });

    } else
    {
      monsterController.generationAllowed=true;
      monsterController.errorMessage="";
    }
  };


  monsterController.createEquations = function ()
  {
    console.log("Creating equations");
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

    var prom = MonsterGeneratorService.createEquations(selectedOps, monsterController.complexity);

    prom.then(function (result)
    {
      console.log(result);
      for (var equation of result) {
        monsterController.resultEquations+=equation.print()+ " \n";
      }
    }, function (error) {
      console.log("monster equations promise not returned");
      console.log(error);
    });
  }

  monsterController.alterOperations = function () {
    console.log("altering ops");
  }
}
})();
