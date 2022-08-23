import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic,Spin } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Link } from 'react-router-dom';
import getPlacements from 'antd/es/_util/placements'
import {Cryptocurrencies, News} from '../components';

const {Title} = Typography


const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10)



  const globalStats = data?.data?.stats;
  if(isFetching) return <Spin />
  let simplified = false
  return (
    <div>
      <Title level={2} className='heading'>Global Crypto Stats</Title>
      <Row gutter={[32, 32]}>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
        <Col span={12}><Statistic title="Total Deposit" value={millify(globalStats.totalDeposit)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap:" value={millify(globalStats.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className='home-title'>Latest Crypto News</Title>
        <Title level={3} className='show-more'><Link to='/news'>Show more</Link></Title>
      </div>
      <News simplified />
    </div>
  )
}

export default Homepage
