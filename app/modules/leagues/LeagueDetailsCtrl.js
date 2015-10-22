// leaugedetails
module.exports = /* @ngInject */ function($state, $stateParams, LeagueService) {
	var vm = this;
	vm.current = {};
	vm.form = {};
	vm.players = players;
	vm.newTournament = newTournament;
	getCurrent();


	// should be in  route resolve
	function getCurrent() {
		return LeagueService.getOne($stateParams.leagueId).then(function(leauge) {
			vm.current = leauge;
		});
	}

	function players() {
		$state.go('players', {leagueId: vm.current._id});
	}

	function newTournament() {
		console.log(vm.current);
		$state.go('tournaments', {leagueId: vm.current._id})
	}

	return vm;
}