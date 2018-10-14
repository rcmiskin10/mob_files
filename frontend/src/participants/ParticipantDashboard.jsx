import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Typography from '@material-ui/core/Typography';
// import EventList from '../components/EventList';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

class ParticipantDashboard extends Component {
  state = {
    eventList: [],
    name: "",
    updateEventId: null,
    open: false,
    user: this.props.user
  }

  componentDidMount(){
    document.body.style.backgroundColor = '#4db6ac'// Set the style
    this.fetchEvents();
    
  }

  resetForm = () => {
    this.setState({name: "", updateEventId: null});
  }
  
  selectForEdit = (id) => {
    let event = this.props.events[id];
    this.setState({name: event.name, updateEventId: id});
  }
  
  submitEvent = (e) => {
    e.preventDefault();
    if (this.state.updateEventId === null) {
      this.addEvent(this.state.name).then(this.resetForm)
    } else {
      this.props.updateEvent(this.state.updateEventId, this.state.name).then(this.resetForm);
    }
    
  }

  addEvent = name => {
      let headers = {"Content-Type": "application/json"};
      let body = JSON.stringify({name, });
      return fetch("/api/events/create/", {headers, method: "POST", body})
        .then(res => res.json())
        .then(event => {
          this.fetchEvents();
        })
  }

  fetchEvents = () => {
    
    let headers = {"Content-Type": "application/json"};
    return fetch("/api/events/", {headers, })
      .then(res => res.json())
      .then(events => {
        this.setState({
          eventList: events
        })
      })
    
  }

  deleteEvent = index => {

    let headers = {"Content-Type": "application/json"};

    return fetch(`/api/events/${index}/delete/`, {headers, method: "DELETE"})
      .then(res => {
        if (res.ok) {
          this.fetchEvents();
        }
      })
    
  }

  render() {
    return (
        
        <Grid>
          
            <Row>
                <Col xs={6} md={3}>
                    <Typography variant="title" gutterBottom>
                        Welcome Participant to Mobsteer
                    </Typography>
                    
                </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Paper>
                  
                  <Table >
                    <TableHead>
                      <TableRow>
                        <TableCell numeric>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.eventList.map(n => {
                        return (
                          <TableRow key={n.id}>
                            <TableCell numeric component="th" scope="row">
                              {n.id}
                            </TableCell>
                            <TableCell >{n.name}</TableCell>
                            <TableCell><Button onClick={() => this.handleOpen()}>Edit</Button></TableCell>
                            <TableCell>
                              <i onClick={() => this.deleteEvent(n.id)} className="material-icons">
                                delete
                              </i>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Paper>
              
              </Col>
              <Row>
                <Col xs={12}>
                  
                    
                      <h3>Add new Event</h3>
                      <form onSubmit={this.submitEvent}>
                      
                        <Input
                          value={this.state.name}
                          placeholder="Enter event name here..."
                          onChange={(e) => this.setState({name: e.target.value})}
                          />

                            <Button type="submit" variant="contained" color="primary">
                              Add Event
                            </Button>
                       
                      </form>
                    
                  
                </Col>
              </Row>
          
            </Row>
            
        </Grid>
        
        
    )
  }
}
ParticipantDashboard.propTypes = {
  
};
export default ParticipantDashboard;