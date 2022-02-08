import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  login = () => {

    const pwd = bcrypt.hashSync(this.state.password, salt);

    axios.post('http://localhost:2000/login', {
      username: this.state.username,
      password: pwd,
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.id);
      this.props.history.push('/dashboard');
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error"
        });
      }
    });
  }

  render() {
    return (
      // <div style={{ marginTop: '200px' }}>
      //   <div>
      //     <h2>Login</h2>
      //   </div>

      //   <div>
      //     <TextField
      //       id="standard-basic"
      //       type="text"
      //       autoComplete="off"
      //       name="username"
      //       value={this.state.username}
      //       onChange={this.onChange}
      //       placeholder="User Name"
      //       required
      //     />
      //     <br /><br />
      //     <TextField
      //       id="standard-basic"
      //       type="password"
      //       autoComplete="off"
      //       name="password"
      //       value={this.state.password}
      //       onChange={this.onChange}
      //       placeholder="Password"
      //       required
      //     />
      //     <br /><br />
      //     <Button
      //       className="button_style"
      //       variant="contained"
      //       color="primary"
      //       size="small"
      //       disabled={this.state.username == '' && this.state.password == ''}
      //       onClick={this.login}
      //     >
      //       Login
      //     </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      //     <Link href="/register">
      //       Register
      //     </Link>
      //   </div>
      // </div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>Welcome</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link href="/" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link href="/register" className="nav-link">Sign up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className='body_style'>
          <div className='login_body'>
            <h3>Sign In</h3>
            <div className="form-group">
                <label>Username</label>
                <input type="username" className="form-control" value={this.state.username} name="username" placeholder="Enter username" onChange={this.onChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} name="password" placeholder="Enter password" onChange={this.onChange}/>
            </div>
            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>
            <button className="btn btn-primary btn-block" onClick={this.login}> Log in</button>
            {/* <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p> */}
          </div>
        </div>
      </div>
    );
  }
}
