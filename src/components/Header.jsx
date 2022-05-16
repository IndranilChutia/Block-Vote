import React from 'react';
import logo from '../logo.svg'
import '../styles/header.css'
import {Link} from 'react-router-dom'

const Header = (props) => {

    const { connectWallet, isConnected } = props;
    

    return (
      <header className="App-header">
        <Link to={'/'} className='logoArea'>
          <img src={logo} className="appLogo" alt="logo"></img>
          <p className='appName'>BlockVote</p>
        </Link>
        <div className='connectWeb3' onClick={connectWallet} >{isConnected ? "Connected" : "Connect"}</div>
      </header>
    );
};

export default Header;