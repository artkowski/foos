var _ = require('lodash');

module.exports = /* @ngInject */ function($stateParams, $uibModal, $filter, playersList, PlayerService) {
	var Player = new PlayerService($stateParams.leagueId);
	console.log(Player);
	// console.log($stateParams.)

	var vm = this;
	vm.list = playersList || [];
	vm.form = {};
	vm.getAll = getAll;
	vm.add = add;
	vm.edit = edit;

	// po dodaniu lub edycji (żeby kolejność się zgadzała)
	function _listOrderByPoints() {
		vm.list = $filter('orderBy')(vm.list, 'points', true);
	}

	function getAll() {
		return Player.getAll().then(function(list) {
			vm.list = list;
		});
	}

	function add() {
		return Player.add(vm.form).then(function(player) {
			vm.form = {};
			vm.list.push(player);
			_listOrderByPoints();
		});
	}

	function edit(player) {
		$uibModal.open({
			templateUrl: './modules/leagues/players/templates/modals/edit-player.html',
			controller: /* @ngInject */ function($modalInstance) {
				var vmModal = this;
				vmModal.form = _.clone(player, true);
				vmModal.close = function() { return $modalInstance.close()};
				vmModal.save = save;
				vmModal.remove = remove;

				function save() {
					return Player.edit(player._id, vmModal.form).then(function(edited) {
						player = _.extend(player, edited);
						vmModal.close();
						_listOrderByPoints();
					});
				}
				function remove() {
					if(!confirm("Are you sure to delete?")) return;

					return Player.remove(player._id).then(function(data) {
						var idx = vm.list.indexOf(player);
						if(idx > -1) {
							vm.list.splice(idx, 1);
							vmModal.close();
						}
					});
				}
			},
			controllerAs: 'player'
		});
	}


}