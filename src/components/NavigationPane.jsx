import React from 'react';
import {Link} from 'react-router-dom'
import '../styles/navigationPane.css'

const NavigationPane = () => {
    return (
        <div className='navigationPane'>
          <ul className='navigationLinks'>
            <li>
              <Link to={'/'} className='links'>Home</Link>
            </li>
            <li >
              <Link to={'/add-candidate/'} className='links'>Create Poll</Link>
            </li>
          </ul>
        </div>
    );
};

export default NavigationPane;