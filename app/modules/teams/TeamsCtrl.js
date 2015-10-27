
// @ngInject
module.exports = function($scope, $stateParams, $filter, currentCompetition, TeamService, NoticeService, PlayerService) {
	console.log($stateParams)
	var Team = new TeamService($stateParams);
	var Player = new PlayerService($stateParams.leagueId);

	var vm = this;
	vm.competition = currentCompetition;
	vm.list = [];
	vm.players = [];
	vm.form = {};
	vm.getAll = getAll;
	vm.add = add;
	vm.selectedPlayer = null;
	vm.selectPlayer = selectPlayer;
	vm.removePlayer = removePlayer;
	vm.remove = remove;

	vm.filterUsedPlayers = filterUsedPlayers;
	vm.usedPlayers = [];
	// vm.edit = edit
	init();

	function init() {
		getAll();
		getPlayers();
	}

	function filterUsedPlayers(value, item, array) {
		var result = vm.usedPlayers.indexOf(value._id);
		return result == -1;
	}

	function selectPlayer(item, model, label) {
		if(!vm.form.players) {
			vm.form.players = [];
		}
		vm.form.players.push(item);
		vm.form.totalPoints = 0;
		_.map(vm.form.players, function(item) {
			vm.form.totalPoints+= item.points;
		});
		vm.selectedPlayer = null;
	}

	function getAll() {
		return Team.getAll().then(function(list) {
			vm.list = list;
			_refreshUsedPlayers();
		}, function(res) {
			return NoticeService.responseError(res);
		});
	}

	function getPlayers() {
		return Player.getAll().then(function(players) {
			vm.players = players;
		})	
	}

	function add() {
		return Team.add(vm.form).then(function(team) {
			vm.form = {};
			vm.list.push(team);
			_listOrderByPoints();
			_refreshUsedPlayers();
		});
	}

	function _listOrderByPoints() {
		vm.list = $filter('orderBy')(vm.list, 'totalPoints', true);
	}
	function _refreshUsedPlayers() {
		vm.usedPlayers = [];
		$scope.usedPlayers = vm.usedPlayers;
		_.each(vm.list, function(item) {
			vm.usedPlayers = vm.usedPlayers.concat(_.map(item.players, '_id'));
		});
	}

	function removePlayer(player) {
		var idx = vm.form.players.indexOf(player);
		if(idx > -1) {
			vm.form.players.splice(idx, 1);
		}
	}

	function remove(team) {
		if(!confirm("Are you sure to delete?")) return;

		return Team.remove(team._id).then(function(data) {
			var idx = vm.list.indexOf(team);
			if( idx > -1 ) {
				vm.list.splice(idx, 1);
			}
		});
	}

}