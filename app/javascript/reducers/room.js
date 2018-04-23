export default function reducer(state = {}, action) {
  switch (action.type) {
    case "GET_DATE":
      return Object.assign({}, state, action.date);
    default:
      return state;
  }
}
