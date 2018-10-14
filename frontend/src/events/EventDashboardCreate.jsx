import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {compose} from 'recompose'
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Typography from '@material-ui/core/Typography';
import EventCreateForm from './EventCreateForm';
import Divider from '@material-ui/core/Divider';
import DayPicker from 'react-day-picker';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {events, auth} from "../actions";
const styles = {

}

class EventDashboardCreate extends Component {
  state = {
    user: this.props.user.user_type,
    eventName: "",
    eventState: "",
    eventCity: "",
    eventAddress: "",
    eventStartDate: "",
    eventEndDate: "",
    eventDescription: "",
    richText: "",
    openEndDate: false,
    selectedDayEndDate: undefined,
    openStartDate: false,
    selectedDayStartDate: undefined,
    eventCode: ""
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

  resetForm = () => {
    this.setState({
      eventName: "",
      eventState: "",
      eventCity: "",
      eventAddress: "",
      eventStartDate: "",
      eventEndDate: "",
      richText: "",
      eventCode: ""
    })
  }

  handleRichTextChange = (value) => {
    this.setState(
      {
          richText: value
      }
    )
  }
  //end date
  handleDayClickEndDate = (day) => {
    this.setState({ 
      selectedDayEndDate: day,
      eventEndDate: day.toLocaleDateString(),
     });
     this.handleCloseEndDate();
  }

  handleClickOpenEndDate = () => {
    this.setState({ openEndDate: true });
  };

  handleCloseEndDate = () => {
    this.setState({ openEndDate: false });
  };

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
    
    this.props.createEvent(
      this.state.eventName, 
      this.state.eventState, 
      this.state.eventCity, 
      this.state.eventAddress, 
      this.state.eventStartDate, 
      this.state.eventEndDate,
      this.state.richText,
      this.state.eventCode
    );
  }

  render() {
    
    const { classes } = this.props;
    const { fullScreen } = this.props;
    if (this.props.eventProfileStripeAccountVerificationNeeded){
      if (this.props.eventProfileStripeAccountVerificationNeeded.length>0) {
        return <Redirect to="/event/dashboard/settings" />
      }
    }
    
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
              <Typography  style={{color:'white'}} variant="subheading" gutterBottom>
                Event / Create
              </Typography>
              <Divider/>
          </Col>
        </Row>

        <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <EventCreateForm 
                {...this.state}
                {...this.props}
                handleFormSubmit={this.handleFormSubmit} 
                handleChange={this.handleChange}
                handleRichTextChange={this.handleRichTextChange}
                handleClickOpenStartDate={this.handleClickOpenStartDate}
                handleClickOpenEndDate={this.handleClickOpenEndDate}
                handleCloseStartDate={this.handleCloseStartDate}
                handleCloseEndDate={this.handleCloseEndDate}
                fullScreen={fullScreen}
                handleDayClickEndDate={this.handleDayClickEndDate}
                handleDayClickStartDate={this.handleDayClickStartDate}
              />

            </Col>

        </Row>

      </Grid>
    )
  }
}

EventDashboardCreate.propTypes = {
  
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
    user: state.auth.user,
    eventCreateSuccess: state.events.eventCreateSuccess,
    eventProfileStripeAccountVerificationNeeded: state.auth.eventProfileStripeAccountVerificationNeeded
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createEvent: (
      eventName, 
      eventState, 
      eventCity, 
      eventAddress, 
      eventStartDate, 
      eventEndDate,
      richText,
      eventCode
    ) => {
      return dispatch(events.createEvent(
        eventName, 
        eventState, 
        eventCity, 
        eventAddress, 
        eventStartDate, 
        eventEndDate,
        richText,
        eventCode
      ));
    },
    checkEventProfileStripeAccountVerificationNeeded: () => {
      return dispatch(auth.checkEventProfileStripeAccountVerificationNeeded());
    }
  };
}

export default compose(
  withStyles(styles, {
  name: 'EventDashboardCreate',
}), withWidth(),withMobileDialog(),connect(mapStateToProps, mapDispatchToProps))(EventDashboardCreate);