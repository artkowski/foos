var _ = require('lodash')


module.exports = /* @ngInject */ function($scope, AuthService) {
	var vm = this;
	vm.user = null;
	vm.expires = null;
	vm.loginForm = {};
	vm.login = login;
	vm.logout = logout;
	vm.check = check;

	check();

	$scope._ = _;
	console.log('MainCtrl init');
	function login() {
		AuthService.login(vm.loginForm).then(function(data) {
			vm.loginForm = {};
			setUserData()
			console.log('Login Success');
		});
	}

	function check() {
		AuthService.check().then(function(data) {
			setUserData();
			// console.log('auth/check', data);
		});
	}

	function setUserData() {
		vm.user = AuthService.getUserData();
		vm.expires = AuthService.getTokenExpires();
	}

	function logout() {
		AuthService.logout();
		vm.user = null;
		vm.expires = null;
	}

	return vm;
};