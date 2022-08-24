import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic,Spin , Table} from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Link } from 'react-router-dom';
import getPlacements from 'antd/es/_util/placements'
import {Cryptocurrencies, News} from '../components';
import { Pie } from '@antv/g2plot';
import Portfolio from './Portfolio/Portfolio';

const {Title} = Typography


const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10)



  const globalStats = data?.data?.stats;
  if(isFetching) return <Spin />
  let simplified = false

  const columns = [
    {
      title: '',
      dataIndex: 'icon',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
    },
    {
      title: 'Price',
      dataIndex: 'Price',
    },
    {
      title: 'Allocation',
      dataIndex: 'allocation',
    },
  
  ];
  
  const datas = []
  

  return (
    <div>
      <Portfolio />
      <Statistic title="Your Balance(USD):" value={0}/>
      <Statistic title="Your Assets:" value={0}/>
      <Table columns={columns} dataSource={datas}  />
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
