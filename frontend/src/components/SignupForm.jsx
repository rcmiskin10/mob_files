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

const SignupForm = (props) => {

  const { classes } = props;
  return (
    <div>
      <Row center="xs">
        <Col lg={3} md={6} sm={6} xs={12} >
          <Typography align='center' className={classes.text} variant="title" color="inherit">
            First step, lets create you a{props.accountType==="Event" && 'n'} {props.accountType} account
          </Typography>
        </Col>
      </Row>
      <Row center="xs">
        <Col lg={3} md={6} sm={6} xs={12} >
          <TextField
            value={props.email}
            placeholder="Email"
            onChange={(e) => props.handleChange(e)}
            name="email"
            className={classes.input}
            fullWidth={true}
            error={props.errors.filter(e => e.field === 'email').length > 0}
            autoComplete="off"
          />
          {props.errors.filter(e => e.field === 'email').length > 0 && (
            <Typography align='center' className={classes.errorText} color="inherit">
              {props.errors.filter(e => e.field === 'email')[0].message[0]}
            </Typography>
          )}
        </Col>
      </Row>
      <Row center="xs">
        <Col lg={3} md={6} sm={6} xs={12} >
          <TextField
            value={props.firstName}
            placeholder="First Name"
            onChange={(e) => props.handleChange(e)}
            name="firstName"
            className={classes.input}
            fullWidth={true}
            error={props.errors.filter(e => e.field === 'first_name').length > 0}
            autoComplete="off"
          />
          {props.errors.filter(e => e.field === 'first_name').length > 0 && (
            <Typography align='center' className={classes.errorText} color="inherit">
              {props.errors.filter(e => e.field === 'first_name')[0].message[0]}
            </Typography>
          )}
        </Col>
      </Row>
      <Row center="xs">
        <Col lg={3} md={6} sm={6} xs={12} >
          <TextField
            value={props.lastName}
            placeholder="Last Name"
            onChange={(e) => props.handleChange(e)}
            name="lastName"
            className={classes.input}
            fullWidth={true}
            error={props.errors.filter(e => e.field === 'last_name').length > 0}
            autoComplete="off"
          />
          {props.errors.filter(e => e.field === 'last_name').length > 0 && (
            <Typography align='center' className={classes.errorText} color="inherit">
              {props.errors.filter(e => e.field === 'last_name')[0].message[0]}
            </Typography>
          )}
        </Col>
      </Row>
      <Row center="xs">
        <Col lg={3} md={6} sm={6} xs={12} >
          <TextField
            value={props.password}
            placeholder="Password"
            onChange={(e) => props.handleChange(e)}
            type="password"
            name="password"
            className={classes.input}
            fullWidth={true}
            error={props.errors.filter(e => e.field === 'password').length > 0}
            autoComplete="off"
          />
          {props.errors.filter(e => e.field === 'password').length > 0 && (
            <Typography align='center' className={classes.errorText} color="inherit">
              {props.errors.filter(e => e.field === 'password')[0].message[0]}
            </Typography>
          )}
        </Col>    
      </Row>
      <Row center="xs">
        <Col lg={3} md={6} sm={6} xs={12} >
          <TextField
            value={props.password2}
            placeholder="Confirm password"
            onChange={(e) => props.handleChange(e)}
            type="password"
            name="password2"
            className={classes.input}
            fullWidth={true}
            error={props.errors.filter(e => e.field === 'password2').length > 0}
            autoComplete="off"
          />
          {props.errors.filter(e => e.field === 'password2').length > 0 && (
            <Typography align='center' className={classes.errorText} color="inherit">
              {props.errors.filter(e => e.field === 'password2')[0].message[0]}
            </Typography>
          )}
        </Col>    
      </Row>
      <Row center="xs">
        <Col lg={3} md={6} sm={6} xs={12}>
          <Button fullWidth={true} className={classes.signupButton} onClick={(e) => props.handleFormSubmit(e)} variant="contained" color="primary">
            Signup
          </Button>
        </Col>     
      </Row>
    </div>  
  )
}


SignupForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  accountType: PropTypes.string.isRequired
};

export default withStyles(styles)(SignupForm);
