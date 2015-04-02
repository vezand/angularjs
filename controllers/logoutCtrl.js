angular
	.module('newsApp')
	.controller('logoutCtrl', function($scope, $window, $location){
		if($window.sessionStorage["UID"]) {
			$window.sessionStorage.removeItem("UID");
		}
		$location.path("/");
	})