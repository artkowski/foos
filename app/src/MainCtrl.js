angular.module('foosApp.app')
	.controller('MainCtrl', function($scope, UserService) {
		$scope.users = [];

		UserService.getAll().then(function(data) {
			$scope.users = data;
		}, function(data) {
			console.error('Error', data);
		});
		console.log('MainCtrl init');
	});