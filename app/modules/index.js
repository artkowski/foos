module.exports = angular.module('foosApp.modules', [
	require('./users').name
])
.controller('MainCtrl', require('./MainCtrl'))