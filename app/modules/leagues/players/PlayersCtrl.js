
module.exports = /* @ngInject */ function($stateParams, PlayerService) {
	var Player = new PlayerService($stateParams.leagueId);
	console.log(Player);
	// console.log($stateParams.)

	var vm = this;
	vm.list = [];
	vm.form = {};
	vm.getAll = getAll;

	init();

	return vm;

	function init() {
		getAll();
	}

	function getAll() {
		return Player.getAll().then(function(list) {
			vm.list = list;
		});
	}
}