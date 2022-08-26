import React, {useEffect, useState} from 'react'
import millify from 'millify'
import { Typography,Spin,Avatar } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Link } from 'react-router-dom';

import { News} from '../components';

import Portfolio from './Portfolio/Portfolio';
import { UserOutlined } from '@ant-design/icons';

const {Title} = Typography


const Homepage = (props) => {
  const [balances, setBalances] = useState({})

  const { data, isFetching } = useGetCryptosQuery(10)
  
  

  
  useEffect(async () => {
    console.log('tyler')
    try {
      let fetchResponse = await fetch("/api/users/portfolio", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: props.user.email}) // <-- send this object to server
        }) 
      console.log(fetchResponse)
      let serverResponse = await fetchResponse.json() // <-- decode fetch response
      console.log("Success:", serverResponse) 
      setBalances(serverResponse)
      console.log(balances)
        // <-- log server response

      // if the order was sent over without errors, set state to empty
      
    } catch (err) {
      console.error("Error:", err) // <-- log if error 
    }
  },[])
  
  if(isFetching) return <Spin />
  return (
    <div>
      <div className='welcome'>
        <div className='username'>
          <Avatar  size="medium" icon={<UserOutlined />} />&nbsp;&nbsp;&nbsp;
          <span  className='home-title'> {props.user.name}&nbsp;&nbsp;</span>
          <br />
        </div>
        <p style={{color: 'rgba(0, 0, 0, 0.45'}}>{props.user.email}</p>
      </div>

     
      <Portfolio balances={balances}/>
     
      <div className="home-heading-container">
        <Title level={4} className='home-title'>News</Title>
        <h4 level={3} className='show-more'><Link to='/news'>View more</Link></h4>
      </div>
      <News simplified />
    </div>
  )
}

export default Homepage
