import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Redirect} from "react-router-dom";
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


const styles = {
  title : {
    margin: 10,
    color: "white"
  }
}

class EventDashboard extends Component {
  state = {
    user: this.props.user.user_type
  }

  componentDidMount(){
    document.body.style.backgroundColor = '#4db6ac'// Set the style
    
  }

  render() {
    const { classes } = this.props;
    
    return (
      <Grid fluid>
        <Row>
            <Col xs={12}>
                <Typography style={{color:'white'}} variant="subheading" gutterBottom>
                  Event / Dashboard
                </Typography>
                <Divider/>
            </Col>
        </Row>
      </Grid>
    )
  }
}

EventDashboard.propTypes = {
  
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    
  };
}

const mapDispatchToProps = dispatch => {
  return {
    
  };
}

export default compose(
  withStyles(styles, {
  name: 'EventDashboard',
}), withWidth(),connect(mapStateToProps, mapDispatchToProps))(EventDashboard);