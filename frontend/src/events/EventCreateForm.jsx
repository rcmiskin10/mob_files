import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import statesJson from '../states'

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

const states = statesJson;

const EventCreateForm = (props) => {

  const { classes } = props;
  return (
    <div className={classes.form}>
      <Row center="xs">
        <Col lg={3} md={6} sm={12} xs={12} >
          <Typography align='center' className={classes.text} variant="title" color="inherit">
            Lets Create an Event
          </Typography>
        </Col>
      </Row>
      <Row center="xs">
        <Col lg={6} md={6} sm={12} xs={12} >
          <TextField
            label="Event Name"
            value={props.eventName}
            helperText="Please enter an event name"
            onChange={(e) => props.handleChange(e)}
            name="eventName"
            className={classes.input}
            fullWidth={true}
            error={props.errors.filter(e => e.field === 'event_name').length > 0}
            autoComplete="off"
          />
          {props.errors.filter(e => e.field === 'event_name').length > 0 && (
            <Typography align='center' className={classes.errorText} color="inherit">
              {props.errors.filter(e => e.field === 'event_name')[0].message[0]}
            </Typography>
          )}
        </Col>
      </Row>
      <Row center="xs">
        <Col lg={3} md={3} sm={12} xs={12} >
          <TextField
            label="City"
            value={props.eventCity}
            helperText="Please enter the city of the event"
            onChange={(e) => props.handleChange(e)}
            name="eventCity"
            className={classes.input}
            fullWidth={true}
            error={props.errors.filter(e => e.field === 'event_city').length > 0}
            autoComplete="off"
          />
          {props.errors.filter(e => e.field === 'event_city').length > 0 && (
            <Typography align='center' className={classes.errorText} color="inherit">
              {props.errors.filter(e => e.field === 'event_city')[0].message[0]}
            </Typography>
          )}
        </Col>
        <Col lg={3} md={3} sm={12} xs={12} >
          <TextField
            select
            name="eventState"
            className={classes.input}
            value={props.eventState}
            onChange={(e) => props.handleChange(e)}
            label="State"
            helperText="Please select the state of event"
            fullWidth={true}
            error={props.errors.filter(e => e.field === 'event_state').length > 0}
            margin="normal"
            autoComplete="off"
          >
            {states.map(option => (
              <MenuItem key={option.abbreviation} value={option.abbreviation}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          {props.errors.filter(e => e.field === 'event_state').length > 0 && (
              <Typography align='center' className={classes.errorText} color="inherit">
                {props.errors.filter(e => e.field === 'event_state')[0].message[0]}
              </Typography>
          )}
        </Col>
        
        
      </Row>
      <Row center="xs">
        <Col lg={6} md={6} sm={12} xs={12} >
          
          <TextField
            value={props.eventAddress}
            label="Address"
            helperText="Please enter address of event"
            onChange={(e) => props.handleChange(e)}
            name="eventAddress"
            className={classes.input}
            fullWidth={true}
            error={props.errors.filter(e => e.field === 'event_address').length > 0}
            autoComplete="off"
          />
          {props.errors.filter(e => e.field === 'event_address').length > 0 && (
            <Typography align='center' className={classes.errorText} color="inherit">
              {props.errors.filter(e => e.field === 'event_address')[0].message[0]}
            </Typography>
          )}
        </Col>
      </Row>
      <Row center="xs">
        <Col lg={3} md={3} sm={12} xs={12} >
        <Dialog
          fullScreen={props.fullScreen}
          open={props.openStartDate}
          onClose={props.handleCloseStartDate}
          aria-labelledby="alert-dialog-title-start"
          
        >
          <DialogTitle id="alert-dialog-title-start">Choose a start date for the event</DialogTitle>
          <DialogContent>
            <DayPicker
              onDayClick={props.handleDayClickStartDate}
              selectedDays={props.selectedDayStartDate}
            />
          </DialogContent>
        </Dialog>
          <TextField
           value={props.eventStartDate}
           onClick={props.handleClickOpenStartDate}
           helperText="Please enter start date of event"
           label="Start Date"
           onChange={(e) => props.handleChange(e)}
           name="eventStartDate"
           className={classes.input}
           fullWidth={true}
           error={props.errors.filter(e => e.field === 'event_start_date').length > 0}
           autoComplete="off"
          />
          {props.errors.filter(e => e.field === 'event_start_date').length > 0 && (
            <Typography align='center' className={classes.errorText} color="inherit">
              {props.errors.filter(e => e.field === 'event_start_date')[0].message[0]}
            </Typography>
          )}
          
        </Col>
        <Dialog
          fullScreen={props.fullScreen}
          open={props.openEndDate}
          onClose={props.handleCloseEndDate}
          aria-labelledby="alert-dialog-title-end"
          
        >
          <DialogTitle id="alert-dialog-title-end">Choose an end date for the event</DialogTitle>
          <DialogContent>
            <DayPicker
              onDayClick={props.handleDayClickEndDate}
              selectedDays={props.selectedDayEndDate}
            />
          </DialogContent>
        </Dialog>
        <Col lg={3} md={3} sm={12} xs={12} >
          <TextField
            value={props.eventEndDate}
            onClick={props.handleClickOpenEndDate}
            helperText="Please enter end date of event"
            label="End Date"
            onChange={(e) => props.handleChange(e)}
            name="eventEndDate"
            className={classes.input}
            fullWidth={true}
            error={props.errors.filter(e => e.field === 'event_end_date').length > 0}
            autoComplete="off"
            />
            {props.errors.filter(e => e.field === 'event_end_date').length > 0 && (
              <Typography align='center' className={classes.errorText} color="inherit">
                {props.errors.filter(e => e.field === 'event_end_date')[0].message[0]}
              </Typography>
            )}
        </Col>
      </Row>
      <Row center="xs">
        <Col lg={6} md={6} sm={12} xs={12}>
          <ReactQuill
            value={props.richText}
            onChange={props.handleRichTextChange}
            placeholder="Please enter a description of the event"
            style={{height:250, paddingTop:50, paddingBottom:50}}
          />
          {props.errors.filter(e => e.field === 'event_description').length > 0 && (
            <Typography align='center' className={classes.errorText} color="inherit">
              {props.errors.filter(e => e.field === 'event_description')[0].message[0]}
            </Typography>
          )}
        </Col>
      </Row>
      <Row center="xs">
        <Col lg={4} md={4} sm={12} xs={12} >
          <TextField
            label="Access code"
            value={props.eventCode}
            helperText="Please enter an access code for your event"
            onChange={(e) => props.handleChange(e)}
            name="eventCode"
            className={classes.input}
            fullWidth={true}
            error={props.errors.filter(e => e.field === 'code').length > 0}
            autoComplete="off"
          />
          {props.errors.filter(e => e.field === 'code').length > 0 && (
            <Typography align='center' className={classes.errorText} color="inherit">
              {props.errors.filter(e => e.field === 'code')[0].message[0]}
            </Typography>
          )}
        </Col>
      </Row>
      <Row center="xs">
        <Col lg={3} md={6} sm={12} xs={12}>
          <Button fullWidth={true} className={classes.createButton} onClick={(e) => props.handleFormSubmit(e)} variant="contained" color="primary">
            Create Event
          </Button>
        </Col>     
      </Row>
    </div>  
  )
}


EventCreateForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRichTextChange: PropTypes.func.isRequired,
  handleCloseEndDate: PropTypes.func.isRequired,
  handleClickOpenEndDate: PropTypes.func.isRequired,
  openEndDate: PropTypes.bool.isRequired,
  openStartDate: PropTypes.bool.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleDayClickEndDate: PropTypes.func.isRequired,
  selectedDayEndDate: PropTypes.instanceOf(Date),
  handleDayClickStartDate: PropTypes.func.isRequired,
  selectedDayStartDate: PropTypes.instanceOf(Date),
  handleCloseStartDate: PropTypes.func.isRequired,
  handleClickOpenStartDate: PropTypes.func.isRequired,
};
EventCreateForm.defaultProps = {
  selectedDayEndDate: undefined,
  selectedDayStartDate: undefined
}

export default withStyles(styles)(EventCreateForm);
