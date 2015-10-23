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
				controllerAs: 'tournaments',
			}
		}
	};

	tournaments.details = {
		name: 'tournament-details',
		parent: 'tournaments-base',
		url: '/:tournamentId',
		views: {
			'content@base': {
				templateUrl: 'modules/leagues/tournaments/templates/tournament-details.html',
				controller: 'TournamentDetailsCtrl',
				controllerAs: 'tournament',
				resolve: {
					currentTournament: currentTournament
				}
			}
		}
	};

	// @ngInject
	function currentTournament($stateParams, TournamentService) {
		console.log($stateParams);
		var Tournament = new TournamentService($stateParams.leagueId);
		return Tournament.getOne($stateParams.tournamentId);
	}

	Lazy(tournaments).each(function(route) {
		$stateProvider.state(route);
	});

}