// leaugedetails
module.exports = /* @ngInject */ function($state, $stateParams, LeagueService) {
	var vm = this;
	vm.current = {};
	vm.form = {};
	vm.players = players;
	getCurrent();


	// should be in  route resolve
	function getCurrent() {
		return LeagueService.getOne($stateParams.leagueId).then(function(leauge) {
			vm.current = leauge;
		});
	}

	function players(league) {
		console.log(league);
		$state.go('players', {leagueId: league._id});
	}

	return vm;
}