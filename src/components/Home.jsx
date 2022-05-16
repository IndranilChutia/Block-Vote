import React from 'react';
import Polls from './Polls';
import Header from './Header';
import NavigationPane from './NavigationPane';
import '../styles/home.css'

const Home = (props) => {

  const { isConnected, connectWallet, polls, votingContract } = props;

  return (
    <div className="App">
      <Header isConnected={isConnected} connectWallet={connectWallet}/>
      <main>
        <NavigationPane />
        {isConnected === true ? <Polls polls={polls} votingContract={votingContract} /> : null}
      </main>
    </div>
  );
}

export default Home