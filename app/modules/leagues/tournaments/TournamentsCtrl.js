

module.exports = /* @ngInject */ function($stateParams, TournamentService) {
	var Tournament = new TournamentService($stateParams.leagueId);

	var vm = this;
	vm.list = [];
	vm.form = {};
	vm.getAll = getAll;
	vm.add = add;

	function getAll() {
		return Tournament.getAll().then(function(list) {
			vm.list = list;
		});
	}

	function add() {
		return Tournament.add(vm.form).then(function(tournament) {
			vm.form = {};
			vm.list.push(tournament);
		});
	}

}