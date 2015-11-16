var angular = require('angular');
// var Lazy = require('lazy.js'),
	routes = require('./routes/index.js'),
	// config = require('./assets/helpers/config.js'),
	services = require('./services'),
	modules = require('./modules'),
	_ = require('lodash');
	
// window.io = require('socket.io-client')

require('angular-breadcrumb');
require('angular-socket-io');
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
	'ncy-angular-breadcrumb',
	'btford.socket-io'
])

// .constant("$config", config)

// interceptors
.config(function($httpProvider) {
	var httpErrorInterceptorFactory = function(NoticeService) {
		var interceptor = {
			response: NoticeService.response,
			responseError: NoticeService.responseError
		}
		return interceptor;
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

.run(function($rootScope, $state) {
	$rootScope.$state = $state;
});