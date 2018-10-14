import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import { Grid, Row, Col } from 'react-flexbox-grid';
import LoginForm from '../components/LoginForm';
import {auth} from "../actions";

class Login extends Component {

  state = {
    email: "",
    password: "",
    
  }

  componentDidMount(){
    document.body.style.backgroundColor = '#4db6ac'// Set the style
  }
  
  handleChange=(e)=>{
    this.setState(
        {
            [e.target.name]: e.target.value
        }
    )
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }



  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/participant/dashboard" />
    }
    return (
        
      <Grid>
        <Row>
          <Col xs={12}>
            <LoginForm 
              {...this.state}
              {...this.props}
              handleFormSubmit={this.handleFormSubmit} 
              handleChange={this.handleChange}
              handleErrorChange={this.handleErrorChange}
            />
          </Col>
        </Row>
      </Grid>
        
    )
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => {
      return dispatch(auth.login(email, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
