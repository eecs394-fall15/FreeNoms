angular
  .module('event')
  .controller("NewController", function ($scope, Event, supersonic) {
    $scope.event = {};
    var hashMap = {"Tech" : "2145 Sheridan Road, Evanston, IL 60208", 
      "Ford" : "Ford Motor Company Engineering Design Center, Evanston, IL 60208",
      "Plex" : "Foster-Walker 1927 Orrington Ave Evanston, IL 60201",
      "Elder" : "  2400 Sheridan Rd, Evanston, IL 60201",
      "Allison" : "1820 Chicago Ave Evanston, IL 60201"
    //  "Lakefill"  
    };
    $scope.submitForm = function () {
    var location = document.getElementById('tags').value;
        $scope.event.Location = location; 
        $scope.event.Address = hashMap[location]; 
      $scope.showSpinner = true;
      newevent = new Event($scope.event);
      newevent.save().then( function () {
        supersonic.ui.modal.hide();
        $location = 'views/index.html';
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
