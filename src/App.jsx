import React, {Component} from 'react';
import { Routes ,Route } from 'react-router-dom';
import { Layout, Typography, Space} from 'antd';
import './App.css';
import {Navbar, Homepage, Deposit, Cryptocurrencies, CryptoDetails, News,Trade} from './components';
import AuthPage from './pages/AuthPage/AuthPage';



const { Header, Sider, Content } = Layout;


class App extends Component {

  state = {
    user: null,
    collapsed: false,
    
    
  }
  
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });

  };

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData})
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      // YOU DO: check expiry!
      let userDoc = JSON.parse(atob(token.split('.')[1])).user // decode jwt token
      this.setState({user: userDoc})      
    }
  }

  logout = () => {
    localStorage.removeItem('user')
    this.setState({user: null})
   
  }
  
  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData})
  }
  setCollapsed = () => {
    this.setState({collapsed: true})
  }
  
  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // decode token
      if (payload.exp < Date.now() / 1000) {  // Check if our token is expired, and remove if it is (standard/boilerplate)
        localStorage.removeItem('token');
        token = null;
      } else { // token not expired! our user is still 'logged in'. Put them into state.
        let userDoc = payload.user // grab user details from token
        this.setState({user: userDoc})      
      }
    }
  }
  render() {
    return (
      <>
         {this.state.user ?  
     
      <div className='App'>
        <div className="navbar">
          <Navbar logout={this.logout}/>
        </div>
        
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
           <div className="routes">
              
              <Routes>
                <Route path='/' element={<Homepage user={this.state.user}/>} />
                <Route path='/deposit' element={<Deposit user={this.state.user}/>} />
                <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
                <Route path='/trade' element={<Trade handleChange={this.handleChange} user={this.state.user}/>} />
                <Route path='/news' element={<News />} />
              </Routes>
              
            </div>
        </Content>      
        <div className="main">
          <Layout>
         
           
          </Layout>
        </div>

      
        
      </div>
      
      : <AuthPage setUserInState={this.setUserInState}/>}
      </>
    )
  }
}

export default App;


