import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { Statistic,Spin ,Table} from 'antd'
import { useGetCryptosQuery } from '../../services/cryptoApi';

const Portfolio = (props) => {

  const [coinList, setCoinList] = useState([])
  const data = []
  const usdBalances = {}
  const { data: cryptoList, isFetching } = useGetCryptosQuery(10)

  let usdTotal = 0

  for (const key in props.balances) {
    if(key === 'currency') {
      usdBalances[key] = props.balances[key]
      usdTotal += usdBalances[key]

    }else {
      let filteredCoin = coinList.filter(c=>c.name==key)
      usdBalances[key] = filteredCoin[0].price * props.balances[key]
      usdTotal += usdBalances[key]
    }
  }
  console.log(usdTotal)
  for (const key in props.balances) {
    data.push({
      type: key,value: (usdBalances[key]/usdTotal)
    })
  }

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  const numberOptions = { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  };

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

  useEffect(async (props) => {
    setCoinList(cryptoList?.data?.coins);
   
  })
  return(
    <div>
      <div>
       
      </div>
      <Pie {...config} />
      <Statistic title="Your Total Balance(USD):" value={Number(usdTotal).toLocaleString('en', numberOptions)}/>
      <br />
      <Statistic title="Your Assets(USD):" value={Number(usdTotal-(props.balances.currency)).toLocaleString('en', numberOptions)}/>
      <br />
      <Table columns={columns} dataSource={datas}  />
    </div>
  ) 
}

export default Portfolio
