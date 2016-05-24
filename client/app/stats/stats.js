angular.module('gymbuddy.stats', [])

.controller('StatsController', function ($scope, $window, Stats) {
  // Your code here

  $scope.data = {};
  var initializeStats = function() {
    $scope.loading = true;
    Stats.getStats()
      .then(function(stats) {
        $scope.data.stats = stats;
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  initializeStats();

});
