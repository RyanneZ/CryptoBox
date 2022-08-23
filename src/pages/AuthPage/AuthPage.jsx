import React from 'react'
import './AuthPage.css';

import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';


export default class AuthPage extends React.Component {
  state = {
    showLogin: true,
  }

  render() {
    return (
      <main className="AuthPage" style={{marginTop: '200px'}}>
        <div>
          

        </div>
        {/* Another ternary operator! */}
        {/* If showLogin is true, show the login form. If false, show the signup form */}
        {this.state.showLogin ? 
        <LoginForm setUserInState={this.props.setUserInState}/> : 
        <SignUpForm setUserInState={this.props.setUserInState} />}

        <p  style={{textAlign:'center'}}  onClick={() => this.setState({ showLogin: !this.state.showLogin })}>
          {this.state.showLogin ? <span>Or <a>sign up</a> now</span> : <span>Already have an account? Please <a>log in</a> </span>}
        </p>
      </main>
    );
  }
}