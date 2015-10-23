// leaugedetails
module.exports = /* @ngInject */ function($state, $stateParams, currentLeague, LeagueService) {
	var vm = this;
	vm.current = currentLeague;
	vm.form = {};
	vm.players = players;
	vm.refresh = getCurrent;
	vm.newTournament = newTournament;
	vm.tournamentDetails = tournamentDetails;


	function getCurrent() {
		return LeagueService.getOne($stateParams.leagueId).then(function(leauge) {
			vm.current = leauge;
		});
	}

	function players() {
		$state.go('players', {leagueId: vm.current._id});
	}

	function newTournament() {
		// console.log(vm.current);
		$state.go('tournaments', {leagueId: vm.current._id})
	}

	function tournamentDetails(tournament) {
		console.log(tournament);
		$state.go('tournament-details', { tournamentId: tournament._id });
	}

	return vm;
}