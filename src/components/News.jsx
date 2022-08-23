import React , { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card, Spin } from 'antd';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);

  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'Cryptocurrency', count: simplified ? 6 : 12 });
  if (!cryptoNews?.value) return <Spin />
  return (
    <div>
      <Row gutter={[24,24]}>

        {cryptoNews.value.map((news, i) => (
          <Col sm={12} lg={8} key={i}>
            <Card hoverable className='news-card'>
              <a href={news.url} target='_blank' >
                <div className="news-image-container">
                  <Title className="news-title" level={5}>{news.name}</Title>
                  <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" style={{width: '5rem', height: '5rem'}}/>
                </div>
                <p className='news-description'>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description} </p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                  </div>
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              </a>

            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default News
