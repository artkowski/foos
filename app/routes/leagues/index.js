var Lazy = require('lazy.js');

module.exports = /* @ngInject */ function($stateProvider) {
	var leagues = {};

	leagues.base = {
		name:'leagues-base',
		parent: 'base',
		abstract: true
	}

	leagues.details = {
		name: 'league-details',
		parent: 'leagues-base',
		url: '/leagues/:leagueId',
		views: {
			'content@base': {
				templateUrl: 'modules/leagues/templates/league-details.html',
				controller: 'LeagueDetailsCtrl',
				controllerAs: 'league',
				resolve: {
					currentLeague: currentLeague
				}
			}
		},
		ncyBreadcrumb: {
			label: 'League ',
			parent: 'indexView'
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