var config = require('../config');

module.exports = /* @ngInject */ function($q, $http) {
	var resource = 'leagues';

	var LeagueService = {
		getAll: getAll,
		getOne: getOne,
		add: add,
		edit: edit,
		remove: remove
	};
	return LeagueService;

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

  function add(league) {
  	return $http({
  		method: 'POST',
      url: config.api_url + resource,
      data: league
  	}).then(function(res) {
  		if(!res.data.league) return $q.reject(res);
  		return res.data.league;
  	});
  }

  function edit(id, data) {
  	return $http({
  		method: 'PUT',
  		url: config.api_url + [resource, id].join('/'),
  		data: data
  	}).then(function(res) {
  		if(!res.data.league) return $q.reject(res);
			return res.data.league;
  	});
  }

  function remove(id) {
  	return $http({
  		method: 'DELETE',
  		url: config.api_url + [resource, id].join('/'),
  	}).then(function(res) {
  		return res.data;
  	});
  }

};