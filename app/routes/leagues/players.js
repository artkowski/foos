// leauges/:id/players
var Lazy = require('lazy.js')

module.exports = /* @ngInject */ function($stateProvider) {
	var players = {};

	players.base = {
		name:'players-base',
		parent: 'league-details',
		abstract: true
	}

	players.players = {
		name: 'players',
		parent: 'players-base',
		url: '/players',
		views: {
			'content@base': {
				templateUrl: 'modules/leagues/players/templates/players.html',
				controller: 'PlayersCtrl',
				controllerAs: 'players',
				resolve: {
					playersList: playersList
				}
			}
		},
		ncyBreadcrumb: {
			label: 'Players'
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