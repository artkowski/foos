var _ = require('lodash');

module.exports = /* @ngInject */ function(UserService, $uibModal) {
	// ViewModel
	var vm = this;
	vm.list = [];
	vm.form = {};
	vm.add = addUser;
	vm.edit = editUser;
	vm.remove = removeUser;

	function init() {
		console.log('UsersCtrl init');
		UserService.getAll().then(function(data) {
			vm.list = data;
		}, function(res) {
			console.error('Error', res);
		});
		
	}

	function addUser() {
		UserService.add(vm.form).then(function(data) {
			vm.form = {};
			vm.list.push(data);
			console.log('Success')
		}, function(res) {
			console.error(res);
		});
	}

	function editUser(user) {
		$uibModal.open({
			templateUrl: './modules/users/templates/modals/editUser.html',
			controller: function($modalInstance) {
				var vm = this;
				vm.form = _.clone(user);
				vm.close = function() {$modalInstance.close()};
				vm.save = saveUser;

				function saveUser() {
					UserService.edit(user._id, vm.form).then(function(data) {
						user = _.extend(user, data);
						vm.close();
					}, function(res) {
						console.error(res);
					});
				}
				return vm;
			},
			controllerAs: 'editUser'
		})
	}

	function removeUser(user, idx) {
		UserService.remove(user._id).then(function(data) {
			console.log(data);
			vm.list.splice(idx, 1);
		}, function(res) {
			console.error(res);
		});
	}

	init();

	return vm;
};