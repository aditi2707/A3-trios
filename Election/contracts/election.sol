pragma solidity ^0.5.0;
  contract election{
	struct cand{
		uint id;
		string party;
		string name;
		uint v_count;
	}
	constructor() public {
		addcand("XYZ" , "ANMOL SHARMA");
		addcand("ABC", "ADITI SRIVASTAVA");
		addcand("none of the above" , "NOTA");
	}

	 event votedEvent (
        uint indexed cand_id
        );
	mapping (address => bool) public voter;
	
	mapping(uint => cand) public candidate;
	uint public CandCount;
	function addcand(string memory p,string memory n) private{
		CandCount++;
		candidate[CandCount]=cand(CandCount,p,n,0);
	}

	function vote (uint cand_id) public {

		require (!voter[msg.sender]);
		require (cand_id>0 && cand_id<=CandCount);
		
		voter[msg.sender]=true;
		candidate[cand_id].v_count++;
		emit votedEvent(cand_id);
		
	}
	
	
}
