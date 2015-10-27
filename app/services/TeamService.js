var config = require('../config');

module.exports = /* @ngInject */ function($q, $http) {
	var TeamService = function(params) {
		var resource = [
			'leagues',
			params.leagueId,
			'tournaments',
			params.tournamentId,
			'competitions',
			params.competitionId,
			'teams'
		].join('/');
		var service = this;
		service.getAll = getAll;
		service.getOne = getOne;
		service.add = add;
		service.edit = edit;
		service.remove = remove;

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
		function add(team) {
			return $http({
				method: 'POST',
				url: config.api_url + resource,
				data: team
			}).then(function(res) {
				if(!res.data.team) $q.reject(res);
				return res.data.team;
			});
		}
		function edit(id, data) {
			return $http({
				method: 'PUT',
				url: config.api_url + [resource, id].join('/'),
				data: data
			}).then(function(res) {
				if(!res.data.team) $q.reject(res);
				return res.data.team;
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

	return TeamService;
}