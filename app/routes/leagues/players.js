// leauges/:id/players
var Lazy = require('lazy.js')

module.exports = /* @ngInject */ function($stateProvider) {
	var players = {};

	players.base = {
		name:'players-base',
		parent: 'league-details',
		url: '/players'
	}

	players.players = {
		name: 'players',
		parent: 'players-base',
		url: '/',
		views: {
			'content@base': {
				templateUrl: 'modules/leagues/players/templates/players.html',
				controller: 'PlayersCtrl',
				controllerAs: 'players',
				resolve: {
					playersList: playersList
				}
			}
		}
	};

	// @ngInject
	function playersList($stateParams, PlayerService) {
		var Player = new PlayerService($stateParams.leagueId);
		return Player.getAll();
	}

	Lazy(players).each(function(route) {
		$stateProvider.state(route);
	});

}