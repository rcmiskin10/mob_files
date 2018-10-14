import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const styles = {
  
  input: {
    margin: 10
  },
  signupButton: {
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

const BusinessProfileCreateForm = (props) => {

    const { classes } = props;
    return (
      <div>
        <Row center="xs">
          <Col lg={3} md={6} sm={6} xs={12} >
            <Typography align='center' className={classes.text} variant="title" color="inherit">
              Second step, lets get some information about your business
            </Typography>
            {props.errors.filter(e => e.field === 'non_field_errors').length > 0 && (
              <Typography align='center' className={classes.errorText} color="inherit">
                {props.errors.filter(e => e.field === 'non_field_errors')[0].message[0]}
              </Typography>
            )}
          </Col>
        </Row>
        <Row center="xs">
          <Col lg={3} md={6} sm={6} xs={12} >
            <TextField
              value={props.email}
              placeholder="Business Name"
              onChange={(e) => props.handleChange(e)}
              name="businessName"
              className={classes.input}
              error={props.errors.filter(e => e.field === 'business_name').length > 0}
              fullWidth={true}
            />
            {props.errors.filter(e => e.field === 'business_name').length > 0 && (
              <Typography align='center' className={classes.errorText} color="inherit">
                {props.errors.filter(e => e.field === 'business_name')[0].message[0]}
              </Typography>
            )}
          </Col>
          
        </Row>
        <Row center="xs">
          <Col lg={3} md={6} sm={6} xs={12} >
            <TextField
              value={props.firstName}
              placeholder="Business Phone #"
              onChange={(e) => props.handleChange(e)}
              name="businessPhone"
              className={classes.input}
              error={props.errors.filter(e => e.field === 'business_phone').length > 0}
              fullWidth={true}
            />
            {props.errors.filter(e => e.field === 'business_phone').length > 0 && (
              <Typography align='center' className={classes.errorText} color="inherit">
                {props.errors.filter(e => e.field === 'business_phone')[0].message[0]}
              </Typography>
            )}
          </Col>
          
        </Row>
        <Row center="xs">
          <Col lg={3} md={6} sm={6} xs={12} >
            <TextField
              value={props.lastName}
              placeholder="Business Url"
              onChange={(e) => props.handleChange(e)}
              name="businessUrl"
              className={classes.input}
              error={props.errors.filter(e => e.field === 'business_url').length > 0}
              fullWidth={true}
            />
            {props.errors.filter(e => e.field === 'business_url').length > 0 && (
              <Typography align='center' className={classes.errorText} color="inherit">
                {props.errors.filter(e => e.field === 'business_url')[0].message[0]}
              </Typography>
            )}
          </Col>
          
        </Row>
        <Row center="xs">
          <Col lg={3} md={6} sm={6} xs={12}>
            <Button fullWidth={true} className={classes.signupButton} onClick={(e) => props.handleFormSubmit(e)} variant="contained" color="primary">
              Save Information
            </Button>
          </Col>     
        </Row>
      </div>  
  )
}


BusinessProfileCreateForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,

};

export default withStyles(styles)(BusinessProfileCreateForm);
