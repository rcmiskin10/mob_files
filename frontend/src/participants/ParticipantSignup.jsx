import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";
import { Grid, Row, Col } from 'react-flexbox-grid';
import {compose} from 'recompose'
import { withStyles } from '@material-ui/core/styles';
import SignupForm from '../components/SignupForm';
import {auth} from "../actions";

const styles = {}
class ParticipantSignup extends Component {

  state = {
    email: "",
    password: "",
    password2: "",
    firstName: "",
    lastName: "",
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
    this.props.signup(this.state.email, this.state.firstName, this.state.lastName, this.state.password, this.state.password2, 1);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/participant/dashboard" />
    }
    const { classes } = this.props;
    return (
      <Grid>
          <Row>
            <Col xs={12}>
              <SignupForm 
                {...this.state}
                {...this.props}
                handleFormSubmit={this.handleFormSubmit} 
                handleChange={this.handleChange}
                accountType="Participant"
              />
            </Col>
          </Row>
      </Grid>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        
    )
  }
}

ParticipantSignup.propTypes = {
  classes: PropTypes.object.isRequired,
};

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
    signup: (email, firstName, lastName, password, password2, userType) => {
      return dispatch(auth.signup(email, firstName, lastName, password, password2, userType));
    }
  };
}

export default compose(
  withStyles(styles, {
  name: 'ParticipantSignup',
}),connect(mapStateToProps, mapDispatchToProps))(ParticipantSignup);
