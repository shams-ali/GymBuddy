angular.module('gymbuddy.update', [])

.controller('UpdateController', function ($scope, Stats) {
  // Your code here

  $scope.stat = {};
  $scope.updateStats = function () {
    $scope.loading = true;
    Links.updateNewStats($scope.stat)
      .then(function () {
        $scope.loading = false;
        $location.path('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  };


});
