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

		service.types = [{
			name: "Double elimination",
			value: "2KO"
		}, {
			name: "Singe elimination",
			value: "1KO"
		}];

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