(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController ($scope) {
    $scope.lunchList = ""; //start off empty I assume
    $scope.message = ""; 
    

    $scope.checkLunch = function () {
      var lunchItems = $scope.lunchList.split(','); //split string by ,
      var numItems = lunchItems.length; //length of items in luncList
      console.log("numItems: " + numItems);
      
      if ($scope.lunchList.trim() === "") {
        $scope.message = "Please enter data first";
      } else if (numItems <= 3) {
        $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too much!";
      }
    };
  };
})();
