var config = require('../config');

module.exports = /* @ngInject */ function($q, $http) {
	var PlayerService = function(leagueId) {
		var resource = ['leagues', leagueId, 'players'].join('/');
		var service = this;
		service.getAll = getAll;
		service.add = add;
		service.edit = edit;
		service.remove = remove;

		return service;

		function getAll() {
			return $http({
				method: 'GET',
				url: config.api_url + resource
			}).then(function(res) {
				return res.data;
			});
		}
		function add(player) {
			return $http({
				method: 'POST',
				url: config.api_url + resource,
				data: player
			}).then(function(res) {
				if(!res.data.player) $q.reject(res);
				return res.data.player;
			});
		}
		function edit(id, data) {
			return $http({
				method: 'PUT',
				url: config.api_url + [resource, id].join('/'),
				data: data
			}).then(function(res) {
				if(!res.data.player) $q.reject(res);
				return res.data.player;
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

	return PlayerService;
}