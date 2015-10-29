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
                    var today = false; 
                    if (dateObj.valueOf()){
                        var todayObj = new Date(); 
                        var year = dateObj.getFullYear();
                        var month = dateObj.getMonth()+1; 
                        var day = dateObj.getDate(); 
                        today = (year == todayObj.getFullYear()) && (month == (todayObj.getMonth()+1)) && (day == todayObj.getDate()); 
                    }
                    
                    if (event['Address'] && today){
                    var timeObj = new Date(event.StartTime); 
                    if (dateObj.valueOf()){
                        var hour = timeObj.getHours();
                        var minute = (timeObj.getMinutes() < 10 ? '0' : '')+timeObj.getMinutes();;
                        var time=hour+":"+minute+" AM";
                        if (hour > 12){
                            hour-=12; 
                            time=hour+":"+minute+" PM";
                        }
                    }

                    var message;
                    if (event.Room == undefined){
                        message = "<b>"+event.Food+"</b><br>"+month+"/"+day+"/"+year+"<br>"+time+ "<br>"+  event.Location;
                    }
                    else{
                        message = "<b>"+event.Food+"</b><br>"+month+"/"+day+"/"+year+"<br>"+time+ "<br>"+event.Location+ " " + event.Room;
                    }

                    geocoder.geocode ( {"address": event.Address }, callback(message));
                }
                }
            }); 
            supersonic.device.geolocation.getPosition().then(function(currposition){
                     var image = "/icons/me_icon.png";
                    var currentLocation = new google.maps.LatLng(currposition.coords.latitude, currposition.coords.longitude);
                    var marker = new google.maps.Marker({position: currentLocation, map : map, icon: image, animation: google.maps.Animation.DROP});
                    map.setCenter(currentLocation); 
            }); 
			});
  });

