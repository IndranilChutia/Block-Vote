import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import votingABI from './contracts/votingABI.json';
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import VotingPage from './components/votingPage';
import CreatePoll from './components/CreatePoll';

import './App.css';





const App = () => {

  const [isConnected, setConnected] = useState(false);
  const [polls, setPolls] = useState(0);



  const contractAddress = "0x91a2F0De7529Ce5E525dC46dC0a33adBEd9eEa34"
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()


  const ABI = votingABI;

  // The Contract object
  const votingContract = new ethers.Contract(contractAddress, ABI, provider);


  // Connects the wallet

  const connectWallet = async () => {
    await provider.send("eth_requestAccounts", []);
    checkConnected()
    totalPolls()
  }

  // Check for the user account address and make sure that the user stays connected
  const checkConnected = async () => {
    const userAddress = await votingContract.walletAddress();
    if (userAddress) { 
      sessionStorage.setItem("connectedUser", userAddress);
      setConnected(true);
    }
  }


  useEffect(()=>{
    if(sessionStorage.getItem("connectedUser")){
      connectWallet()
    }
  },[])



  const totalPolls = async () => {
    const totalPolls = await votingContract.totalPolls();
    setPolls(totalPolls.toNumber());
  }

  

  return (
    <Routes>
      <Route path='/' element={<Home 
          isConnected={isConnected} connectWallet={connectWallet}
          polls={polls} votingContract={votingContract}/>} />

      <Route path='/poll/:id' element={<VotingPage 
          isConnected={isConnected} connectWallet={connectWallet}
          votingContract={votingContract} contractAddress={contractAddress}/>} />

      <Route path='/add-candidate/' element={<CreatePoll
          isConnected={isConnected} connectWallet={connectWallet}
          polls={polls} votingContract={votingContract} signer={signer} contractAddress={contractAddress}/>} />
    </Routes>
  )
}

export default App;
