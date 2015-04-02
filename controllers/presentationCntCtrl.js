angular
	.module('newsApp')
	.controller('presentationCntCtrl', function ($scope, $routeParams, $http, $window, $anchorScroll, $sce, $rootScope, $location, HeaderButtons) {
		HeaderButtons.setIsMenu(false);
		if($routeParams.ln) {
			$rootScope.ln = $routeParams.ln;
		}
		$scope.ln = $rootScope.ln;

		$scope.media = [];
		$scope.tl = parseInt($routeParams.tl);

		$scope.slickConfig = {
			arrows: false,
			infinite: false,
			onAfterChange: function(slick, currentSlide) {
				// $location.path('/presentation/cnt/'+currentSlide, false).replace();
			}
        };
		
		$scope.slickHandle = {
        };
		
        $scope.onDirectiveInit = function() {
        };

		
		$scope.doOnOrientationChange = function() {
			setTimeout(function(){
				clearTimeout();
				$scope.slickHandle.slickGoTo($scope.tl);
			}, 200);
		}

		for(var k = 1; k < 33; k++) {
			var n = '';
			n = k.toString().length == 1 ? "0"+k : k;
			$scope.media.push({
				mimeType: "image/png",
				src: $rootScope.domain_path+"img/news/"+$scope.ln+"/"+n+".png"
			});
		}

		window.addEventListener('orientationchange', $scope.doOnOrientationChange);
		$scope.doOnOrientationChange();
	})