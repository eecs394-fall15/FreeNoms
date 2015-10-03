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
