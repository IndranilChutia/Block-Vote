import React, {useState} from 'react';
import { ethers } from 'ethers';

import votingABI from '../contracts/votingABI.json';
import Header from './Header';
import NavigationPane from './NavigationPane';


import '../styles/createPoll.css'

const CreatePoll = (props) => {
  const { isConnected, connectWallet, contractAddress, polls } = props;


  const [title, setTitle] = useState('');
  const [addedCandidate, setAddedCandidate] = useState(false);


  // Add Candidate Function
  const addCandidate = async (event) =>{
    event.preventDefault();
    const data = new FormData(event.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const votingContractWrite = new ethers.Contract(contractAddress, votingABI, signer);
    await votingContractWrite.input((polls+1), data.get('_candidateKey'), title, data.get('_candidateName'), data.get('_imgURL'));

    if(data.get('_candidateKey')==='2'){
      setAddedCandidate(true)
    }

  }



  // Add Poll Function
  const addPoll = async (event) =>{
    event.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const votingContractWrite = new ethers.Contract(contractAddress, votingABI, signer);
    await votingContractWrite.addPoll((polls+1));
  }


  


  return (
    <div className="App">
      <Header isConnected={isConnected} connectWallet={connectWallet}/>
      <main>
        <NavigationPane />
        <div className='pollCreationPage'>
          <header className='createPollHeader'>


            <input className='title' name='poll-title' placeholder='Edit Poll Title Here' autoComplete='off' spellCheck='false' 
                  onChange={event=> setTitle(event.target.value)}/>

            {addedCandidate === true? <button to={'/'} className="addPollButton" onClick={addPoll}>Add Poll</button> : <button to={'/'} className="addPollButton" disabled>Add Candidate First</button>}


          </header>
          <div className="addCandidate">
            <div className='candidateInfo'>

              <form className='candidateForm' onSubmit={addCandidate}>
                <h2>Candidate <input type='text' className='candidate-key' name='_candidateKey' value='1' ></input> </h2>
                
                <div className='inputFields'>
                  <div className='candidate-name'>
                    <span>Name: </span>
                    <input type='text' autoComplete='off' required name='_candidateName'/>
                  </div>
                  <div className='candidate-photo'>
                    <span>Image: </span>
                    <input type='text' autoComplete='off' requied name='_imgURL'/>
                  </div>
                </div>
                <button type='submit' className='addCandidateButton'>Add Candidate</button>
              </form>

            </div>
            <div className='candidateInfo'>

              <form className='candidateForm'  onSubmit={addCandidate}>
                <h2>Candidate <input type='text' className='candidate-key' name='_candidateKey' value={'2'} ></input> </h2>
                <div className='inputFields'>
                  <div className='candidate-name'>
                    <span>Name: </span>
                    <input type='text' autoComplete='off' required name='_candidateName'/>
                  </div>
                  <div className='candidate-photo'>
                    <span>Image: </span>
                    <input type='text' autoComplete='off' required name='_imgURL'/>
                  </div>
                </div>
                <button type='submit' className='addCandidateButton'>Add Candidate</button>
              </form>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatePoll;