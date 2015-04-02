angular
	.module('newsApp')
	.controller('newsListCtrl', function ($rootScope, $scope, $routeParams, $http, $location, $window, $cookies, $cookieStore, HeaderButtons, $translate) {
		$scope.preloader = false;
		HeaderButtons.setIsMenu(true);
		HeaderButtons.ChangeSubCat(true);
		if($routeParams.ln) {
			$rootScope.ln = $routeParams.ln;
		}

		$scope.news_cat_arr = {};
		
		$scope.news_cat = {
			0: 1,
			1: 3,
			2: 5
		};
		
		$scope.cur_cat = $routeParams.cat;
		if($routeParams.cat && $scope.news_cat[$routeParams.cat]) {
			$scope.cur_cat = $routeParams.cat;
		} else {
			$scope.cur_cat = 0;
		}

		$scope.$watch("cur_cat", function(old_cat, new_cat){
			$location.path("/news/"+$scope.cur_cat);
			$scope.get_last_news();
		});

		$scope.ln = $rootScope.ln;
		$scope.limitPerPage = 10;
		$scope.page = 0;
		$scope.loadcheck = false;
		$scope.news_sort = [];
		
		$scope.language = $rootScope.language;
		
		$scope.get_last_news = function(){
			$scope.preloader = true;
			$http.get($rootScope.domain_path+'json.php', {
				params: {
					a: 'get_last_news',
					lang: $scope.ln,
					cat: $scope.news_cat[$scope.cur_cat],
					limit: $scope.limitPerPage
				}
			}).success(function(data, status, headers, config) {
				$scope.news_arr = {};
				for(var k in data["data"]) {
					$scope.news_arr[k] = data["data"][k];
				}
				$scope.news_sort = data["sort"];
				$scope.loadcheck = false;
				$scope.loadcheck = true;
			});
		};
		
		// проверяем сколько сейчас в массиве новостей чтобы подгружать ещё
		$scope.get_cur_page = function() {
			var count = 0;
			for(var k in $scope.news_arr) {
				count++;
			}
			return count;
		};
		
		$scope.get_last_news();
		
		$scope.loadMore = function(){
			if(!$scope.loadcheck) {
				$scope.preloader = false;
				return false;
			}
			$scope.preloader = true;
			$scope.loadcheck = false;
			$scope.page = $scope.get_cur_page();
			if($scope.page >= 50) {
				return false;
			}
			$http.get($rootScope.domain_path+'json.php', {
				params: {
					a: 'get_more_news',
					lang: $scope.ln,
					limit: $scope.limitPerPage,
					cat: $scope.news_cat[$scope.cur_cat],
					page: $scope.page
				}
			}).success(function(data, status, headers, config) {
				$scope.preloader = false;
				for(var k in data["data"]) {
					$scope.news_arr[k] = data["data"][k];
				}
				var arr = data["sort"];
				for(var n in arr) {
					$scope.news_sort.push(arr[n]);
				}
				$scope.loadcheck = true;
			});
		};
	})