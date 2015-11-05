// leauges/:leagueid/tournaments/:tournamentId/competitions
var Lazy = require('lazy.js')

module.exports = /* @ngInject */ function($stateProvider) {
	var competitions = {};

	competitions.base = {
		name:'competitions-base',
		parent: 'tournament-details',
		abstract: true
	}

	competitions.competitions = {
		name: 'competitions',
		parent: 'competitions-base',
		url: '/competitions',
		views: {
			'content@base': {
				templateUrl: 'modules/competitions/templates/competitions.html',
				controller: 'CompetitionsCtrl',
				controllerAs: 'competitions',
			}
		},
		ncyBreadcrumb: {
			label: 'Competitions'
		}
	};

	competitions.details = {
		name: 'competition-details',
		parent: 'competitions-base',
		url: '/competitions/:competitionId',
		views: {
			'content@base': {
				templateUrl: 'modules/competitions/templates/competition-details.html',
				controller: 'CompetitionDetailsCtrl',
				controllerAs: 'competition',
			}
		},
		resolve: {
			currentCompetition: currentCompetition
		},
		ncyBreadcrumb: {
			label: 'Competition {{ current.competition.name }}'
		}
	};

	// @ngInject
	function currentCompetition($rootScope, $stateParams, CompetitionService) {
		console.log($stateParams);
		var Competition = new CompetitionService($stateParams);
		return Competition.getOne($stateParams.competitionId).then(function(competition) {
			$rootScope.current.competition = competition;
			return competition;
		});
	}

	Lazy(competitions).each(function(route) {
		$stateProvider.state(route);
	});

}