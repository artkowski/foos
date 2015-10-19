module.exports = angular.module('foosApp.modules', [
	require('./users').name,
	require('./leagues').name
])
.controller('MainCtrl', require('./MainCtrl'))