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
				controllerAs: 'league'
			}
		},
		resolve: {
			currentLeague: currentLeague
		},
		ncyBreadcrumb: {
			label: 'League {{ current.league.name }}',
			parent: 'indexView'
		}
	};

	// @ngInject
	function currentLeague($rootScope, $stateParams, LeagueService) {
		$rootScope.current = $rootScope.current || {};
		console.log('currentLeague get');
		return LeagueService.getOne($stateParams.leagueId).then(function(league) {
			$rootScope.current.league = league;
			return league;
		});
	}

	Lazy(leagues).each(function(route) {
		$stateProvider.state(route);
	});

};