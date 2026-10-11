(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController ($scope) {
    $scope.name = "Shianne"; //testing scope vars
    $scope.lunchList = ""; //start off empty I assume
    $scope.message = ""; //
    //console.log($scope.name)

    $scope.checkLunch = function () {
      console.log("checkLunch() called");
      var lunchItems = $scope.lunchList.split(','); //split string by ,
      var numItems = lunchItems.length; //length of items in luncList
      console.log("numItems: " + numItems);
      
      if ($scope.lunchList.trim() === "") {
        $scope.message = "Please enter data first";
        console.log("Please enter data first");
      } else if (numItems <= 3) {
        $scope.message = "Enjoy!";
        console.log("Enjoy!");
      } else {
        $scope.message = "Too much!";
        console.log("Too much!");
      }
    };
  };
//  Please make sure to put a comment 
//  somewhere next to the input textbox 
//  stating that you do NOT consider an 
//  empty item, i.e., , , as an item towards to the count

})();
