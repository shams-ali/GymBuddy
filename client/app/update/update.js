angular.module('gymbuddy.update', [])

.controller('UpdateController', function ($scope, $window, $location, Stats) {
  // Your code here

  $scope.stat = {};
  $scope.updateStats = function () {
    $scope.loading = true;
    $scope.stat.token = $window.localStorage.getItem('com.gymbuddy');
    Stats.updateNewStats($scope.stat)
      .then(function () {
        $scope.loading = false;
        $location.path('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  };


});
