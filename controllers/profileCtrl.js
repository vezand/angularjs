angular
	.module('newsApp')
	.config(function(ngQuickDateDefaultsProvider) {
		return ngQuickDateDefaultsProvider.set({
			closeButtonHtml: '<span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>',
			buttonIconHtml: '<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>',
			nextLinkHtml: '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>',
			prevLinkHtml: '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'
		});
	})
	.controller('profileCtrl', function ($rootScope, $routeParams, $scope, $window, HeaderButtons, $http, $location, $filter) {
		$scope.strana_arr = $rootScope.strana_arr;
		$scope.profile = [];
		if(!$window.sessionStorage["UID"]) {
			$location.path("/login/");
		}
		HeaderButtons.setIsMenu(true);
		if($routeParams.ln) {
			$rootScope.ln = $routeParams.ln;
		}

		$scope.$watch("profile.DRZ", function(newVar, oldVar){
			$scope.profile.DRZ = $filter('date')(newVar, 'yyyy-MM-dd');
		});
		
		$scope.edit = {};
		$scope.edit.personal = false;
		$scope.edit.contact = false;
		$scope.edit.user = false;
		
		$scope.disabled = function(date, mode) {
			return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
			};

			$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};
		$scope.toggleMin();

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};
		
		$scope.ln = $rootScope.ln;
		$http.get($rootScope.domain_path+'json.php', {
			params: {
				a: 'get_user_info',
				uid: $window.sessionStorage["UID"]
			}
		}).success(function(data, status, headers, config) {
			$scope.profile = data;
			for(var k in $scope.strana_arr) {
				if($scope.strana_arr[k]["cc"] == $scope.profile.STRANA) {
					$scope.profile.STRANA_NAME = $scope.strana_arr[k]["name"];
				}
			}
		});
		
		$scope.$watch("profile.STRANA", function(newVal, oldVal) {
			if(typeof(newVal) != "undefined") {
				for(var k in $scope.strana_arr) {
					if($scope.strana_arr[k]["cc"] == newVal) {
						$scope.profile.STRANA_NAME = $scope.strana_arr[k]["name"];
					}
				}
			}
		});
		
		$scope.change_profile = function(form){
			$scope.send_data = $scope.profile;
			$scope.send_data["form"] = form;
			$scope.send_data["a"] = "update_profile";
			// $scope.send_data.push({"form": form});
			$http({
				method: 'POST',
				url: $rootScope.domain_path+"json.php",
				data: $.param($scope.send_data),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
			
		};
	})