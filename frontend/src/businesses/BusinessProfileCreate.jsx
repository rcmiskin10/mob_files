import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";
import { Grid, Row, Col } from 'react-flexbox-grid';
import {compose} from 'recompose'
import { withStyles } from '@material-ui/core/styles';
import BusinessProfileCreateForm from './BusinessProfileCreateForm';
import {auth} from "../actions";

const styles = {}

class BusinessProfileCreate extends Component {

  state = {
    businessName: "",
    businessUrl: "",
    businessPhone: "",
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
    this.props.createBusinessProfile(this.state.businessName, this.state.businessPhone, this.state.businessUrl);
  }

  render() {
    if (this.props.isBusinessProfileCreated && this.props.isAuthenticated) {
      return <Redirect to="/business/dashboard" />
    }
    const { classes } = this.props;
    return (
      <Grid>
          <Row>
            <Col xs={12}>
              <BusinessProfileCreateForm
                {...this.state}
                {...this.props}
                handleFormSubmit={this.handleFormSubmit} 
                handleChange={this.handleChange}
              />
            </Col>
          </Row>
      </Grid>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        
    )
  }
}

BusinessProfileCreate.propTypes = {
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
    isAuthenticated: state.auth.isAuthenticated,
    isBusinessProfileCreated: state.auth.isBusinessProfileCreated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createBusinessProfile: (businessName, businessPhone, businessUrl) => {
      return dispatch(auth.createBusinessProfile(businessName, businessPhone, businessUrl));
    }
  };
}

export default compose(
  withStyles(styles, {
  name: 'BusinessProfileCreate',
}),connect(mapStateToProps, mapDispatchToProps))(BusinessProfileCreate);
