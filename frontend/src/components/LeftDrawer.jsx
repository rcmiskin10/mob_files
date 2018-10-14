import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Redirect, Link, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import MenuList from './MenuList'
import {auth} from "../actions";
import {compose} from 'recompose'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';


const styles = {
  
};

class LeftDrawer extends Component {
  

  state = {
  
  }

  handleClick = (link) => {
    if(link==="event-dash"){
      this.props.history.push("/event/dashboard");
    } else if (link==="event-create"){
      this.props.history.push("/event/dashboard/create");
    } else if (link==="event-messages"){
      this.props.history.push("/event/dashboard/messages");
    } else if (link==="event-settings") {
      this.props.history.push("/event/dashboard/settings");
    }
  }

  componentDidMount(){
  }

  render() {
    const { classes } = this.props;
    return (
      <div >
        <Drawer
          variant="persistent"
          open={this.props.isDrawerOpen}
        > 
          {this.props.isAuthenticated && <MenuList userType={this.props.userType} handleClick={this.handleClick}/>}
        </Drawer> 
      </div>
    )
  }
}

const mapStateToProps = state => {

  return {
    
    isAuthenticated: state.auth.isAuthenticated,
    userType: state.auth.userType,
    isDrawerOpen: state.auth.isDrawerOpen
  };
}

const mapDispatchToProps = dispatch => {
  return {
  };
}

LeftDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

LeftDrawer.defaultProps = {
  isDrawerOpen: true
}
export default compose(
  withStyles(styles, {
  name: 'LeftDrawer',
}),withRouter, connect(mapStateToProps, mapDispatchToProps))(LeftDrawer);