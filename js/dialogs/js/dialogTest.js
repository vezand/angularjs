angular.module('modalTest',['dialogs.main'])
	.controller('dialogServiceTest',function($scope,dialogs){
		$scope.launch = function(which){
			switch(which){
				case 'error':
					dialogs.error();
				break;
			}
		}; 
	})
