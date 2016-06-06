angular.module('gymbuddy.stats', [])

.controller('StatsController', function ($scope, $window, Auth, Stats) {
  // Your code here

  $scope.data = {};
  var initializeStats = function() {
    $scope.loading = true;
    $scope.data.token = $window.localStorage.getItem('com.gymbuddy');
    //console.log('this is scope.data.token', $scope.data.token);
    Stats.getStats($scope.data)
      .then(function(stats) {
        console.log('this is stats in getStats', stats);
        $scope.loading = false;
        $scope.data.stats = stats;
        $scope.data.stats[0].carbs = Math.round($scope.data.stats[0].calNeed * 0.55);
        $scope.data.stats[0].protein = Math.round($scope.data.stats[0].calNeed * 0.15);
        $scope.data.stats[0].fats = Math.round($scope.data.stats[0].calNeed * 0.30);
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
