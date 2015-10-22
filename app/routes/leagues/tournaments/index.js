// leauges/:leagueid/tournaments
var Lazy = require('lazy.js')

module.exports = /* @ngInject */ function($stateProvider) {
	var tournaments = {};

	tournaments.base = {
		name:'tournaments-base',
		parent: 'league-details',
		url: '/tournaments'
	}

	tournaments.tournaments = {
		name: 'tournaments',
		parent: 'tournaments-base',
		url: '/',
		views: {
			'content@base': {
				templateUrl: 'modules/leagues/tournaments/templates/tournaments.html',
				controller: 'TournamentsCtrl',
				controllerAs: 'tournaments'
			}
		}
	};

	Lazy(tournaments).each(function(route) {
		$stateProvider.state(route);
	});

}