

module.exports = /* @ngInject */ function($state, $stateParams, currentTournament, TournamentService) {
	
	var Tournament = new TournamentService($stateParams.leagueId);

	var vm = this;
	vm.current = currentTournament;
	vm.form = {};
	vm.newCompetition = newCompetition;
	// vm.getAll = getAll;

	function newCompetition() {
		$state.go('competitions', {
			leagueId: $stateParams.leagueId,
			tournamentId: currentTournament._id
		});
	}
}