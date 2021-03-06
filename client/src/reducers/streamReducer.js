export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_STREAMS':
      const newStreams = { ...state };
      for (let stream of action.payload) {
        newStreams[stream.id] = stream;
      }
      return newStreams;
    case 'CREATE_STREAM':
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case 'EDIT_STREAM':
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case 'FETCH_STREAM':
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case 'DELETE_STREAM':
      const newState = {};
      for (let key in state) {
        if (key === action.payload) continue;
        newState[key] = state[key];
      }
      return newState;
    default:
      return state;
  }
}
