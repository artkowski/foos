var _ = require('lodash')

module.exports = /* @ngInject */ function($scope) {
	$scope._ = _;
	console.log('MainCtrl init');
};