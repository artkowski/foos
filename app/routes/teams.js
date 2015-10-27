// leauges/:leagueid/tournaments/:tournamentId/teams
var Lazy = require('lazy.js')

module.exports = /* @ngInject */ function($stateProvider) {
	var teams = {};

	teams.base = {
		name:'teams-base',
		parent: 'competition-details',
		abstract: true
	}

	teams.teams = {
		name: 'teams',
		parent: 'teams-base',
		url: '/teams',
		views: {
			'content@base': {
				templateUrl: 'modules/teams/templates/teams.html',
				controller: 'TeamsCtrl',
				controllerAs: 'teams',
				resolve: {
					currentCompetition: currentCompetition
				}
			}
		},
		ncyBreadcrumb: {
			label: 'Teams'
		}
	};

	// @ngInject
	function currentCompetition($stateParams, CompetitionService) {
		console.log($stateParams);
		var Competition = new CompetitionService($stateParams);
		return Competition.getOne($stateParams.competitionId);
	}

	Lazy(teams).each(function(route) {
		$stateProvider.state(route);
	});

}