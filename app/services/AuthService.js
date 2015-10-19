// AuthService - $cookies - używany do trzymania tokena
var config = require('../config');

// @ngInject
module.exports = function($q, $http, $cookies) {
	var resource = 'auth';
	var user = null;
	var _this = this;
	var tokenExpires = null;

	var AuthService = {
		login: login,
		logout: resetAuthData,
		check: check,
		getUserData: getUserData,
		getToken: getToken,
		getTokenExpires: getTokenExpires
	};
	return AuthService;

	function login(data) {
		console.log(data);
		return $http({
			method: 'POST',
			url: config.api_url + [resource, 'login'].join('/'),
			data: data
		}).then(function(res) {
			setAuthData(res.data);
			return res.data;
		});
	}

	function check() {
		return $http({
			method: 'GET',
			url: config.api_url + [resource, 'check'].join('/')
		}).then(function(res) {
			if(res.data.success) {
				setAuthData(res.data);
			} else {
				resetAuthData();
			}
			return res.data;
		}, function(res) {
			resetAuthData();
		});
	}

	function getUserData() {
		return user;
	}
	function getToken() {
		return $cookies.get('token');
	}
	function getTokenExpires() {
		return tokenExpires;
	}

	function setAuthData(data) {
		user = data.user;
		tokenExpires = data.exp;
		$cookies.put('token', data.token);
	}

	function resetAuthData() {
		user = null;
		tokenExpires = null;
		$cookies.remove('token');
	}

}