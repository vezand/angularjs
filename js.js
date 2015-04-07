var newsApp = angular.module('newsApp', [
		'ngRoute',
		'ui.bootstrap',
		'ngQuickDate',
		'ngSanitize',
		'ngAnimate',
		'ngTouch',
		'angular-carousel',
		'mgcrea.ngStrap',
		'directive.onFinishRender',
		'directive.pagination',
		'chieffancypants.loadingBar',
		'bardo.directives',
		'pascalprecht.translate',
		'ngCookies',
		'infinite-scroll',
		'validator',
		'dialogs.main',

		'validator.rules'
	])
	.factory('HeaderButtons', function ($location) {
		var headerVar = {
			isMenu: true,
			isBack: false
		};

		var subCat = false;
		
		return {
			getHeaderVar: function () {
				return headerVar;
			},
			setIsMenu: function(k) {
				headerVar.isMenu = k;
				headerVar.isBack = !k;
			},
			getSubCat: function () {
				if(subCat) {
					if($location.path().match(/news/g) == null) {
						return subCat = false;
					}
					return true;
				}
				return false;
			},
			ChangeSubCat: function(k) {
				// console.debug(k);
				subCat = k;
			}
		};
	})
	.controller('HeaderCtrl', ['$scope', 'HeaderButtons', function($scope, HeaderButtons){
		$scope.headerVar = HeaderButtons.getHeaderVar();
	}])
	.config(function ($routeProvider, $asideProvider, $translateProvider){
		$routeProvider.when('/',{
			controller: "mainCtrl",
			templateUrl: "templates/main.html"
		}).when('/menu',{
			controller: "menuCtrl",
			templateUrl: "templates/menu.html"
		}).when('/lang/',{
			controller: "langCtrl",
			templateUrl: "templates/lang.html"
		}).when('/profile/',{
			controller: "profileCtrl",
			templateUrl: "templates/profile.html"
		}).when('/login/',{
			controller: "loginCtrl",
			templateUrl: "templates/login.html"
		}).when('/logout/',{
			controller: "logoutCtrl",
			templateUrl: "templates/login.html"
		}).when('/news/:cat?',{
			controller: "newsListCtrl",
			templateUrl: "templates/newsList.html"
		}).when("/news/cnt/:tl",{
			controller: "newsCntCtrl",
			templateUrl: "templates/newsCnt.html"
		}).when('/presentation/',{
			controller: "presentationListCtrl",
			templateUrl: "templates/presentationList.html"
		}).when("/presentation/cnt/:tl",{
			controller: "presentationCntCtrl",
			templateUrl: "templates/presentationCnt.html"
		}).when("/contacts/",{
			controller: "contactsCtrl",
			templateUrl: "templates/contacts.html"
		}).otherwise({
			redirectTo: "/"
		});
		angular.extend($asideProvider.defaults, {
			container: 'body',
			html: true
		});
		$translateProvider.preferredLanguage('en');
		
		$translateProvider.useStaticFilesLoader({
			prefix: 'i18n/',
			suffix: '.json'
		});
	}).run(function($rootScope, $http, $translate, $window) {
		
		$rootScope.domain_path = "http://emex4.shedevre.com/angularjs/"; // глобальная переменная домена для ajax
		
		$rootScope.language = [];
		$rootScope.lang_arr = {
			"ru": "Русский",
			"en": "English",
			"es": "Español"
		};
		
		if($window.sessionStorage["ln"]) {
			$rootScope.ln = $window.sessionStorage["ln"];
		}
		
		$http.get('news.json').success(function(data) {
			angular.forEach(data, function(value, key) {
				$rootScope.language.push({name: $rootScope.lang_arr[key], sh: key});
			});

			if(!$rootScope.ln) {
				$rootScope.ln = $rootScope.language[0]["sh"];
			}
			$translate.use($rootScope.ln);
		});
		
		$rootScope.strana_arr = [];
		$http.get('country.json').success(function(data) {
			angular.forEach(data, function(value, key) {
				$rootScope.strana_arr.push({cc: key, name: value});
			});
		});
		
	})
	.directive('backbutton', function () {
		return {
			restrict: 'A',
			scope: {
			},
			link: function(scope, element, attrs) {
				$(element[0]).on('click', function() {
					history.back();
					scope.$apply();
				});
			}
		};
	});