import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/polls.css';

function Polls(props) {

  const { polls } = props;


  const pollName = async (_pollID, _CandidateID) => {
    const pollNamePromise = await props.votingContract.viewPollName(_pollID, _CandidateID)
    return pollNamePromise
  }

  // pollName(1,1)
  //   .then(result=>{
  //   setNameOfPoll(result)})
  //   .then(console.log(nameOfPoll))

  // console.log(pollName(1,1))


  const [array , setArray] = useState([]);

  
  const fn = async () => {
    for (let index = 0; index < polls; index++) {
      const item = await pollName(index+1, 1)
      setArray(oldArray => [...oldArray, item]);
    }
  }


  useEffect(() => {
    fn()
  })

  return (
    <div className='poll-section'>
    <div className='allPolls'>

      {array.length > 0 && array.map((arr, index)=>{

        return (
        <Link to={`/poll/${index+1}`}  className='poll' key={index+1}>
          <h1 className='poll-number'>{index+1}</h1>
          <h2 className='poll-title'>{arr}</h2>
        </Link>
        
        )
        
      })}
      
      </div>
      </div>

  )




}

export default Polls;