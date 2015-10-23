

module.exports = /* @ngInject */ function($state, $stateParams, TournamentService) {
	var Tournament = new TournamentService($stateParams.leagueId);

	var vm = this;
	vm.list = [];
	vm.form = {};
	vm.getAll = getAll;
	vm.add = add;
	vm.details = details;

	init();

	function init() {
		getAll();
	}

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

	function details(tournament) {
		$state.go('tournament-details', { tournamentId: tournament._id });
	}

}