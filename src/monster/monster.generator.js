(function () {
"use strict";

angular.module('RechnenRucksack')
  .service('MonsterGeneratorService', MonsterGeneratorService);

MonsterGeneratorService.$inject = ['$q', 'ArithmeticService'];

function MonsterGeneratorService($q, ArithmeticService) {

  var service = this;

  service.createEquations = function (operations, complexity) {
    var deferred = $q.defer();

    let bottomRight = ArithmeticService.normalRandom(0, complexity);
    console.log("Bottom right number is "+bottomRight);

    let bottom = ArithmeticService.buildUniqueEquationObject(bottomRight, '+', 100);
    let right = ArithmeticService.buildUniqueEquationObject(bottomRight, '-', 100);

    let topRight = right.number1;
    console.log("Right equation", right);
    let bottomLeft = bottom.number1;
    console.log("Bottom equations", bottom);

    let top = ArithmeticService.buildUniqueEquationObject(topRight, '+', 100);
    let left = ArithmeticService.buildUniqueEquationObject(bottomLeft, '+', 100);

    deferred.resolve([top, right, bottom, left]);

    return deferred.promise;
  }

}
})();
