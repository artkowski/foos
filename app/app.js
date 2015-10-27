var angular = require('angular');
// var Lazy = require('lazy.js'),
	routes = require('./routes/index.js'),
	// config = require('./assets/helpers/config.js'),
	services = require('./services'),
	modules = require('./modules'),
	_ = require('lodash');
	require('angular-breadcrumb');

// load notification from here cause there is not global angular 
require('./assets/helpers/angular-ui-notification.min.js');


angular.module('foosApp.app', [
	services.name,
	// config.name,
	routes.name,
	modules.name,
	require('angular-bootstrap-npm'),
	require('angular-cookies'),
	'ui-notification',
	'ncy-angular-breadcrumb'
])

.constant("$config", {
	api_url: "http://localhost:3000/"
})

// interceptors
.config(function($httpProvider) {
	var httpErrorInterceptorFactory = function(NoticeService) {
		var interceptor = {
			response: NoticeService.response,
			responseError: NoticeService.responseError
		}
		return interceptor;

		// function response(res) {
		// 	if(res.config.method != 'GET') {
		// 		console.log(res);
		// 		// api zawsze przy 200 powinno być ok, bez sprwadzania daty
		// 		// if(res.data.success) {
		// 		var Notification = $injector.get('Notification');
		// 		Notification.success(res.data.message || "Success");
		// 		// } else {
		// 			// return resError(res);
		// 		// }
		// 	}

		// 	return res;
		// };

		// function responseError(res) {
		// 	var Notification = $injector.get('Notification');
		// 	console.error(res);

		// 	// reply request
		// 	if (res.status <= 0 || res.status == 408 || res.status > 500) {
  //       var $http = $injector.get('$http');
  //     	Notification.warning('Connection problem ' + res.config.url);
  //       return $timeout(function() {
  //         return $http(res.config);
  //       }, 3000, false);
  //     }

		// 	var message = res.data.message 
		// 		|| res.data.error && res.data.error.message 
		// 		|| res.statusText || false; 

		// 	var error = res.data.error || false;
		// 	if(res.data.error) {
		// 		_.each(error.errors, function(each) {
		// 			message+= "<br /> " + each.message
		// 		});
		// 	}
		// 	Notification.error(message);
		// 	return $q.reject(res);
		// };
	};

	var authInterceptor = function($injector) {
		var interceptor = {
			request: request
		}
		return interceptor;

		function request(config) {
			// ustawiamy token, jeżeli taki istnieje
			config.headers = config.headers || {};
			var AuthService = $injector.get('AuthService');
			var token = AuthService.getToken() || false;
			if(token) {
				config.headers.token = token;
			}
			return config;
		}

	}

	$httpProvider.interceptors.push(authInterceptor);
	$httpProvider.interceptors.push(httpErrorInterceptorFactory);

})

.run(function($rootScope, $state, $config) {
	console.log($config);
	$rootScope.$state = $state;
});