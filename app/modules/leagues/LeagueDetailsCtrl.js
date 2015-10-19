// leaugedetails
module.exports = /* @ngInject */ function($stateParams, LeagueService) {
	var vm = this;
	vm.current = {};
	vm.form = {};

	getCurrent();

	return vm;

	function getCurrent() {
		LeagueService.getOne($stateParams.id).then(function(leauge) {
			vm.current = leauge;
		});
	}

}