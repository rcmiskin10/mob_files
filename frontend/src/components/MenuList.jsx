import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MessageIcon from '@material-ui/icons/Message';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';

const styles = {
  
 
};

const MenuList = (props) => {

  const { classes } = props;
  return (
    <div>
      <List>
        <ListItem>
          <Avatar>
            <IconButton
              aria-haspopup="true"
              onClick={() => props.handleClick("event-dash")}
              color="inherit" aria-label="Dash"
            >
              <DashboardIcon />
            </IconButton>
          </Avatar>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem>
          <Avatar>
            <IconButton
              aria-haspopup="true"
              onClick={() => props.handleClick("event-create")}
              color="inherit" aria-label="Create"
            >
              <AddBoxIcon />
            </IconButton>
          </Avatar>
          <ListItemText primary="Create Event" />
        </ListItem>
        <ListItem>
          <Avatar>
            <IconButton
              aria-haspopup="true"
              onClick={() => props.handleClick("event-messages")}
              color="inherit" aria-label="Messages"
            >
              <MessageIcon />
            </IconButton>
          </Avatar>
          <ListItemText primary="Messages" />
        </ListItem>
        <ListItem>
          <Avatar>
            <IconButton
              aria-haspopup="true"
              onClick={() => props.handleClick("event-settings")}
              color="inherit" aria-label="Settings"
            >
              <SettingsIcon />
            </IconButton>
          </Avatar>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
      </div>
  )
}


MenuList.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  userType: PropTypes.number
};

MenuList.defaultProps = {
  userType: null
};

export default withStyles(styles)(MenuList);
