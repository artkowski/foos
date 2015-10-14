// serwis z userami zwracający singleton

module.exports = /* @ngInject */ function($config, $q, $http) {
	// angular style guide
	var resource = 'users';

	var UserService = {
		getAll: getAll,
		add: add,
		edit: edit,
		remove: remove
	};
	return UserService;

	function getAll() {
    return $http({
      method: 'GET',
      url: $config.api_url + resource
    }).then(function(res) {
    	return res.data;
    });
  }

  function add(user) {
  	return $http({
  		method: 'POST',
      url: $config.api_url + resource,
      data: user
  	}).then(function(res) {
  		if(res.data.success) {
    		return res.data.user;
    	}
    	return $q.reject(res);
  	});
  }

  function edit(id, data) {
  	return $http({
  		method: 'PUT',
  		url: $config.api_url + [resource, id].join('/'),
  		data: data
  	}).then(function(res) {
  		if(res.data.success) {
  			return res.data.user;
  		}
  		return $q.reject(res);
  	});
  }

  function remove(id) {
  	return $http({
  		method: 'DELETE',
  		url: $config.api_url + [resource, id].join('/'),
  	}).then(function(res) {
  		return res.data;
  	});
  }

};