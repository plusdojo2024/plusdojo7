import React from 'react';
import './LoginHeader.css';
export default class LoginHeader extends React.Component{
    render(){
        return(
            <div className="login_header">
              <img src="./images/tasukuru.png" className="login-logo" alt="login_logo" />
            </div>
        );
    }
}