// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('gymbuddy.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.gymbuddy', token);
        $location.path('/stats');
      })
      .catch(function (error) {
        $scope.user = null;
        console.error('this is signin error', error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.gymbuddy', token);
        $location.path('/stats');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
