import React, { Component } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm_password: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = () => {

    axios.post('http://localhost:2000/register', {
      username: this.state.username,
      password: this.state.password,
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      this.props.history.push('/');
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  render() {
    return (
      // <div style={{ marginTop: '200px' }}>
      //   <div>
      //     <h2>Register</h2>
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
      //     <TextField
      //       id="standard-basic"
      //       type="password"
      //       autoComplete="off"
      //       name="confirm_password"
      //       value={this.state.confirm_password}
      //       onChange={this.onChange}
      //       placeholder="Confirm Password"
      //       required
      //     />
      //     <br /><br />
      //     <Button
      //       className="button_style"
      //       variant="contained"
      //       color="primary"
      //       size="small"
      //       disabled={this.state.username == '' && this.state.password == ''}
      //       onClick={this.register}
      //     >
      //       Register
      //     </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      //     <Link href="/">
      //       Login
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
                  <Link href="/" className="nav-link" >Login</Link>
                </li>
                <li className="nav-item">
                  <Link href="/register" className="nav-link">Sign up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className='signup_body'>
          <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" name ="username" placeholder="username" value={this.state.username} onChange={this.onChange} />
          </div>
          <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name ="password" placeholder="Enter password" value={this.state.password} onChange={this.onChange}/>
          </div>
          <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" className="form-control" name ="confirm_password" placeholder="Confirm password"  value={this.state.confirm_password} onChange={this.onChange}/>
          </div>
          <button className="btn btn-primary btn-block" onClick={this.register}>Register</button>
          <p className="forgot-password text-right">
              Already registered <a href="/">sign in?</a>
          </p>
        </div>
      </div>
    );
  }
}
