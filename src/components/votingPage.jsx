import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";

import votingABI from '../contracts/votingABI.json'

import Header from "./Header";
import NavigationPane from "./NavigationPane";

import '../styles/votingPage.css'

const VotingPage = (props) => {

    const {isConnected, connectWallet, votingContract, contractAddress } = props;

    const {id}= useParams();


    const [nameOfPoll, setPollName] = useState('')
    const [candidate , setCandidate] = useState([]); 
    const [votes , setVotes] = useState([]); 
    const [candidateImage , setCandidateImage] = useState([]); 


    // Funtion to get the Candidate Name
    const candidateName = async (_pollID, _CandidateID) => {
      const candidateNamePromise = await votingContract.viewCandidateName(_pollID, _CandidateID);
      return (candidateNamePromise)
    }  

    // Adding the candidate name to Array
    const fn = async () => {
      for (let index = 0; index < 2; index++) {
        const item = await candidateName(id, index+1)
        setCandidate(oldArray => [...oldArray, item]);
      }
    }


    // Function to get the Poll Name
    const pollName = new votingContract.viewPollName(id,1)
    pollName.then((result)=>setPollName(result))
    
    



    // Function to get the Vote Count
    const voteCount = async (_pollID, _CandidateID) => {
      const voteCountPromise = await votingContract.voteCount(_pollID, _CandidateID)
      return voteCountPromise;
    }

    // Adding the vote counts to Array
    const currentVote = async () => {
      for (let index = 0; index < 2; index++) {
        const item = await voteCount(id, index+1)
        setVotes(oldArray => [...oldArray, item.toNumber()]);
      }
    }


    // Function to get Candidate Image
    const imgURL = async (_pollID, _CandidateID) => {
      const candidateImagePromise = await votingContract.viewCandidateImage(_pollID, _CandidateID)
      return candidateImagePromise;
    }

    // Adding the images to Array
    const URL = async () => {
      for (let index = 0; index < 2; index++) {
        const item = await imgURL(id, index+1)
        setCandidateImage(oldArray => [...oldArray, item]);
      }
    }


  useEffect(() => {
    fn()
    currentVote()
    URL()
  },[])


  // Voting Functions
  const voteCandidate1 = async () =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const votingContractWrite = new ethers.Contract(contractAddress, votingABI, signer);
    await votingContractWrite.incrementVote(id, 1);
    await window.location.reload();
  }

  const voteCandidate2 = async () =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const votingContractWrite = new ethers.Contract(contractAddress, votingABI, signer);
    await votingContractWrite.incrementVote(id, 2).on('confirmation', reloadPage)
    
  }

  const reloadPage = () =>{
    window.location.reload();
  }



    return (
      <div className="App">
        <Header isConnected={isConnected} connectWallet={connectWallet} />
        <main>
          <NavigationPane />
          <div className="pollPage">
            <span className="pollTitle">{nameOfPoll}</span>
            <div className="pollingStation">
              <div className="candidate" key={"candidate1"}>
                <div className="candidateImg">
                  <img className="candidateProfileImage" src={candidateImage[0]} alt="candidate_1_image" />
                </div>
                <div className="candidateName">{candidate[0]}</div>
                <div className="voteButton" onClick={voteCandidate1}>Vote</div>
                <div className="voteCount">Votes: {votes[0]}</div>
              </div>
              <div className="candidate" key={"candidate2"}>
                <div className="candidateImg">
                  <img className="candidateProfileImage" src={candidateImage[1]} alt="candidate_2_image" />
                </div>
                <div className="candidateName">{candidate[1]}</div>
                <div className="voteButton" onClick={voteCandidate2}>Vote</div>
                <div className="voteCount">Votes: {votes[1]}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
}

export default VotingPage;