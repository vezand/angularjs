angular
	.module('newsApp')
	.controller('loginnedCtrl', function($scope, $window, HeaderButtons){
		$scope.newsCat = HeaderButtons.getSubCat();
		$scope.loggined = false;
		if($window.sessionStorage["UID"]) {
			$scope.loggined = true;
		}
	})