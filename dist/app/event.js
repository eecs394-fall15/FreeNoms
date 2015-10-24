angular.module('event', [
  /* Declare any module-specific dependencies here */
  'common'
]);
angular
  .module('event')
  .controller("EditController", function ($scope, Event, supersonic) {
    $scope.event = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Event.find(steroids.view.params.id).then( function (event) {
      $scope.$apply(function() {
        $scope.event = event;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.event.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });

angular
  .module('event')
  .controller("EventMapController", function ($scope, Event, supersonic) {
    $scope.events = null;
    $scope.showSpinner = true;

    Event.all().whenChanged( function (events) {
        $scope.$apply( function () {
          $scope.events = events;
          $scope.showSpinner = false;
        });
    });
  });

angular
  .module('event')
  .constant('Event', supersonic.data.model('Event'));
angular
  .module('event')
  .controller("IndexController", function ($scope, Event, supersonic) {
    $scope.events = null;
    $scope.showSpinner = true;

    Event.all().whenChanged( function (events) {
        $scope.$apply( function () {
          $scope.events = events;
          $scope.showSpinner = false;
        });
    });
  });
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
        window.open('index.html','_self');
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });

angular
  .module('event')
  .controller("ShowController", function ($scope, Event, supersonic) {
    $scope.event = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;
    
    $scope.loadGoogleMaps = function(){
        var link = "https://www.google.com/maps/place/" + $scope.event.Address.replace(/\s/g,"+");
        return link;
    }

    var _refreshViewData = function () {
      Event.find($scope.dataId).then( function (event) {
        $scope.$apply( function () {
          $scope.event = event;
          $scope.showSpinner = false;
        });
      });
    }

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.event.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });
