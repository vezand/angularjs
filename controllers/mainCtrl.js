angular
	.module('newsApp')
	.controller('mainCtrl', function ($rootScope, $scope, $translate, HeaderButtons, $window) {
		$scope.language = $rootScope.language;
		HeaderButtons.setIsMenu(true);

	})