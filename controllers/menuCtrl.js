angular
	.module('newsApp')
	.controller('menuCtrl', function ($rootScope, $scope, HeaderButtons, $window) {
		HeaderButtons.setIsMenu(true);
		$scope.language = $rootScope.language;
		$scope.loggined = false;
		if($window.sessionStorage["UID"]) {
			$scope.loggined = true;
		}
	})