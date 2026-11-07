(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)

    NarrowItDownController.$inject = ['MenuSearchService']; 
    function NarrowItDownController(MenuSearchService) {
        var narrowItDown = this;
        narrowItDown.searchTerm = "";  //actual user input
        narrowItDown.found = []; //found array 

        //search function
        narrowItDown.search = function() {
            //call MenuSearchService.getMatchedMenuItems()
            var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);

            //wait for promise using .then()
            promise.then(function(response){
                //store returned results in narrowItDown.found
                narrowItDown.found = response;
            });
        };
    }

    //custom Menu Search service
    function MenuSearchService($http) {
        var menuService = this;

        //getMatchedMenuItems megthod
        menuService.getMatchedMenuItems = function(searchTerm){
            //reach out to server
            return $http({
                method: "GET",
                url: ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json")
            }).then(function(result) {
                //process result and only keep items that match 
                var foundItems = []; 

                //Loop through result.data
                for(var i = 0; i < result.data.length; i++){
                    //Get the current item's description
                    var desc = result.data[i].description; 

                    //Check if description contains searchTerm
                    if(desc.toLowerCase().includes(searchTerm.toLowerCase())){
                        //Add matching item to foundItems
                        foundItems.push(result.data[i]); 
                    }
                    
                }
                //return processed items
                return foundItems;

            });

        }; //getMatchedMenuItems END


    }


})();