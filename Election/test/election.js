var election=artifacts.require("./election.sol");
contract("election",function(accounts){
	it("initializes with three candidates",function(){
		return election.deployed().then(function(instance){
			return instance.CandCount();
		}).then(function(count){
			assert.equal(count,3);
		});
	});
it("it initializes the candidates with the correct value",function(){
	return election.deployed().then(function(instance){
		einstance=instance;
		return einstance.candidate(1);
	}).then(function(candidate){
		assert.equal(candidate[0],1,"contains the correct id");
		assert.equal(candidate[1],"XYZ","contains the correct party name");
		assert.equal(candidate[2],"ANMOL SHARMA","contains the correct name");
		assert.equal(candidate[3],0,"contains the correct vote count");
	return einstance.candidate(2);
}).then(function(candidate){
	assert.equal(candidate[0],2,"contains the correct id");
		assert.equal(candidate[1],"ABC","contains the correct party name");
		assert.equal(candidate[2],"ADITI SRIVASTAVA","contains the correct name");
		assert.equal(candidate[3],0,"contains the correct vote count");
		return einstance.candidate(3);
}).then(function(candidate){
	assert.equal(candidate[0],3,"contains the correct id");
		assert.equal(candidate[1],"none of the above","contains the correct party name");
		assert.equal(candidate[2],"NOTA","contains the correct name");
		assert.equal(candidate[3],0,"contains the correct vote count");
});

});
	it("allows a voter to cast a vote", function() {
    return election.deployed().then(function(instance) {
      electionInstance = instance;
      cand_id = 1;
      return electionInstance.vote(cand_id, { from: accounts[0] });
    }).then(function(receipt) {
      return electionInstance.voter(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the voter was marked as voted");
      return electionInstance.candidate(cand_id);
    }).then(function(candidate) {
      var v_count = candidate[3];
      assert.equal(v_count,1, "increments the candidate's vote count");
	})

  });
	it(" exception for invalid candidates", function() {
    return election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.vote(99, { from: accounts[1] })
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return electionInstance.candidate(1);
    }).then(function(candidate1) {
      var v_count = candidate1[3];
      assert.equal(v_count,1, "candidate 1 did not receive any votes");
      return electionInstance.candidate(2);
    }).then(function(candidate2) {
      var v_count = candidate2[3];
      assert.equal(v_count,1, "candidate 2 did not receive any votes");
      return electionInstance.candidate(3);
	}).then(function(candidate3) {
      var v_count = candidate3[3];
      assert.equal(v_count,1, "candidate 3 did not receive any votes");
    });
  });
	it("exception for multiple voting", function() {
    return election.deployed().then(function(i) {
      electionInstance = i;
      cand_id = 2;
      electionInstance.vote(cand_id, { from: accounts[1] });
      return electionInstance.candidate(cand_id);
    }).then(function(c) {
      var v_count = c[3];
      assert.equal(v_count, 1, "accepts first vote");
      return electionInstance.vote(cand_id, { from: accounts[1] })
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return electionInstance.candidate(1);
    }).then(function(c1) {
      var v_count = c1[3];
      assert.equal(v_count, 1, "candidate 1 did not receive any votes");
      return electionInstance.candidate(2);
    }).then(function(c2) {
      var v_count = c2[3];
      assert.equal(v_count, 1, "candidate 2 did not receive any votes");
      return electionInstance.candidate(3);
	}).then(function(candidate3) {
      var v_count = candidate3[3];
      assert.equal(v_count,1, "candidate 3 did not receive any votes");
    });
  });

});