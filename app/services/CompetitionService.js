var config = require('../config')
console.log(config)
module.exports = /* @ngInject */ function($q, $http, $rootScope, socketFactory) {
	var CompetitionService = function(params) {
		console.log('CompetitionService fired')
		// return;
		var ioSocket = io.connect(config.host + ':' + config.port);
		var socket = new socketFactory({
			ioSocket: ioSocket
		});

		socket.on('message', function(data) {
			console.error('message', data);
			// alert('socket message');
			socket.emit('ping', { success: true })
		})

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
		service.getOneWs = getOneWs;
		service.add = add;
		service.edit = edit;
		service.remove = remove;
		service.start = start;
		service.callMatch = callMatch;
		service.clearCalls = clearCalls;
		service.selectWinner = selectWinner;
		service.ping = ping;

		service.types = [{
			name: "Double elimination",
			value: "2KO"
		}, {
			name: "Singe elimination",
			value: "1KO"
		}];

		function ping() {
			console.error('Ping!')
			socket.emit('competitions:changed', {competitionId: id});
			// console.log(socket);
			// socket.emit('ping', { success: true });
		}

		function start(id) {
			return $http({
				method: 'PATCH',
				url: config.api_url + [resource, id].join('/'),
				data: {action: 'start'}
			}).then(function(res) {
				_emitChanged(id);
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
				_emitChanged(id);
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
				_emitChanged(id);
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
				_emitChanged(id);
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

	  function getOneWs(id) {
	  	socket.on('competitions:changed', function(competition) {
	  		console.log('changed', competition);
	  	})

	  	socket.emit('competitions:get', _.extend(params, {competitionId: id}));
	  		// ,
	  		// function(competition) {

	  		// 	$rootScope.$emit('competition:get', competition)
	  		// 	console.log('callback', competition);
	  		// })
	  	// ioSocket.join('competition ' + id);
	  	socket.on('competitions:competition', function(competition) {
	  		console.log('competitions:competition')
  			$rootScope.$emit('competitions:get', competition)
	  	})
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
				_emitChanged(id);
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
		
		function _emitChanged(id) {
			socket.emit('competitions:changed', {competitionId: id});
		}
	}

	return CompetitionService;
}