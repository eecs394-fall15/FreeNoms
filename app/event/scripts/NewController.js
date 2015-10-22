angular
  .module('event')
  .controller("NewController", function ($scope, Event, supersonic) {
    $scope.event = {};

    $scope.submitForm = function () {
    var location = document.getElementById('tags').value;
        $scope.event.Location = location; 
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
