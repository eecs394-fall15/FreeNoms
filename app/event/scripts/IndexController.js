angular
  .module('event')
  .controller("IndexController", function ($scope, Event, supersonic) {
    $scope.events = null;
    $scope.showSpinner = true;
    
    var view = new supersonic.ui.View("maps#index");

    var leftButton = new supersonic.ui.NavigationBarButton( {
    title: "MapView",
    onTap: function() {
      // supersonic.ui.dialog.alert("Left button tapped!");
      supersonic.ui.layers.push(view);
      }
    });
    
    Event.all().whenChanged( function (events) {
        $scope.$apply( function () {
          $scope.events = events;
          $scope.showSpinner = false;
          supersonic.ui.navigationBar.update(options);
        });
    });
  });
