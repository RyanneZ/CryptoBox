import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import millify from 'millify';
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
    if( props.balances[key] != 0) {
      if(key === 'currency') {
        usdBalances['Cash'] = props.balances[key]
        usdTotal += usdBalances['Cash']
  
      }else {
        let filteredCoin = coinList.filter(c=>c.name==key)
        usdBalances[key] = filteredCoin[0].price * props.balances[key]
        usdTotal += usdBalances[key]
      }
    }

  }
 
  for (const key in usdBalances) {
    data.push({
      type: key,value: usdBalances[key] 
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
      title: 'Balance(USD)',
      dataIndex: 'balance',
    },
    {
      title: 'Price(USD)',
      dataIndex: 'price',
    },
    {
      title: 'Allocation(%)',
      dataIndex: 'allocation',
    },
  
  ];
  const datas = []
  for (const key in props.balances) {
    if(key != 'currency' && props.balances[key] != 0) {
      let filteredCoin = coinList.filter(c=>c.name==key)
      datas.push({
        key: filteredCoin[0].uuid,
        icon: <><img src={filteredCoin[0].iconUrl} style={{width:"2rem",height:"2rem"}} /></>,
        name: key,
        balance: Number(usdBalances[key]).toLocaleString('en', numberOptions),
        price: Number(filteredCoin[0].price).toLocaleString('en', numberOptions),
        allocation: Number((usdBalances[key]/usdTotal * 100)).toLocaleString('en', numberOptions),
  
      })
    }
 
  }

  useEffect(async (props) => {
    setCoinList(cryptoList?.data?.coins);
   
  })
  return(
    <div>
      <div>
       
      </div>
      <Pie {...config} />
      <br /><br />
      <Statistic title="Your Total Balance(USD):" value={Number(usdTotal).toLocaleString('en', numberOptions)}/>
      <br />
      <Statistic title="Your Crypto Assets(USD):" value={Number(usdTotal-(props.balances.currency)).toLocaleString('en', numberOptions)}/>
      <br />
      <Table columns={columns} dataSource={datas}  />
    </div>
  ) 
}

export default Portfolio
