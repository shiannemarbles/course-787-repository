(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems',FoundItemsDirective);

    //found items directive
    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
                hasSearched: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    }

    //found items directive controller
    function FoundItemsDirectiveController() {
        var list = this;
    }

    //narrowdown controller
    NarrowItDownController.$inject = ['MenuSearchService']; 
    function NarrowItDownController(MenuSearchService) {
        var narrowItDown = this;
        narrowItDown.searchTerm = "";  //actual user input
        narrowItDown.found = []; //found array 
        narrowItDown.hasSearched = false; //for tracking 

        //search function
        narrowItDown.search = function() {

            narrowItDown.hasSearched = true; // user has started search
            //call MenuSearchService.getMatchedMenuItems()
            var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);

            //wait for promise using .then()
            promise.then(function(response){
                //store returned results in narrowItDown.found
                narrowItDown.found = response;
            });
        };

        //removal function
        narrowItDown.removeItem = function(index) {
            narrowItDown.found.splice(index, 1);
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