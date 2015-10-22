var players = require('./players');
var tournaments = require('./tournaments');

module.exports = angular.module('foosApp.modules.leagues', [
	players.name,
	tournaments.name
	])
	.controller('LeaguesCtrl', require('./LeaguesCtrl'))
	.controller('LeagueDetailsCtrl', require('./LeagueDetailsCtrl'));
