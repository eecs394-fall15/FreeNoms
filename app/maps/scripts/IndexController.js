angular
  .module('maps')
  .controller('IndexController', function($scope, supersonic) {
    // Controller functionality here
        var map;
        $scope.eventsData = supersonic.data.model('Event');

        function callback(messageLabel) {
            return function(results, status){
                if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
                    var message = messageLabel; 
                    var contentWindow = new google.maps.InfoWindow({
                        content: message
                    });
            
                    var marker =  new google.maps.Marker({position: results[0].geometry.location, map : map});

                    marker.addListener('click', function(){
                        contentWindow.open(map, marker); 
                    }); 
                }
            }
        }
    
    $scope.$on('mapInitialized', function(event, eventMap) {
            map = eventMap;
            $scope.eventsData.findAll().then(function(allEvents){
                for (i = 0; i < allEvents.length; i++) {
                    var event = allEvents[i];
                    var geocoder = new google.maps.Geocoder(); 
    
                    var dateObj = new Date(event.Date);
                    if (!!dateObj.valueOf()){
                        var year = dateObj.getFullYear();
                        var month = dateObj.getMonth()+1; 
                        var day = dateObj.getDate(); 
                    }
                    var timeObj = new Date(event.StartTime); 
                    if (!!dateObj.valueOf()){
                        var hour = timeObj.getHours();
                        var minute = (timeObj.getMinutes() < 10 ? '0' : '')+timeObj.getMinutes();;
                        var time=hour+":"+minute+" AM";
                        if (hour > 12){
                            hour-=12; 
                            time=hour+":"+minute+" PM";
                        }
                    }
                    var message = "<b>"+event.Food+"</b><br>"+month+"/"+day+"/"+year+"<br>"+time+"<br>";
                    geocoder.geocode ( {"address": event.Location }, callback(message));
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
