import React, { useState, useEffect } from 'react'
import millify from 'millify';
import { Table, Space, Typography,Spin, Input} from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
const { Text } = Typography;


 

const Cryptocurrencies = ({simplified}) => {
  const count = simplified? 10 : 50
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
 
  

  useEffect(() => {
    setCryptos(cryptoList?.data?.coins);

    const filteredData = cryptoList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

if(isFetching) return <Spin />


const columns = [
  {
    title: '',
    dataIndex: 'icon',
  },
  {
    title: 'Name',
    dataIndex: 'Name',
  },
  {
    title: 'Symbol',
    dataIndex: 'Symbol',
  },
  {
    title: 'Price',
    dataIndex: 'Price',
  },
  {
    title: 'Change(%)',
    dataIndex: 'Change',
  },
  {
    title: 'Market cap',
    dataIndex: 'Marketcap',
  },
];

const datas = []
cryptos?.forEach( c => {
  let tempChange =  <Text type="success">{millify(c.change)}</Text>
  if (c.change < 0) tempChange = <Text type="danger">{millify(c.change)}</Text>
  
  datas.push({
    key: c.uuid,
    icon:<><img src={c.iconUrl} style={{width:"2rem",height:"2rem"}} /></>,
    Name: <h3>{c.name}</h3>,
    Symbol: <p style={{color: 'rgba(0, 0, 0, 0.45)'}}>{c.symbol}</p> ,
    Price: millify(c.price),
    Change: tempChange,
    Marketcap: millify(c.marketCap)

  })
}

)
  
    
  return (
    <div>
      {!simplified && (
        <div className='search-crypto'>
          <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
     
     
      <Table columns={columns} dataSource={datas}  />

    </div>
  )
}

export default Cryptocurrencies
