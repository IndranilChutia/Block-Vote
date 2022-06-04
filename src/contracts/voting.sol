//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract map{

    struct Candidates{
        string pollName;
        string candidate;
        string img;
        uint votes;
    }
    mapping (uint => mapping(uint => Candidates)) public candidates;

    uint Poll = 0;

    function addPoll(uint pollID) public {
        candidates[pollID][0] = Candidates("", "", "", 0);
        Poll++;
    }  

    function input(uint pollID, uint candidateID, string memory _pollName, string memory _name, string memory _img) public {
        candidates[pollID][candidateID] = Candidates(_pollName, _name, _img, 0);
    }  

    function incrementVote(uint pollID, uint candidateID) public{
        candidates[pollID][candidateID].votes++;
    }

    function viewCandidateImage(uint _PollID, uint _CandidateID) public view returns(string memory){
        return candidates[_PollID][_CandidateID].img;
    }

    function viewCandidateName(uint _PollID, uint _CandidateID) public view returns(string memory){
        return candidates[_PollID][_CandidateID].candidate;
    }

    function viewPollName(uint _PollID, uint _CandidateID) public view returns(string memory){
        return candidates[_PollID][_CandidateID].pollName;
    }

    function voteCount(uint _PollID, uint _CandidateID) public view returns(uint){
        return candidates[_PollID][_CandidateID].votes;
    }

    address public walletAddress = msg.sender;

    function totalPolls() public view returns(uint){
        return Poll;
    }

    

}
