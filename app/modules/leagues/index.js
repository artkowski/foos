var players = require('./players');

module.exports = angular.module('foosApp.modules.leagues', [
	players.name
])
	.controller('LeaguesCtrl', require('./LeaguesCtrl'))
	.controller('LeagueDetailsCtrl', require('./LeagueDetailsCtrl'))
	.controller('LeagueEditCtrl', require('./LeagueEditCtrl'));
