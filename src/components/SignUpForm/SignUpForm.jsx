import { Component } from 'react';
import { LockOutlined, UserOutlined,MailOutlined,CheckSquareOutlined    } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import './SignUpForm.css';



export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // 1. POST our new user info to the server
      const fetchResponse = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password,})
      })
      // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
      if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')   
      
      // 3. decode the response into JS object
      let token = await fetchResponse.json()
      localStorage.setItem('token', token) // 4. stick the serv resp into the user's browser

      const userDoc = JSON.parse(atob(token.split('.')[1])).user; // 5. Decode the token + put user document into state
      this.props.setUserInState(userDoc)

    } catch (err) {
      console.log("SignupForm error", err)
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  }

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div >

        <Form autoComplete="off"
          name="normal_login"
          className="login-form"
          style={{margin:'auto'}}
          initialValues={{
            remember: true,
          }}
        
          onSubmit={this.handleSubmit}
          
        >
          <Form.Item
            name="name"
              rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} type="text" name="name" value={this.state.name} onChange={this.handleChange} required/>
          </Form.Item>
          <Form.Item
            name="email"
              rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
          <Input prefix={<MailOutlined  className="site-form-item-icon" />} type="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password" name="password" value={this.state.password} onChange={this.handleChange} required
          />
          </Form.Item>
          <Form.Item
            name="confirm"
            rules={[
              {
                required: true,
                message: 'Please confrim your Password!',
              },
            ]}
          >
          <Input
            prefix={<CheckSquareOutlined className="site-form-item-icon" />}
            type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required
          />
          </Form.Item>


          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

         
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
              Sign up
            </Button>
          
          </Form.Item>
        </Form>
      </div>
    );
  }
}