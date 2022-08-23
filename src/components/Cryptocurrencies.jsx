import React, { useState, useEffect } from 'react'
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input,Avatar, List ,Table, Space, Typography,Spin} from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
const { Text } = Typography;


const data = [
  {
    title: 'Ant Design Title 1',
  },

];  

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
          <input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
     
      {/* <Row gutter={[32, 32]} className='crypto-card-container'> 
        {cryptos?.map( (currency) => (
          
          <Col xs={4} sm={2} lg={1} className='crypto-card' key={currency.uuid}>
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card title={currency.name}
                    extra={<img className='crypto-image' src={currency.iconUrl}/>}
                    hoverable>
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>

              </Card>
              <Card title={<img className='crypto-image' src={currency.iconUrl}/>}
                    extra={`${currency.name}  ${currency.symbol}`}
                    hoverable>
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>
              </Card>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={currency.iconUrl} />}
                      title={<a href="">{currency.name}</a>}
                      hoverable
                    />
                      <p>Price: {millify(currency.price)}</p>
                      <p>Market Cap: {millify(currency.marketCap)}</p>
                      <p>Daily Change: {millify(currency.change)}</p>
                  </List.Item>
                )}
              />
            </Link>
          </Col>
          
        ) )}
      </Row> */}
      <Table columns={columns} dataSource={datas}  />
      {/* {cryptos?.map( (currency) => (
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={currency.iconUrl} />}
                title={<a href="">{currency.name}</a>}
                hoverable
              />
                <p>Symbol: {(currency.symbol)}</p>
                <p>Price: {millify(currency.price)}</p>
                <br />
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>
            </List.Item>
          )}
        />
              
      ) )} */}


       
     

    
            
    </div>
  )
}

export default Cryptocurrencies
