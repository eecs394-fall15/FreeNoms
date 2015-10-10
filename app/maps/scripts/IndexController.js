angular
  .module('maps')
  .controller('IndexController', function($scope, supersonic) {
    // Controller functionality here
        $scope.position = undefined;
        var map;
       
       $scope.getCurrentLocation = function(){
             supersonic.device.geolocation.getPosition()
            .then(function(position){
            $scope.position = position;
        });
           var location = ""+$scope.position.coords.latitude+", "+$scope.position.coords.longitude;
           return location;
    };
    
    
			$scope.$on('mapInitialized', function(event, eventMap) {
                
            map = eventMap;
            var message = "message here";
            var contentWindow = new google.maps.InfoWindow({
                content: message
            });
                var eventLocation = new google.maps.LatLng(parseFloat(42.056459), parseFloat(-87.675267)); 
                var marker = new google.maps.Marker({position: eventLocation, map : map});
                
                (function (_contentWindow){
                    marker.addListener('click', function(){
                        _contentWindow.open(map, this); 
                    });
                })(contentWindow);
			});
  });
