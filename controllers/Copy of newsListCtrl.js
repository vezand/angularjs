angular
	.module('newsApp')
	.controller('newsListCtrl', function ($rootScope, $scope, $routeParams, $http, $window, $cookies, $cookieStore) {
		if($routeParams.ln) {
			$rootScope.ln = $routeParams.ln;
		}
		$scope.ln = $rootScope.ln;
		$scope.limitPerPage = 10;
		$scope.page = 0;
		$scope.limit = 50;
		
		$scope.language = $rootScope.language;
		$http.get('http://emex4.shedevre.com/angularjs/json.php', {
			params: {
				a: 'get_news_list',
				lang: $scope.ln,
				page: $scope.page,
				limit: $scope.limit
			}
		}).success(function(data, status, headers, config) {
			$cookieStore.put('news_arr', data["list"]);
			$scope.data = [];
			$scope.data = data["list"];
			$scope.qty = data["qty"];

			$rootScope.$watch('page', function(newValue){
				$scope.curData(newValue, newValue + $scope.limitPerPage);
			});
		});
		
		$scope.curData = function(start, end) {
			if(typeof(start) == 'undefined') return;
			$scope.info = [];
			var i = 0;
			for(var k in $scope.data) {
				if(i >= start && i < end) {
					$scope.info.push($scope.data[k]);
				}
				if(i >= end-1) {
					return;
				}
				i++;
			}
		};
	})