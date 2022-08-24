import React, {useState} from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select} from 'antd'

import { useGetCryptoDetailsQuery } from '../services/cryptoApi'
import { Table } from 'antd';

const {Title, Test } = Typography
const { Option} = Select
 
const CryptoDetails = () => {
  const { coinId } = useParams()

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId)

  const cryptoDetails = data?.data?.coin;



  const columns = [
    {
      title: 'Name',
      dataIndex: 'Name',
    },
    {
      title: 'Past 24h',
      dataIndex: 'Past 24h',
    },
    {
      title: 'Price',
      dataIndex: 'Price',
    },
    {
      title: 'Change',
      dataIndex: 'Change',
    },
    {
      title: 'Market cap',
      dataIndex: 'Market cap',
    },
  ];
  const datas = [
    {
      key: '1',
      Name: 'Bitcoin',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  return (
    <div>
   
    <Table columns={columns} dataSource={datas} size="middle" />
   
  </div>
  )
}

export default CryptoDetails
