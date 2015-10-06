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

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newevent = new Event($scope.event);
      newevent.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });

var app = angular.module('mgcrea.ngStrapDocs', ['ngAnimate', 'ngSanitize', 'mgcrea.ngStrap']);

app.controller('MainCtrl', function($scope) {
});

'use strict';

angular.module('mgcrea.ngStrapDocs')

.controller('TimepickerDemoCtrl', function($scope, $http) {
  $scope.time = new Date(1970, 0, 1, 10, 30, 40);
  $scope.selectedTimeAsNumber = 10 * 36e5 + 30 * 6e4 + 40 * 1e3;
  $scope.selectedTimeAsString = '10:00';
  $scope.sharedDate = new Date(new Date().setMinutes(0, 0));
});
angular
  .module('event')
  .controller("ShowController", function ($scope, Event, supersonic) {
    $scope.event = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;
    
    $scope.loadGoogleMaps = function(){
        var link = "https://www.google.com/maps/dir//" + $scope.event.Location.replace(/\s/g,"+");
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

var app = angular.module('mgcrea.ngStrapDocs', ['ngAnimate', 'ngSanitize', 'mgcrea.ngStrap']);

app.controller('MainCtrl', function($scope) {
});

'use strict';

angular.module('mgcrea.ngStrapDocs')

.controller('TimepickerDemoCtrl', function($scope, $http) {
  $scope.time = new Date(1970, 0, 1, 10, 30, 40);
  $scope.selectedTimeAsNumber = 10 * 36e5 + 30 * 6e4 + 40 * 1e3;
  $scope.selectedTimeAsString = '10:00';
  $scope.sharedDate = new Date(new Date().setMinutes(0, 0));
});

