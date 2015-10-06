require('angular-ui-router');

module.exports = angular.module('foosApp.routes', [
	'ui.router'
])
.config(require('./main'))
.config(require('./users'))