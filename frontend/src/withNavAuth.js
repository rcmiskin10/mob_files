import React, { Component } from 'react';
import AuthService from '../services/AuthService';

export default function withNavAuth(AuthComponent) {
  const Auth = new AuthService();
  return class NavAuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
          isLoggedIn: false
      }
    }

    componentWillMount() {
      
          if(Auth.loggedIn()){
            
            this.setState({
              isLoggedIn: true
            })
          }else{
            console.log("test")
            this.setState({
              isLoggedIn: false
            })
          }
      
    }

    render() {
      return (
        <AuthComponent history={this.props.history} isLoggedIn={this.state.isLoggedIn} />
      )
    }
  }
}