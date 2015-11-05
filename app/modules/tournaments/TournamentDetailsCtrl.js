
module.exports = /* @ngInject */ function($scope, $uibModal, $state, $stateParams,
 currentLeague, currentTournament, TournamentService) {
	var Tournament = new TournamentService($stateParams.leagueId);

	var vm = this;
	// console.log($scope.league);
	// vm.parentTournaments = $scope.league.tournaments;
	// console.log('vm.parentTournaments', vm.parentTournaments);
	vm.current = currentTournament;
	vm.form = {};
	vm.edit = edit;
	vm.newCompetition = newCompetition;
	vm.competitionDetails = competitionDetails;

	

	function edit() {
		$uibModal.open({
			templateUrl: './modules/tournaments/templates/tournament-edit-modal.html',
			controller: 'TournamentEditCtrl',
			resolve: {
				currentTournament: function() {
					return vm.current;
				}
			},
			controllerAs: 'tournament'
		});
	}

	function newCompetition() {
		$state.go('competitions', {
			leagueId: $stateParams.leagueId,
			tournamentId: vm.current._id
		});
	}

	function competitionDetails(competition) {
		console.log(competitionDetails);

		$state.go('competition-details', {
			leagueId: $stateParams.leagueId,
			tournamentId: $stateParams.tournamentId,
			competitionId: competition._id
		});
	}
}