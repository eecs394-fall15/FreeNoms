angular
  .module('event')
  .controller("NewController", function ($scope, Event, supersonic) {
    $scope.event = {};
    var hashMap = {"Tech" : "2145 Sheridan Road, Evanston, IL 60208", 
      "Ford" : "Ford Motor Company Engineering Design Center, Evanston, IL 60208",
      "Plex" : "Foster-Walker 1927 Orrington Ave Evanston, IL 60201",
      "Elder" : "  2400 Sheridan Rd, Evanston, IL 60201",
      "Allison" : "1820 Chicago Ave Evanston, IL 60201",
      "Annenberg" : "2120 Campus Drive Evanston, IL 60208",
      "Annie May Swift": "1920 Campus Drive Evanston, IL 60208", 
      "Deering Library": "1937 Sheridan Road Evanston, IL 60208", 
      "Deering Meadow": "1937 Sheridan Road Evanston, IL 60201", 
      "Fisk": "1845 Sheridan Road Evanston, IL 60208", 
      "Frances Searle":"2240 Campus Drive Evanston, IL 60208", 
      "Harris Hall":"1881 Sheridan Road Evanston, IL 60208", 
      "Locy Hall": "1850 Campus Drive Evanston, IL 60208", 
      "Lunt":"2033 Sheridan Road Evanston, IL 60208", 
      "Pick-Staiger":"50 Arts Circle Drive Evanston, IL 60208", 
      "Sargent":"2245 Sheridan Road Evanston, IL 60201",
      "Silverman":"2170 Campus Drive Evanston, IL 60208", 
      "The Rock":"1897 Sheridan Road Evanston, IL 60208", 
      "University Library":"1970 Campus Drive Evanston, IL 60208",
      "University Hall": "1897 Sheridan Road Evanston, IL 60208"              
    //  "Lakefill"  
    };
    $scope.checkForm = function () {
        var errors = 0;
        var message="";
        if (!$scope.event['Food']) {
            message+="\nFood";
            errors++;
        }
        if (!$scope.event['StartTime']){
           message+="\nStart Time";
            errors++;
        }
        if (!$scope.event['Date']){
           message+="\nDate";
            errors++;
        }
        if (document.getElementById('tags').value == ""){
            message+="\nLocation";
            errors++;
        }
        if (errors > 0){
         var errorMessage="Missing the following required fields:"+ message;
         supersonic.ui.dialog.alert(errorMessage); 
        }
        else {
           $scope.submitForm();
        }
    }
    
    $scope.submitForm = function () {
    var location = document.getElementById('tags').value;
        $scope.event.Location = location; 
        $scope.event.Address = hashMap[location]; 
      $scope.showSpinner = true;
      newevent = new Event($scope.event);
      newevent.save().then( function () {
        supersonic.ui.modal.hide();
        supersonic.ui.layers.pop()
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
