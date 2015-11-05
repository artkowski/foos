// leaugedetails
module.exports = /* @ngInject */ function($rootScope, $uibModal, $state, $stateParams, currentLeague, LeagueService) {
	var vm = this;
	vm.current = currentLeague;
	vm.form = {};
	vm.edit = edit;
	vm.players = players;
	vm.refresh = getCurrent;
	vm.newTournament = newTournament;
	vm.tournamentDetails = tournamentDetails;

	function getCurrent() {
		return LeagueService.getOne($stateParams.leagueId).then(function(leauge) {
			vm.current = leauge;
		});
	}

	function edit() {
		$uibModal.open({
			templateUrl: './modules/leagues/templates/league-edit-modal.html',
			controller: 'LeagueEditCtrl',
			resolve: {
				currentLeague: function() {
					return vm.current;
				}
			},
			controllerAs: 'league'
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