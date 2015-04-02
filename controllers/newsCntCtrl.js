angular
	.module('newsApp')
	.controller('newsCntCtrl', function ($scope, $routeParams, $http, $window, cfpLoadingBar, $rootScope, $location, HeaderButtons) {
		HeaderButtons.setIsMenu(false);
		// $scope.LeftMenuCategory(true);
		cfpLoadingBar.start();
		if($routeParams.ln) {
			$rootScope.ln = $routeParams.ln;
		}
		$scope.ln = $rootScope.ln;
		$scope.news_arr = [];
		
		$scope.tl = 0;
		$scope.slideIndex = parseInt($scope.tl);
		
		$http.get($rootScope.domain_path+'json.php', {
			params: {
				a: 'get_news_cnt',
				id: $routeParams.tl,
				lang: $scope.ln
			}
		}).success(function(data, status, headers, config) {
			$scope.news_arr = data;
			for(var k in data) {
				if(data[k]["REC_ID"] == $routeParams.tl) {
					$scope.slideIndex = k;
				}
			}
			cfpLoadingBar.complete();
		});
	})