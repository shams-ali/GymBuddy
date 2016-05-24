angular.module('gymbuddy.stats', [])

.controller('StatsController', function ($scope, Stats) {
  // Your code here

  $scope.data = {};
  var initializeStats = function() {
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
