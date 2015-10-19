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
		url: '/:id',
		views: {
			'content@base': {
				templateUrl: 'modules/leagues/templates/league-details.html',
				controller: 'LeagueDetailsCtrl',
				controllerAs: 'league'
			}
		}
	};

	Lazy(leagues).each(function(route) {
		$stateProvider.state(route);
	});

};