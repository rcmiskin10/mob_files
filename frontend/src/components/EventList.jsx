import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {events} from "../actions";

class EventList extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    return (
      <table>
        <tbody>
          {this.props.events.map((event, id) => (
            <tr key={`event_${id}`}>
              <td>{event.name}</td>
              <td><button onClick={() => this.props.selectForEdit(id)}>edit</button></td>
              <td><button onClick={() => this.props.deleteEvent(id)}>delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

EventList.propTypes = {
  selectForEdit: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    events: state.events,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addEvent: (name) => {
      return dispatch(events.addEvent(name));
    },
    updateEvent: (id, name) => {
      return dispatch(events.updateEvent(id, name));
    },
    deleteEvent: (id) => {
      dispatch(events.deleteEvent(id));
    },
    fetchEvents: () => {
      dispatch(events.fetchEvents());
    }
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);