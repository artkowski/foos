
module.exports = /* @ngInject */ function(LeagueService) {
	var vm = this;
	vm.list = [];
	vm.form = {};
	vm.add = add;
	getAll();

	return vm;

	function getAll() {
		LeagueService.getAll().then(function(leagues) {
			vm.list = leagues;
		});
	}

	function add() {
		LeagueService.add(vm.form).then(function(league) {
			vm.form = {};
			vm.list.push(league);
		});
	}
}