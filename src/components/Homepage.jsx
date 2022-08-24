import React, {useEffect, useState} from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic,Spin , Table} from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Link } from 'react-router-dom';
import getPlacements from 'antd/es/_util/placements'
import {Cryptocurrencies, News} from '../components';
import { Pie } from '@antv/g2plot';
import Portfolio from './Portfolio/Portfolio';

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
      
      <Title level={4} className='home-title'>Hello <span>{props.user.name}</span></Title>
     
      <Portfolio balances={balances}/>
     
     
      {/* <div className="home-heading-container">
        <Title level={4} className='home-title'>Watch list</Title>
        <p className='show-more'><Link to='/cryptocurrencies'>View more</Link></p>
      </div> */}
      {/* <Cryptocurrencies simplified /> */}
      <div className="home-heading-container">
        <Title level={4} className='home-title'>News</Title>
        <h4 level={3} className='show-more'><Link to='/news'>View more</Link></h4>
      </div>
      <News simplified />
    </div>
  )
}

export default Homepage
