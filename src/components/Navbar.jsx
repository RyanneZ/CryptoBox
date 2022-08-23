import React from 'react'
import {Button, Menu, Typography, Avatar } from 'antd'
import {Link} from 'react-router-dom'
import { HomeOutlined, FundOutlined, MoneyCollectOutlined,BulbOutlined,LogoutOutlined,DollarCircleOutlined } from '@ant-design/icons'
// import { pic } from '../images/icon.png'


const Navbar = (props) => {
  return (
    <div className='nav-container'>
      <div className='logo-container'>
       
        <Typography.Title level={2} className='logo'>
          <Link to="/">CryptoBox</Link>
        </Typography.Title>
        
      </div>
      <Menu theme='light'>
        <Menu.Item icon={<HomeOutlined />}>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />}>
          <Link to='/Deposit'>Deposit</Link>
        </Menu.Item>
        <Menu.Item icon={<DollarCircleOutlined />}>
          <Link to='/trade'>Trade</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to='/news'>News</Link>
        </Menu.Item>
        <Menu.Item icon={<LogoutOutlined />}>
          <Button onClick={() => props.logout()}>Logout</Button>
        </Menu.Item>
      
      </Menu>
      
    </div>
  )
}
export default Navbar
