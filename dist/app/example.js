angular.module('example', [
  // Declare here all AngularJS dependencies that are shared by the example module.
  'supersonic'
]);

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
  .module('example')
  .controller('SettingsController', function($scope, supersonic) {
    $scope.navbarTitle = "Settings";
  });
