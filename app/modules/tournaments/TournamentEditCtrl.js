

module.exports =  /* @ngInject */ function(currentTournament, $state, $stateParams, $modalInstance, TournamentService) {
	var Tournament = new TournamentService($stateParams.leagueId);

	var vmModal = this;
	vmModal.form = _.clone(currentTournament, true);
	vmModal.close = function() { return $modalInstance.close()};
	vmModal.save = save;
	vmModal.remove = remove;

	function save() {
		return Tournament.edit(currentTournament._id, vmModal.form).then(function(edited) {
			currentTournament = _.extend(currentTournament, edited);
			vmModal.close();
		});
	}
	function remove() {
		if(!confirm("Are you sure to delete?")) return;
		return Tournament.remove(currentTournament._id).then(function(data) {
			$modalInstance.close();
			goToLeague();
		});
	}
	function goToLeague() {
		$state.go('league-details', $stateParams);
	}
}