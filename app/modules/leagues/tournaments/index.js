module.exports = angular.module('foosApp.modules.leagues.tournaments', [
	require('./competitions').name
])
.controller('TournamentsCtrl', require('./TournamentsCtrl'))
.controller('TournamentDetailsCtrl', require('./TournamentDetailsCtrl'));