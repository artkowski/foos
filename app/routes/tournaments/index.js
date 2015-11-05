// leauges/:leagueid/tournaments
var Lazy = require('lazy.js')

module.exports = /* @ngInject */ function($stateProvider) {
	var tournaments = {};

	tournaments.base = {
		name:'tournaments-base',
		parent: 'league-details',
		abstract: true
	}

	tournaments.tournaments = {
		name: 'tournaments',
		parent: 'tournaments-base',
		url: '/tournaments',
		views: {
			'content@base': {
				templateUrl: 'modules/tournaments/templates/tournaments.html',
				controller: 'TournamentsCtrl',
				controllerAs: 'tournaments',
			}
		},
		ncyBreadcrumb: {
			label: 'Tournaments'
		}
	};

	tournaments.details = {
		name: 'tournament-details',
		parent: 'tournaments-base',
		url: '/tournaments/:tournamentId',
		views: {
			'content@base': {
				templateUrl: 'modules/tournaments/templates/tournament-details.html',
				controller: 'TournamentDetailsCtrl',
				controllerAs: 'tournament',
			}
		},
		resolve: {
			currentTournament: currentTournament
		},
		ncyBreadcrumb: {
			label: 'Tournament {{ current.tournament.name }}'
		}
	};

	// @ngInject
	function currentTournament($rootScope, $stateParams, currentLeague, TournamentService) {
		var Tournament = new TournamentService($stateParams.leagueId);
		return Tournament.getOne($stateParams.tournamentId).then(function(tournament) {
			// find tournament in currentLeague and make reference
			var idx = _.findIndex(currentLeague.tournaments, {_id: tournament._id});
			if(idx > -1) {
				currentLeague.tournaments[idx] = tournament;
			}
			$rootScope.current.tournament = tournament;
			//return result
			return tournament;
		});
	}

	Lazy(tournaments).each(function(route) {
		$stateProvider.state(route);
	});

}