var config = require('../config');

module.exports = /* @ngInject */ function($q, $http) {
	var CompetitionService = function(params) {
		var resource = [
			'leagues',
			params.leagueId,
			'tournaments',
			params.tournamentId,
			 'competitions'
		].join('/');
		var service = this;
		service.getAll = getAll;
		service.getOne = getOne;
		service.add = add;
		service.edit = edit;
		service.remove = remove;
		service.start = start;
		service.callMatch = callMatch;
		service.clearCalls = clearCalls;
		service.selectWinner = selectWinner;

		service.types = [{
			name: "Double elimination",
			value: "2KO"
		}, {
			name: "Singe elimination",
			value: "1KO"
		}];

		function start(id) {
			return $http({
				method: 'PATCH',
				url: config.api_url + [resource, id].join('/'),
				data: {action: 'start'}
			}).then(function(res) {
				return res.data;
			});
		}
		function callMatch(id, matchId, tableNumber) {
			return $http({
				method: 'PATCH',
				url: config.api_url + [resource, id].join('/'),
				data: { 
					action: 'callMatch',
					matchId: matchId,
					table: tableNumber
				}
			}).then(function(res) {
				return res.data.match;
			});
		}
		function clearCalls(id, matchId) {
			return $http({
				method: 'PATCH',
				url: config.api_url + [resource, id].join('/'),
				data: { 
					action: 'clearCalls',
					matchId: matchId
				}
			}).then(function(res) {
				return res.data;
			});
		}
		function selectWinner(id, matchId, winnerId) {
			return $http({
				method: 'PATCH',
				url: config.api_url + [resource, id].join('/'),
				data: {
					action: 'selectWinner',
					matchId: matchId,
					winnerId: winnerId
				}
			}).then(function(res) {
				return res.data;
			});
		}

		// CRUD
		function getAll() {
			return $http({
				method: 'GET',
				url: config.api_url + resource
			}).then(function(res) {
				return res.data;
			});
		}
		function getOne(id) {
	  	return $http({
	  		method: 'GET',
	  		url: config.api_url + [resource, id].join('/')
	  	}).then(function(res) {
	  		return res.data;
	  	});
	  }
		function add(competition) {
			return $http({
				method: 'POST',
				url: config.api_url + resource,
				data: competition
			}).then(function(res) {
				if(!res.data.competition) $q.reject(res);
				return res.data.competition;
			});
		}
		function edit(id, data) {
			return $http({
				method: 'PUT',
				url: config.api_url + [resource, id].join('/'),
				data: data
			}).then(function(res) {
				if(!res.data.competition) $q.reject(res);
				return res.data.competition;
			});
		}
		function remove(id) {
			return $http({
				method: 'DELETE',
				url: config.api_url + [resource, id].join('/')
			}).then(function(res) {
				return res.data;
			});
		}
	}

	return CompetitionService;
}