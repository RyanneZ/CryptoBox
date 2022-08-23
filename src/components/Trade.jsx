import { Tabs } from 'antd';
import React, {Component, useState, useEffect} from 'react';
import { Select } from 'antd';
import { InputNumber, Space , Spin, Alert, Row, Col, Statistic,Typography} from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi'
import millify from 'millify';
const {Title} = Typography



const { Option } = Select;
const { TabPane } = Tabs;


const numberOptions = { 
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 
};

const Trade = (props) => {
 
  const [coinList, setCoinList] = useState([])
  const [selectedCoin, setSelectedCoin] = useState('Bitcoin')
  const [amount, setAmount] = useState(0)
  const [price, setPrice] = useState(0)
  const [balances, setBalances] = useState({})
  const [alert, setAlert] = useState('')


  const { data: cryptoList, isFetching } = useGetCryptosQuery(10)
  console.log('cryptoList1:',cryptoList)


  useEffect(async () => {
    setCoinList(cryptoList?.data?.coins);
    try {
      let fetchResponse = await fetch("/api/users/buy", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({amountCurrency:amount,coinName:selectedCoin, amountCoin: amount/price,email: props.user.email}) // <-- send this object to server
        }) 
      let serverResponse = await fetchResponse.json() // <-- decode fetch response
      console.log("Success:", serverResponse) 
      setAmount(0)
      setBalances(serverResponse)
      console.log(balances)
        // <-- log server response

      // if the order was sent over without errors, set state to empty
      
    } catch (err) {
      console.error("Error:", err) // <-- log if error 
    }


  },[])
  if(isFetching) return <Spin />

  const handleChange = (value) => {
    setSelectedCoin(value)
    let filteredCoin = coinList.filter(c=>c.name==value)
    setPrice(filteredCoin[0].price)
  }

  //Default Value for Price
  if (price === 0) if(coinList !== undefined) if (coinList.length > 0) handleChange(selectedCoin)

  //No Coin Data Yet
  if (coinList === undefined){
    return <Spin />
  }



  const handleBuy = async (e) => {
    e.preventDefault();
    if (amount > balances.currency) {
     setAlert( <Alert message="Your balance is not enough!" type="error" showIcon />)  
      return
    }
    try {
      let fetchResponse = await fetch("/api/users/buy", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({amountCurrency:amount,coinName:selectedCoin, amountCoin: amount/price,email: props.user.email}) // <-- send this object to server
        }) 
      let serverResponse = await fetchResponse.json() // <-- decode fetch response
      console.log("Success:", serverResponse) 
      setAmount(0)
      setBalances( serverResponse)

    } catch (err) {
      console.error("Error:", err) // <-- log if error 
    }
  }
  const handleSell = async (e) => {
    e.preventDefault();
    try {
      let fetchResponse = await fetch("/api/users/buy", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({amountCurrency:-1 *amount,coinName:selectedCoin, amountCoin: -1 *amount/price,email: props.user.email}) // <-- send this object to server
        }) 
      let serverResponse = await fetchResponse.json() // <-- decode fetch response
      console.log("Success:", serverResponse) 
      setAmount(0)
      setBalances( serverResponse)

    } catch (err) {
      console.error("Error:", err) // <-- log if error 
    }

  }

  return (
    <Tabs defaultActiveKey="1" centered>
    <TabPane tab="Buy" key="1" className='tabpane'>
    
    <div className='trade'>
      <form className='trade-form'>
      <span style={{fontSize:"2rem",color: 'rgba(0, 0, 0, 0.45)'}} >$ &nbsp;</span> 
       <InputNumber  name='amount'type="number" min={0} value={amount} onChange={(value) => setAmount(value)} size='large'/>
        {alert}
      
        <br />
        <br />
        <Select
          defaultValue='Bitcoin'
          value = {selectedCoin}
          onChange={handleChange}
        >
          {coinList.map(c=><Option value={c.name} key={c.name}><img style={{width: '1rem', height: '1rem'}}
          src={c.iconUrl}/>&nbsp;&nbsp;&nbsp;&nbsp;{c.name}</Option>)}
        
        </Select>
        <br />
        Price: {Number(price).toLocaleString('en', numberOptions)}
        <br/><br/>
        With &nbsp;<img src='https://cdn.coinranking.com/kz6a7w6vF/usd.svg' style={{width: '1rem', height: '1rem'}} />&nbsp; &nbsp;USD wallet
        <br />
        <button className='ant-btn ant-btn-primary' type='submit' onClick={handleBuy}>Confirm</button>
      </form>
      <br /><br />
  
      <Row >
        <Col  xs={{span: 5,offset: 1,}} lg={{span: 6,offset: 2, }}><Statistic title="Cash Balance(USD):" value={Number(balances.currency).toLocaleString('en', numberOptions)}/></Col>
        <Col  xs={{span: 5,offset: 1,}} lg={{span: 6,offset: 2, }}><Statistic title={`${selectedCoin} Balance(coin): `} value={Number(balances[selectedCoin]).toLocaleString('en', numberOptions)} /></Col>
        <Col  xs={{span: 5,offset: 1,}} lg={{span: 6,offset: 2, }}><Statistic title={`${selectedCoin} Balance(USD): `} value={Number(balances[selectedCoin]* price).toLocaleString('en', numberOptions) } /></Col>
       
      </Row>
    </div>

   

    </TabPane>
    <TabPane tab="Sell" key="2">
        
    <form className='trade-form'>
      <span style={{fontSize:"2rem",color: 'rgba(0, 0, 0, 0.45)'}} >$ &nbsp;</span> 
        <InputNumber  name='amount'type="number" min={0} value={amount} onChange={(value) => setAmount(value)} size='large'/>
       
        <br />
        <br />

     
        <Select
          defaultValue='Bitcoin'
          value = {selectedCoin}
          style={{
            width: '10rem',
          }}
          onChange={handleChange}
        >
          {coinList.map(c=><Option value={c.name} key={c.name}><img style={{width: '1rem', height: '1rem'}}
          src={c.iconUrl}/>&nbsp;&nbsp;&nbsp;&nbsp;{c.name}</Option>)}
        
        </Select>
        <br />
        Price:<span style={{color:'#1890ff'}}>{`  ${Number(price).toLocaleString('en', numberOptions)}`}</span>
     
        <br/><br/>
        Add to &nbsp;<img src='https://cdn.coinranking.com/kz6a7w6vF/usd.svg' style={{width: '1rem', height: '1rem'}} />&nbsp; &nbsp;USD wallet
        <br />
        <button className='ant-btn ant-btn-primary' type='submit' onClick={handleSell}>Confirm</button>
      </form>
    
      <br />
      <br />

      <Row >
        <Col  xs={{span: 5,offset: 1,}} lg={{span: 6,offset: 2, }}><Statistic title="Cash Balance(USD):" value={Number(balances.currency).toLocaleString('en', numberOptions)}/></Col>
        <Col  xs={{span: 5,offset: 1,}} lg={{span: 6,offset: 2, }}><Statistic title={`${selectedCoin} Balance(coin): `} value={Number(balances[selectedCoin]).toLocaleString('en', numberOptions)} /></Col>
        <Col  xs={{span: 5,offset: 1,}} lg={{span: 6,offset: 2, }}><Statistic title={`${selectedCoin} Balance(USD): `} value={Number(balances[selectedCoin]* price).toLocaleString('en', numberOptions) } /></Col>
       
      </Row>
    </TabPane>
  </Tabs >
  )

}

export default Trade;