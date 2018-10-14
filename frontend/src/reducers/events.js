const initialState = {
  eventCreateSuccess: false,
};

export default function events(state=initialState, action) {

  switch (action.type) {

    // case 'ADD_EVENT':
    //   return [...state, {text: action.text}];

    // case 'UPDATE_EVENT':
    //   let eventToUpdate = eventList[action.id]
    //   eventToUpdate.text = "test";
    //   eventList.splice(action.id, 1, eventToUpdate);
    //   return eventList;

    // case 'DELETE_EVENT':
    //   eventList.splice(action.id, 1);
    //   return eventList;

    case 'ADD_EVENT':
      return {...state, ...action.event, eventCreateSuccess:true};

    // case 'UPDATE_EVENT':
    //   let eventToUpdate = eventList[action.index]
    //   eventToUpdate.name = action.event.name;
    //   eventList.splice(action.index, 1, eventToUpdate);
    //   return eventList;

    // case 'DELETE_EVENT':
    //   eventList.splice(action.index, 1);
    //   return eventList;

    // case 'FETCH_EVENTS':
    //   return [...state, ...action.events];

    default:
      return state;
  }
}