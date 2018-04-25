// Actions
export const SET_ROOM = 'SET_ROOM'

// Reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_ROOM:
      return action.room
    default:
      return state
  }
}

// Action Creators
export function setRoom(room) {
  return {
    type: SET_ROOM,
    room,
  }
}
