angular
	.module('newsApp')
	.controller('langCtrl', function ($rootScope, $scope, $translate, HeaderButtons, $window) {
		$scope.language = $rootScope.language;
		HeaderButtons.setIsMenu(true);

		$scope.change_ln = function(ln) {
			$rootScope.ln = ln;
			$window.sessionStorage.setItem("ln", ln);
			$translate.use(ln);
		}
	})