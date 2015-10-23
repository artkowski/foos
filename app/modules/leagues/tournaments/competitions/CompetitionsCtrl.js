
// @ngInject
module.exports = function($stateParams, CompetitionService) {
	var Competition = new CompetitionService($stateParams);

	var vm = this;
	vm.list = [];
	vm.form = {};
	vm.getAll = getAll;
	vm.add = add;
	vm.types = Competition.types;

	init();

	function init() {
		getAll();
	}

	function getAll() {
		return Competition.getAll().then(function(list) {
			vm.list = list;
		});
	}

	function add() {
		return Competition.add(vm.form).then(function(competition) {
			vm.form = {};
			vm.list.push(competition);
		});
	}
}