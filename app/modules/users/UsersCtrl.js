module.exports = /* @ngInject */ function($scope, UserService) {
	$scope.users = [];
	console.log('UserService')
	UserService.getAll().then(function(data) {
		$scope.users = data;
	}, function(data) {
		console.error('Error', data);
	});

	console.log('UsersCtrl init');
};