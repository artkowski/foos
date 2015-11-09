var _ = require('lodash');

module.exports = /* @ngInject */ function($q, $injector, $timeout) {
	var NoticeService = {
		response: response,
		responseError: responseError
	};

	return NoticeService;

	function response(res) {
		if(res.config.method != 'GET') {
			console.log(res);
			// api zawsze przy 200 powinno być ok, bez sprwadzania daty
			// if(res.data.success) {
			var Notification = $injector.get('Notification');
			Notification.success(res.data.message || "Success");
			// } else {
				// return resError(res);
			// }
		}

		return res;
	}

	function responseError(res) {
		var Notification = $injector.get('Notification');
		console.error(res);

		// reply request
		if (res.status <= 0 || res.status == 408 || res.status > 500) {
      var $http = $injector.get('$http');
    	Notification.warning('Connection problem ' + res.config.url);
      return $timeout(function() {
        return $http(res.config);
      }, 3000, false);
    }

    if(res.status == 401) {
    	//logout user
    	var AuthService = $injector.get('AuthService');
    	AuthService.logout();
    }

		var message = res.data.message 
			|| res.data.error && res.data.error.message 
			|| res.statusText || false; 

		var error = res.data.error || false;
		if(res.data.error) {
			_.each(error.errors, function(each) {
				message+= "<br /> " + each.message
			});
		}
		Notification.error(message);
		return $q.reject(res);
	}

}