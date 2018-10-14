import React, { Component } from 'react';
import decode from 'jwt-decode';
import {compose} from 'recompose'
import { withStyles } from '@material-ui/core/styles';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import withWidth from '@material-ui/core/withWidth';
import {auth} from "./actions";
import mobApp from "./reducers";
import NotFound from "./NotFound";

import Home from "./main/Home";
import Login from "./main/Login";
import ParticipantDashboard from "./participants/ParticipantDashboard";
import EventDashboard from "./events/EventDashboard";
import BusinessDashboard from "./businesses/BusinessDashboard";
import AdminDashboard from "./admin/AdminDashboard";
import BusinessSignup from "./businesses/BusinessSignup";
import ParticipantSignup from "./participants/ParticipantSignup";
import EventSignup from "./events/EventSignup";
import NavBar from "./components/NavBar";
import LeftDrawer from "./components/LeftDrawer";
import BusinessProfileCreate from './businesses/BusinessProfileCreate';
import EventDashboardCreate from './events/EventDashboardCreate'
import EventDashboardMessages from './events/EventDashboardMessages'
import EventDashboardSettings from './events/EventDashboardSettings'

let store = createStore(mobApp, applyMiddleware(thunk));


export class RootContainerComponent extends Component {
  state = {
    isDrawerOpen: true && this.props.auth.isAuthenticated
    
  }

  componentDidMount() {
    this.props.loadUser();
    document.body.style.backgroundColor = '#4db6ac'// Set the style
  }

  toggleDrawer = () => {
    this.setState(prevState => ({
      isDrawerOpen: !prevState.isDrawerOpen
    }))
  }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        return <ChildComponent {...props} />
      }
    }} />
  }

  PrivateParticipantRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else if (this.props.auth.user.user_type===2){
        return <Redirect to="/business/dashboard" />;
      } else if (this.props.auth.user.user_type===3){
        return <Redirect to="/event/dashboard" />;
      } else if (this.props.auth.user.user_type===4){
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <ChildComponent {...props} />
      }
    }} />
  }

  PrivateEventRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else if (this.props.auth.user.user_type===1){
        return <Redirect to="/participant/dashboard" />;
      } else if (this.props.auth.user.user_type===2){
        return <Redirect to="/business/dashboard" />;
      } else if (this.props.auth.user.user_type===4){
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <ChildComponent {...props} />
      }
    }} />
  }

  PrivateBusinessRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else if (this.props.auth.user.user_type===1){
        return <Redirect to="/participant/dashboard" />;
      } else if (this.props.auth.user.user_type===3){
        return <Redirect to="/event/dashboard" />;
      } else if (this.props.auth.user.user_type===4){
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <ChildComponent {...props} />
      }
    }} />
  }

  PrivateAdminRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else if (this.props.auth.user.user_type===1){
        return <Redirect to="/participant/dashboard" />;
      } else if (this.props.auth.user.user_type===3){
        return <Redirect to="/event/dashboard" />;
      } else if (this.props.auth.user.user_type===2){
        return <Redirect to="/business/dashboard" />;
      } else {
        return <ChildComponent {...props} />
      }
    }} />
  }

  render() {
    let {PrivateRoute} = this.PrivateRoute;
    let PrivateParticipantRoute = this.PrivateParticipantRoute;
    let PrivateEventRoute = this.PrivateEventRoute;
    let PrivateBusinessRoute = this.PrivateBusinessRoute;
    let PrivateAdminRoute = this.PrivateAdminRoute;
    const mainContainer = {
      margin:10,
      paddingLeft: this.props.auth.isDrawerOpen && this.props.width !== "xs" ? 200 : 0,
    }
    
    return (
      <div>
        
        <BrowserRouter>
          <div>
          <NavBar/>
            {this.props.width !== "xs" && (
              <LeftDrawer {...this.state}/>
            ) }
            <div style={mainContainer}>
              <Switch>
                <PrivateParticipantRoute exact path="/participant/dashboard" component={ParticipantDashboard} />
                <PrivateEventRoute exact path="/event/dashboard" component={EventDashboard} />
                <PrivateEventRoute exact path="/event/dashboard/create" component={EventDashboardCreate} />
                <PrivateEventRoute exact path="/event/dashboard/messages" component={EventDashboardMessages} />
                <PrivateEventRoute exact path="/event/dashboard/settings" component={EventDashboardSettings} />
                <Route exact path="/" component={Home} />
                <Route exact path="/business-signup" component={BusinessSignup} />
                <Route exact path="/event-signup" component={EventSignup} />
                <Route exact path="/participant-signup" component={ParticipantSignup} />
                <PrivateBusinessRoute exact path="/business-profile-create" component={BusinessProfileCreate} />
                <PrivateBusinessRoute exact path="/business/dashboard" component={BusinessDashboard} />
                <PrivateAdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
                <Route exact path="/login" component={Login} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
      
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    },
    
  }
}

let RootContainer = compose(
  withWidth(),connect(mapStateToProps, mapDispatchToProps))(RootContainerComponent);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}