
export const createEvent = (eventName, eventState, eventCity, eventAddress, eventStartDate, eventEndDate, richText, eventCode) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {"Content-Type": "application/json", "Authorization": `JWT ${token}`};
    let body = JSON.stringify({
      name: eventName, 
      state: eventState, 
      city: eventCity, 
      address: eventAddress, 
      start_date: 
      eventStartDate, 
      end_date: 
      eventEndDate, 
      description: 
      richText, 
      code:eventCode 
    });
    return fetch("/api/events/create/", {headers, body, method: "POST"})
      .then(res => res.json())
      .then(event => {
        return dispatch({
          type: 'ADD_EVENT',
          event
        })
      })
  }
}

export const updateEvent = (index, name) => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({name, });
    let eventId = getState().events[index].id;

    return fetch(`/api/events/${eventId}/edit/`, {headers, method: "PUT", body})
      .then(res => res.json())
      .then(event => {
        return dispatch({
          type: 'UPDATE_EVENT',
          event,
          index
        })
      })
  }
}

export const deleteEvent = index => {
  return (dispatch, getState) => {

    let headers = {"Content-Type": "application/json"};
    let eventId = getState().events[index].id;

    return fetch(`/api/events/${eventId}/delete/`, {headers, method: "DELETE"})
      .then(res => {
        if (res.ok) {
          return dispatch({
            type: 'DELETE_EVENT',
            index
          })
        }
      })
  }
}