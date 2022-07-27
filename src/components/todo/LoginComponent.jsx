import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService.js";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "aabhas",
      password: "password",
      hasLoginFailed: false,
      showSuccessMessage: false,
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.LoginClicked = this.LoginClicked.bind(this);
  }

  handleChange(event) {
    // console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  }

  // handlePasswordChange(event){
  //     console.log(event.target.value)
  //     this.setState({password:event.target.value})
  // }

  LoginClicked() {
    // console.log(this.state)
    // if(this.state.username==='in28minutes' & this.state.password==="dummy"){
    //     AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
    //     this.props.navigate(`/welcome/${this.state.username}`)
    //     // this.setState({showSuccessMessage:true})
    //     // this.setState({hasLoginFailed:false})
    // }
    // else{
    //     console.log("Failed")
    //     this.setState({showSuccessMessage:false})
    //     this.setState({hasLoginFailed:true})
    // }
    // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
    // .then(() => {
    //     AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
    //     this.props.navigate(`/welcome/${this.state.username}`)
    // }
    // ).catch(() => {
    //     console.log("Failed")
    //     this.setState({showSuccessMessage:false})
    //     this.setState({hasLoginFailed:true})
    // })

    AuthenticationService.executeJwtAuthenticationService(
      this.state.username,
      this.state.password
    )
      .then((response) => {
        AuthenticationService.registerSuccessfulLoginFotJwt(
          this.state.username,
          response.data.token
        );
        this.props.navigate(`/welcome/${this.state.username}`);
      })
      .catch(() => {
        console.log("Failed");
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });
      });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <br />
        <div className="container">
          {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/> */}
          {this.state.hasLoginFailed && (
            <div className="alert alert-warning">Invalid Credentials</div>
          )}
          {/* <ShowSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/> */}
          {this.state.showSuccessMessage && <div>Login Successful</div>}
          User Name :
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <br />
          <br />
          Password :
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <button className="btn btn-success" onClick={this.LoginClicked}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
