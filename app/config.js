var config = {
	host: "192.168.1.10",
	port: 3000,
}

config.api_url = function() { return 'http://' + config.host + ':' + config.port + '/' }(),

module.exports = config;
