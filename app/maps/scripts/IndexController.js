angular
  .module('maps')
  .controller('IndexController', function($scope, supersonic) {
    // Controller functionality here
        var map;
        $scope.eventsData = supersonic.data.model('Event'); 
    
    $scope.$on('mapInitialized', function(event, eventMap) {
            map = eventMap;
            $scope.eventsData.findAll().then(function(allEvents){
                for (i = 0; i < allEvents.length; i++) {
                    var event = allEvents[i];
                    var geocoder = new google.maps.Geocoder(); 
                    var address = event.Location; 
    
                    geocoder.geocode ( {"address": address }, function(results, status){
                        if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
                            var message = event.Food; 
                            var contentWindow = new google.maps.InfoWindow({
                        content: message
                    });
                            var marker =  new google.maps.Marker({position: results[0].geometry.location, map : map});

                            marker.addListener('click', function(){
                            contentWindow.open(map, marker); 
                        }); 
                                   }
                                  });
                }
                }); 
                supersonic.device.geolocation.getPosition().then(function(currposition){
                        var image = "/icons/current_marker.png";
                        var currentLocation = new google.maps.LatLng(currposition.coords.latitude, currposition.coords.longitude);
                   // var marker = new google.maps.Marker({position: currentLocation, map : map});
                        var marker = new google.maps.Marker({position: currentLocation, map : map, icon: image});
                     //   map.panTo(currentLocation); 
                }); 
			});
  });