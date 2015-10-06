angular
  .module('maps')
  .controller('IndexController', function($scope, supersonic) {
    // Controller functionality here
          $scope.position = undefined; 
       
       $scope.getCurrentLocation = function(){
        supersonic.device.geolocation.getPosition()
        .then(function(position){
            $scope.position = position;
        });
           var location = ""+$scope.position.coords.latitude+", "+$scope.position.coords.longitude;
           return location;
    };
			$scope.$on('mapInitialized', function(event, map) {
               
			
			})
  });
