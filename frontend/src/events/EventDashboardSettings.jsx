import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose'
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {events, auth} from "../actions";
import StripeAccountForm from "../components/EventProfileStripeAccountForm"

const styles = {
  form: {
    paddingTop:20,
    marginTop:20
  },

  input: {
    margin: 10,
    color:'white'
  },
  createButton: {
    margin:10,
    backgroundColor: '#00867d'
  },
  text: {
    marginLeft: 20,
    color: 'white',
    
  },
  errorText: {
    marginLeft: 20,
    color: 'red',
    
  },
};

class EventDashboardSettings extends Component {
  state = {
    user: this.props.user.user_type,
    openStartDate: false,
    bankAccount: "",
    routingNumber: ""
  }

  componentDidMount(){
    this.props.checkEventProfileStripeAccountVerificationNeeded();
    document.body.style.backgroundColor = '#4db6ac'// Set the style
  }

  handleChange=(e)=>{
    
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  resetForm = () => {
    this.setState({
      eventStartDate: "",
    })
  }

  //start date
  handleDayClickStartDate = (day) => {
    this.setState({ 
      selectedDayStartDate: day,
      eventStartDate: day.toLocaleDateString(),
    });
    this.handleCloseStartDate();
  }

  handleClickOpenStartDate = () => {
    this.setState({ openStartDate: true });
  };

  handleCloseStartDate = () => {
    this.setState({ openStartDate: false });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
  }


  render() {
    const { classes } = this.props;
    const { fullScreen } = this.props;
    return (
      <Grid fluid>
        <Row>
            <Col xs={12}>
                <Typography style={{color:'white'}} variant="subheading" gutterBottom>
                  Event / Settings
                </Typography>
                <Divider/>
            </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <StripeAccountForm 
              {...this.state}
              {...this.props}
              handleFormSubmit={this.handleFormSubmit}
              handleChange={this.handleChange}
              handleClickOpenStartDate={this.handleClickOpenStartDate}
              handleCloseStartDate={this.handleCloseStartDate}
              fullScreen={fullScreen}
              handleDayClickStartDate={this.handleDayClickStartDate}
            />

          </Col>

        </Row>
      </Grid>
    )
  }
}

EventDashboardSettings.propTypes = {
  
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    eventProfileStripeAccountVerificationNeeded: state.auth.eventProfileStripeAccountVerificationNeeded,
    accountID: state.auth.accountID
  };
}

const mapDispatchToProps = dispatch => {
  return {
    checkEventProfileStripeAccountVerificationNeeded: () => {
      return dispatch(auth.checkEventProfileStripeAccountVerificationNeeded());
    }
  };
}

export default compose(
  withStyles(styles, {
  name: 'EventDashboardSettings',
}), withWidth(), withMobileDialog(), connect(mapStateToProps, mapDispatchToProps))(EventDashboardSettings);