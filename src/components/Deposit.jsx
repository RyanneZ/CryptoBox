import React, {Component} from 'react'
import {Button, Menu, Typography, Avatar,Alert,InputNumber,Statistic  } from 'antd'
import { Tabs } from 'antd';
import { Select } from 'antd';

const { TabPane } = Tabs;
const numberOptions = { 
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 
};

class Deposit extends Component {

  state = {
    type: 'deposit',
    amount: 0,
    balance: 0,
    alert:''
  }

  async componentDidMount() {
    try {
      let fetchResponse = await fetch("/api/users/deposit", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({amount: 0, email: this.props.user.email}) // <-- send this object to server
        }) 
      let serverResponse = await fetchResponse.json() // <-- decode fetch response
      console.log("Success:", serverResponse) 
      this.setState({amount: 0,balance: parseInt(serverResponse.currency)})

    }catch(err) {
      console.error('error', err)
    }
  }
 

  handleChange = (value) => {
    this.setState({
      amount: value,
      alert: ''
     
    });
  };
  
  handleDeposit = async (e) => {
    e.preventDefault();
 
    try {
      let fetchResponse = await fetch("/api/users/deposit", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({amount: this.state.amount, email: this.props.user.email}) // <-- send this object to server
        }) 
      let serverResponse = await fetchResponse.json() // <-- decode fetch response
      console.log("Success:", serverResponse) 
      this.setState({amount: 0,balance: parseInt(serverResponse.currency)})
        // <-- log server response

      // if the order was sent over without errors, set state to empty
      
    } catch (err) {
      console.error("Error:", err) // <-- log if error 
    }
  }
  
  handleWithdrawl = async (e) => {
    e.preventDefault();

    if (this.state.amount > this.state.balance) {
      this.setState({alert: 
      <Alert message="Your balance amount is lower than your withdrawal amount." type="error" showIcon />})  
      return
    }
    try {
      let fetchResponse = await fetch("/api/users/deposit", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({amount: -1 * this.state.amount, email: this.props.user.email}) // <-- send this object to server
        }) 
      let serverResponse = await fetchResponse.json() // <-- decode fetch response
      console.log("Success:", serverResponse)   // <-- log server response

      // if the order was sent over without errors, set state to empty
      this.setState({amount: 0,balance:parseInt(serverResponse.currency)})
    } catch (err) {
      console.error("Error:", err) // <-- log if error 
    }
  }


  render() {

    return (
      <div>
      
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Add Cash" key="1">
            <form className='trade-form'>
            <span style={{fontSize:"2rem",color: 'rgba(0, 0, 0, 0.45)'}} >$ &nbsp;</span> 
              <InputNumber  name='amount'type="number" min={0} value={this.state.amount} onChange={this.handleChange} size='large'/>
              <br />
              <br />
              <div className='wallet'>
                Add to &nbsp;<img src='https://cdn.coinranking.com/kz6a7w6vF/usd.svg' style={{width: '1rem', height: '1rem'}} />&nbsp; &nbsp;USD wallet
                <br />
              </div>
              <button className='ant-btn ant-btn-primary' type='submit' onClick={this.handleDeposit}>Confirm</button>
            </form>
            <br />
            <br />
            <Statistic title="Cash Balance(USD):" value={Number(this.state.balance).toLocaleString('en', numberOptions)}/>
            
          </TabPane>
          <TabPane tab="Cashout" key="2">
            <form className='trade-form'>
            <span style={{fontSize:"2rem",color: 'rgba(0, 0, 0, 0.45)'}} >$ &nbsp;</span> 
            <InputNumber  name='amount'type="number" min={0} value={this.state.amount} onChange={this.handleChange} size='large'/>
              {this.state.alert}
                <br />
                <br />
                <div className='wallet'>
                  With &nbsp;<img src='https://cdn.coinranking.com/kz6a7w6vF/usd.svg' style={{width: '1rem', height: '1rem'}} />&nbsp; &nbsp;USD wallet
                  <br />
                </div>
            
              <button className='ant-btn ant-btn-primary' type='submit' onClick={this.handleWithdrawl}>Confirm</button>
            </form>
            <br />
            <br />
            <Statistic title="Cash Balance(USD):" value={Number(this.state.balance).toLocaleString('en', numberOptions)}/>
          </TabPane>
        </Tabs>
      </div>
    )
  }

}
export default Deposit

