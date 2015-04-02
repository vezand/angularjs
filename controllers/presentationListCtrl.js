angular
	.module('newsApp')
	.controller('presentationListCtrl', function ($rootScope, $scope, $routeParams, $http, $sce, HeaderButtons) {
		HeaderButtons.setIsMenu(true);
		if($routeParams.ln) {
			$rootScope.ln = $routeParams.ln;
		}
		
		$scope.ln = $rootScope.ln;
		$scope.title_arr = [];
		$scope.title_arr1 = [];
		var i = 4;
		
		$http.get('news.json').success(function(data){
			angular.forEach(data[$scope.ln], function(val, key){
				$scope.title_arr[key-1] = val["title"];
				$scope.title_arr1[key-1] = {};
				angular.forEach(val["data"], function(val1, key1){
					$scope.title_arr1[key-1][i] = val1;
					i++;
				});
			});
		});
	})