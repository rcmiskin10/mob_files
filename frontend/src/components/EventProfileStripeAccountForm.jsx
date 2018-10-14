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

const EventProfileStripeAccountForm = (props) => {

  const { classes } = props;
  return (
    <div className={classes.form}>
    
      <Row center="xs">
        <Col lg={6} md={6} sm={12} xs={12} >
          <Typography align='center' className={classes.text} variant="title" color="inherit">
            {props.eventProfileStripeAccountVerificationNeeded && (
              props.eventProfileStripeAccountVerificationNeeded.length>0 && (
                "We need some more information in order for you start accepting payments from businesses"
              )
            )}
          </Typography>
        </Col>
      </Row>
      {JSON.stringify(props.eventProfileStripeAccountVerificationNeeded)}
      {JSON.stringify(props.accountID)}
      {props.eventProfileStripeAccountVerificationNeeded && (
        
        props.eventProfileStripeAccountVerificationNeeded.map(verificationItem => {
          if (verificationItem==="external_account"){
            return (
              <div key={verificationItem}>
              <Row center="xs">
                <Col lg={6} md={6} sm={6} xs={12} >
                  <TextField
                    value={props.bankAccount}
                    label="Bank Account"
                    helperText="Please enter a bank account"
                    onChange={(e) => props.handleChange(e)}
                    name="bankAccount"
                    className={classes.input}
                    fullWidth={true}
                    autoComplete="off"
                  />
                  {/* {props.errors.filter(e => e.field === 'last_name').length > 0 && (
                    <Typography align='center' className={classes.errorText} color="inherit">
                      {props.errors.filter(e => e.field === 'last_name')[0].message[0]}
                    </Typography>
                  )} */}
                </Col>
              </Row>
              <Row center="xs">
                <Col lg={6} md={6} sm={6} xs={12} >
                  <TextField
                    value={props.routingNumber}
                    label="Account Routing Number"
                    helperText="Please the account routing number"
                    onChange={(e) => props.handleChange(e)}
                    name="routingNumber"
                    className={classes.input}
                    fullWidth={true}
                    autoComplete="off"
                  />
                  {/* {props.errors.filter(e => e.field === 'last_name').length > 0 && (
                    <Typography align='center' className={classes.errorText} color="inherit">
                      {props.errors.filter(e => e.field === 'last_name')[0].message[0]}
                    </Typography>
                  )} */}
                </Col>
              </Row>
              </div>
            )
          }
            
        }
          

          
        )

      )}
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


EventProfileStripeAccountForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  openStartDate: PropTypes.bool.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleDayClickStartDate: PropTypes.func.isRequired,
  selectedDayStartDate: PropTypes.instanceOf(Date),
  handleClickOpenStartDate: PropTypes.func.isRequired,
  eventProfileStripeAccountVerificationNeeded: PropTypes.array
};
EventProfileStripeAccountForm.defaultProps = {
  selectedDayStartDate: undefined
}

export default withStyles(styles)(EventProfileStripeAccountForm);
