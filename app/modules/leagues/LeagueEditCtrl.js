

module.exports =  /* @ngInject */ function(currentLeague, $state, $stateParams, $modalInstance, LeagueService) {
	var vmModal = this;
	vmModal.form = _.clone(currentLeague, true);
	vmModal.close = function() { return $modalInstance.close()};
	vmModal.save = save;
	vmModal.remove = remove;

	console.log(LeagueService)

	function save() {
		console.log(LeagueService);
		return LeagueService.edit(currentLeague._id, vmModal.form).then(function(edited) {
			currentLeague = _.extend(currentLeague, edited);
			vmModal.close();
		});
	}
	function remove() {
		if(!confirm("Are you sure to delete?")) return;
		return LeagueService.remove(currentLeague._id).then(function(data) {
			$modalInstance.close();
			goToIndex();
		});
	}
	function goToIndex() {
		$state.go('indexView');
	}
}