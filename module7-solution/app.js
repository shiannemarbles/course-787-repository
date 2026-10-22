(function () {
  'use strict';
  
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService)

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    //implementation of the ToBuyController
    var toBuy = this;

    toBuy.ToBuyList = ShoppingListCheckOffService.getBuyItems();

    toBuy.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    //implementation of the AlreadyBoughtController
    var alreadyBought = this;

    alreadyBought.BoughtList = ShoppingListCheckOffService.getBoughtItems();
  }

  //custom service ShoppingListCheckOffService
  function ShoppingListCheckOffService() {
    var service = this;

    //arrays
    //starting list
    var ToBuyList = [
      {
        name: "Milk",
        quantity: "2"
      },
      {
        name: "Egg",
        quantity: "25"
      },
      {
        name: "Cookie",
        quantity: "300"
      },
      {
        name: "Bread",
        quantity: "4"
      },
      {
        name: "Chocolate",
        quantity: "5"
      }
    ];

    //items to be bught 
    var BoughtList = [];

    //service methods

    //buying item (remove and add)
    service.buyItem = function (itemIndex) {
      //remoce the item and grab the first element of the splice array
      var item = ToBuyList.splice(itemIndex, 1)[0];
      //push to bought
      BoughtList.push(item); 

    };

    //displaying
    service.getBuyItems = function () {
      return ToBuyList;
    };

    service.getBoughtItems = function () {
      return BoughtList;
    };
  }

})();

