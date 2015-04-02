angular
	.module('newsApp')
	.controller('loginCtrl', function ($rootScope,$scope,HeaderButtons,$validator,$http,$window,$location,dialogs) {
		if($window.sessionStorage["UID"]) {
			$location.path("/");
		}
		HeaderButtons.setIsMenu(true);
		$scope.language = $rootScope.language;
		
		dialogs.error('This is my error message');
		
		$scope.formSubmit = {
			submit: function() {
				return $validator.validate($scope, 'formSubmit').success(function() {
					$http.get($rootScope.domain_path+'json.php', {
						params: {
							a: 'check_user_login',
							login: $scope.formSubmit.username,
							password: $scope.formSubmit.password
						}
					}).success(function(data, status, headers, config) {
						if(data == 0) {
							// dialogs.error('This is my error message');
						} else {
							$window.sessionStorage.setItem("UID", data);
							$location.path("/");
						}
					});
				}).error(function() {
					
				}).then(function() {
					
				});
			},
			reset: function() {
				return $validator.reset($scope, 'formSubmit');
			}
		};
	})