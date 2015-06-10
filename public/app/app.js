

// SampleBackend
angular.module('myApp', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'textAngular', 'pascalprecht.translate', 'translateApp', 'geolocation', 'ngMap'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/',	                   		{ templateUrl: 'views/main.html',  controller: 'MainController' })
			.when('/login',                   	{ templateUrl: 'views/login.html',  controller: 'LoginController' })
			.when('/logout',                    { templateUrl: 'views/logout.html', controller: 'LogoutController' })
			.when('/import/:class', 			{ templateUrl: 'views/import.html', controller: 'ImportController' })


			.when('/user/',			 { templateUrl: 'views/user/list.html',   controller: 'ListUserController' })
			.when('/user/select',	 { templateUrl: 'views/user/select.html', controller: 'SelectUserController' })
			.when('/user/add',        { templateUrl: 'views/user/edit.html',   controller: 'EditUserController' })
			.when('/user/edit/:id', 	 { templateUrl: 'views/user/edit.html',   controller: 'EditUserController' })
			.when('/user/delete/:id', { templateUrl: 'views/user/edit.html', 	 controller: 'EditUserController' })
			.when('/user/view/:id', 	 { templateUrl: 'views/user/edit.html', 	 controller: 'EditUserController' })

			.when('/city/',			 { templateUrl: 'views/city/list.html',   controller: 'ListCityController' })
			.when('/city/select',	 { templateUrl: 'views/city/select.html', controller: 'SelectCityController' })
			.when('/city/add',        { templateUrl: 'views/city/edit.html',   controller: 'EditCityController' })
			.when('/city/edit/:id', 	 { templateUrl: 'views/city/edit.html',   controller: 'EditCityController' })
			.when('/city/delete/:id', { templateUrl: 'views/city/edit.html', 	 controller: 'EditCityController' })
			.when('/city/view/:id', 	 { templateUrl: 'views/city/edit.html', 	 controller: 'EditCityController' })


			.when('/admin/webHooks/', { templateUrl: 'views/admin/webHooks.html', controller: 'AdminWebHooksController' })
			.when('/admin/apiKeys/',  { templateUrl: 'views/admin/apiKeys.html', controller: 'AdminApiKeysController' })

			.when('/403',  		 	 { templateUrl: 'views/403.html' })

			.otherwise({ redirectTo: '/login' });
	}])

	.constant('AUTH_EVENTS', {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		logoutSuccess: 'auth-logout-success',
		sessionTimeout: 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized: 'auth-not-authorized'
	})

	.constant('USER_ROLES', {
		admin: 'admin'
	})

	.run(['$rootScope', '$location', 'Session', function($rootScope, $location, Session) {
		// register listener to watch route changes
		$rootScope.$on( "$routeChangeStart", function(event, next, current) {
			if ( $rootScope.isLogged !== true  ) {
				if ( next.templateUrl == "views/login.html" ) {
				  // already going to #login, no redirect needed
				} else {
					// not going to #login, we should redirect now (and store current route for later redirect)
					$rootScope.requestedRoute = $location.path();
					$location.path( "/login" );
				}
			}
			else {
				//logged. Check Role Authorization
				if ( next.templateUrl && (next.templateUrl.substr(0, 12) === "views/admin/") ) {
					if (!Session.userHasRole("Admin")) {
						$location.path( "/403" );
					}
				}
			}		  			
		});
	}])
;

angular.module('myApp').value('baseUrl', 			'');
angular.module('myApp').value('baseApi', 			'/api');
angular.module('myApp').value('documentationUrl', 	'/api/documentation');

