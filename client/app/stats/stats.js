angular.module('gymbuddy.stats', [])

.controller('StatsController', function ($scope, $window, Auth, Stats) {
  // Your code here

  $scope.data = {};
  var initializeStats = function() {
    $scope.loading = true;
    $scope.data.token = $window.localStorage.getItem('com.gymbuddy');
    console.log('this is scope.data.token', $scope.data.token);
    Stats.getStats($scope.data)
      .then(function(stats) {
        console.log('this is stats in getStats', stats);
        $scope.loading = false;
        $scope.data.stats = stats;
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  initializeStats();

  $scope.signout = function() {
    Auth.signout();
  };

});
