require('angular-ui-router');

module.exports = angular.module('foosApp.routes', [
	'ui.router'
])
.config(require('./main'))
.config(require('./users'))
.config(require('./leagues'))
.config(require('./leagues/players'))
.config(require('./leagues/tournaments'))
.config(require('./leagues/tournaments/competitions'))