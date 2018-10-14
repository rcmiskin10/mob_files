import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect, Link, withRouter} from "react-router-dom";
import {auth} from "../actions";
import {compose} from 'recompose'
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const styles = {
  
  flex: {
    flex: 1,
  },
  menuButton: {
    
    marginRight: 20,
  },
};

class NavBar extends Component {
  state = {
    anchorEl: null,
  };

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  }

  toggleDrawer = (e) => {
    e.preventDefault();
    this.props.toggleDrawer();
  }
  componentDidMount = () => {
    console.log(this.props.isDrawerOpen)
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    
  };

  handleRedirect = (link) => {
    this.setState({ 
      anchorEl: null,
    });
    if(link==="participant"){
      this.props.history.push("/participant-signup");
    } else if (link==="business"){
      this.props.history.push("/business-signup");
    } else if (link==="event"){
      this.props.history.push("/event-signup");
    } else if (link==="login"){
      this.props.history.push("/login");
    }
    
  };
  
  render() {
    const { classes } = this.props;
    
    
    return (
      <div style={{paddingLeft: this.props.isDrawerOpen && this.props.width !== "xs" ? 200 : 0}} className={classes.root}>
        <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
          <Toolbar>
            {this.props.isAuthenticated ? (
              <div>
                {this.props.width === "xs" ? (
                  <div className={classes.menuButton}>
                    <IconButton 
                      aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                      aria-haspopup="true"
                      onClick={this.handleClick}
                      color="inherit" aria-label="Menu"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={this.state.anchorEl}
                      open={Boolean(this.state.anchorEl)}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                      <MenuItem onClick={this.handleClose}>My account</MenuItem>
                      <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                    </Menu>
                  </div>
                ): (
                  <IconButton onClick={this.toggleDrawer} className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                  </IconButton>
                )}
              </div>
            ) : (
              <div>
                {this.props.width === "xs" && (
                  <div className={classes.menuButton}>
                    <IconButton 
                      aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                      aria-haspopup="true"
                      onClick={this.handleClick}
                      color="inherit" aria-label="Menu"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={this.state.anchorEl}
                      open={Boolean(this.state.anchorEl)}
                      onClose={this.handleClose}
                    >
                      {!this.props.isAuthenticated  && <MenuItem onClick={() => this.handleRedirect("business")}>Create a Deal</MenuItem>}
                      {!this.props.isAuthenticated  && <MenuItem onClick={() => this.handleRedirect("event")}>Create an Event</MenuItem>}
                      {!this.props.isAuthenticated  && <MenuItem onClick={() => this.handleRedirect("participant")}>Participant</MenuItem>}
                      {!this.props.isAuthenticated  && <MenuItem onClick={() => this.handleRedirect("login")}>Login</MenuItem>}
                    </Menu>
                  </div>
                )}
              </div>
            )}
            
            <Typography className={classes.flex} variant="title" color="inherit" >
              Mobsteer
            </Typography>
            {!this.props.isAuthenticated && this.props.width !== "xs" && <Button onClick={() => this.handleRedirect("business")} color="inherit">Create a Deal</Button>}
            {!this.props.isAuthenticated && this.props.width !== "xs" && <Button onClick={() => this.handleRedirect("event")} color="inherit">Create an Event</Button>}
            {!this.props.isAuthenticated && this.props.width !== "xs" && <Button onClick={() => this.handleRedirect("participant")} color="inherit">Participant Signup</Button>}
            {!this.props.isAuthenticated && this.props.width !== "xs" && <Button onClick={() => this.handleRedirect("login")} color="inherit">Login</Button>}
            
            {this.props.isAuthenticated && <Button onClick={this.logout} color="inherit">Logout</Button>}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

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
    isDrawerOpen: state.auth.isDrawerOpen
  };
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      return dispatch(auth.logout());
    },
    toggleDrawer: () => {
      return dispatch(auth.toggleDrawer());
    }
  };
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

NavBar.defaultProps = {
  
};

export default compose(
  withStyles(styles, {
  name: 'NavBar',
}), withWidth(), withRouter, connect(mapStateToProps, mapDispatchToProps))(NavBar);