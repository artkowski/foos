// leauges/:leagueid/tournaments/:tournamentId/competitions
var Lazy = require('lazy.js')

module.exports = /* @ngInject */ function($stateProvider) {
	var competitions = {};

	competitions.base = {
		name:'competitions-base',
		parent: 'tournament-details',
		url: '/competitions'
	}

	competitions.competitions = {
		name: 'competitions',
		parent: 'competitions-base',
		url: '/',
		views: {
			'content@base': {
				templateUrl: 'modules/leagues/tournaments/competitions/templates/competitions.html',
				controller: 'CompetitionsCtrl',
				controllerAs: 'competitions',
			}
		}
	};

	competitions.details = {
		name: 'competition-details',
		parent: 'competitions-base',
		url: '/:competitionId',
		views: {
			'content@base': {
				templateUrl: 'modules/leagues/tournaments/competitions/templates/competition-details.html',
				controller: 'CompetitionDetailsCtrl',
				controllerAs: 'competition',
				resolve: {
					currentCompetition: currentCompetition
				}
			}
		}
	};

	// @ngInject
	function currentCompetition($stateParams, CompetitionService) {
		console.log($stateParams);
		var Competition = new CompetitionService($stateParams);
		return Competition.getOne($stateParams.competitionId);
	}

	Lazy(competitions).each(function(route) {
		$stateProvider.state(route);
	});

}