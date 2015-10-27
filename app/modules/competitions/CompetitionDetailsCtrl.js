
// @ngInject
module.exports = function($state, $stateParams, currentCompetition, CompetitionService) {
	var Competition = new CompetitionService($stateParams);

	var vm = this;
	vm.list = [];
	vm.current = currentCompetition;
	vm.form = {};
	vm.types = Competition.types;
	vm.teams = teams;
	vm.start = start;

	function teams() {
		$state.go('teams', $stateParams);
	}

	function start() {
		return Competition.start(vm.current._id).then(function(data) {
			console.log('start', data);
		});
	}
}