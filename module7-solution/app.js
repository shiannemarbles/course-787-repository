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
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    //implementation of the AlreadyBoughtController
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
    service.boughtItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    };

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
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

