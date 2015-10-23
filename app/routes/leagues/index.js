var Lazy = require('lazy.js');

module.exports = /* @ngInject */ function($stateProvider) {
	var leagues = {};

	leagues.base = {
		name:'leagues-base',
		parent: 'base',
		url: '/leagues'
	}

	leagues.details = {
		name: 'league-details',
		parent: 'leagues-base',
		url: '/:leagueId',
		views: {
			'content@base': {
				templateUrl: 'modules/leagues/templates/league-details.html',
				controller: 'LeagueDetailsCtrl',
				controllerAs: 'league',
				resolve: {
					currentLeague: currentLeague
				}
			}
		}
	};

	// @ngInject
	function currentLeague($stateParams, LeagueService) {
		return LeagueService.getOne($stateParams.leagueId);
	}

	Lazy(leagues).each(function(route) {
		$stateProvider.state(route);
	});

};