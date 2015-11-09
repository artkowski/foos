
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
	vm.refresh = getCurrent;
	vm.callMatch = callMatch;
	vm.clearCalls = clearCalls;
	vm.selectWinner = selectWinner;
	vm.filter = {}

	vm.show = vm.show || {};
	vm.show.current = showCurrent;
	vm.show.finished = showFinished;
	vm.show.results = showResults;
	showCurrent();

	function getCurrent() {
		return Competition.getOne($stateParams.competitionId).then(function(current) {
			vm.current = current;
		})
	}

	function showCurrent() {
		vm.show.name = 'current';
		vm.filter.results = 0;
		vm.filter.winner = 0;
	}
	function showFinished() {
		vm.show.name = 'finished';
		vm.filter.results = 0;
		vm.filter.winner = 1;
	}
	function showResults() {
		vm.show.name = 'results';
		vm.filter.results = 1;
		vm.filter.winner = 0;
	}

	function callMatch(match) {
		// table
		var table = 1;
		if(match.calls.length) {
			table = match.calls.slice(-1)[0].table;
			console.log(table);
		}
		table = prompt("Please enter table number", table);
		console.log(table)
		if(!table) return;
		return Competition.callMatch(vm.current._id, match._id, table).then(function(data) {
			match.calls = data.calls;
		});
	}

	function clearCalls(match) {
		if(!confirm('Are you sure?')) return;
		return Competition.clearCalls(vm.current._id, match._id).then(function(data) {
			match.calls = [];
		});
	}

	function selectWinner(match, winner) {
		console.log(winner);
		return Competition.selectWinner(vm.current._id, match._id, winner ? winner._id : null).then(function(data) {
			match.winner = winner;
			vm.refresh();
		});
	}

	function teams() {
		$state.go('teams', $stateParams);
	}

	function start() {
		// if(!confirm('Start competition now?')) return;
		if(vm.current.matches.length && !confirm('Old matches are going to remove, confirm')) return;
		return Competition.start(vm.current._id).then(function(matches) {
			vm.current.matches = _.clone(matches);
			vm.current.results = [];
			vm.current.start = true;
			// console.log('start', data);
		});
	}
}