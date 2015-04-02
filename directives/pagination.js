angular.module('directive.pagination', [])
	.directive('pagination', function () {
		return {
			restrict: 'E',
			scope: {
				page: "=",
				limitPerPage: "=",
				nrQty: "=",
				qty: "=limit",
				ln: "="
			},
			templateUrl: 'directives/pagination.html',
			controller: function($scope, $rootScope){
				$scope.qty1 = Math.ceil($scope.qty/$scope.limitPerPage);
				$scope.start = 0;
				$scope.start1 = 0;
				$scope.end = 0;
				$scope.currentPage = $scope.page/$scope.nrQty;
				$scope.start1 = Math.floor($scope.nrQty/2);
				
				if($scope.currentPage - Math.floor($scope.start1) < 0) {
					$scope.start = 0;
					$scope.start1 = $scope.nrQty;
					
					if($scope.qty1 > $scope.nrQty) {
						$scope.end = $scope.nrQty;
					} else {
						$scope.end = $scope.qty1;
					}
				} else {
					$scope.start = $scope.currentPage - $scope.start1;
					
					if(parseInt($scope.currentPage) + parseInt($scope.start1) > $scope.qty1 - 1) {
						$scope.end = $scope.qty1;
						$scope.start1 = (parseInt($scope.currentPage) + $scope.start1) - ($scope.qty1 - 1);
						$scope.start = $scope.start - $scope.start1;
					} else {
						$scope.end = parseInt($scope.currentPage) + $scope.start1+1;
					}
				}

				if($scope.start < 0) {
					$scope.start = 0;
				}
				
				if($scope.end>$scope.qty) {
					$scope.end = $scope.qty;
				}

				$scope.range = function (start, end) { // страницы
					var ret = [];
					for (var i = start; i < end; i++) {
						ret.push(i);
					}
					return ret;
				};

				$scope.prevPage = function () { // стрелка назад
					if ($scope.currentPage > 0) {
						$scope.currentPage--;
						$scope.page = $scope.currentPage * $scope.limitPerPage;
						$rootScope.page = $scope.page;
					}
				};

				$scope.nextPage = function () { // стрелка вперед
					if ($scope.currentPage < $scope.qty1 - 1) {
						$scope.currentPage++;
						$scope.page = $scope.currentPage * $scope.limitPerPage;
						$rootScope.page = $scope.page;
					}
				};

				$scope.setPage = function () { // конкретная страница
					$scope.currentPage = this.n;
					$scope.page = $scope.currentPage * $scope.limitPerPage;
					$rootScope.page = $scope.page;
				};
				$rootScope.page = $scope.page;
			}
		}
	})