angular
	.module('newsApp')
	.controller('contactsCtrl', function ($rootScope, $scope, $routeParams, HeaderButtons) {
		HeaderButtons.setIsMenu(true);
		if($routeParams.ln) {
			$rootScope.ln = $routeParams.ln;
		}
		$scope.ln = $rootScope.ln;
	})