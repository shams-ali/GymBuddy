angular.module('gymbuddy.services', [])

.factory('Stats', function($http) {

  var getStats = function(stats) {
    return $http({
      method: 'POST',
      url: 'api/stats1',
      data: stats
    })
    .then(function(resp) {
      console.log('this is resp.data in getStats', resp.data);
      return resp.data;
    });
  };

  var updateNewStats = function(stats) {
    return $http({
      method: 'POST',
      url: 'api/stats',
      data: stats
    });
  };

  return {
    getStats: getStats,
    updateNewStats: updateNewStats
  };

})

.factory('Auth', function ($http, $location, $window) {

  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.gymbuddy');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.gymbuddy');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
