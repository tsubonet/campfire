import { Action } from '../actions'

// Actions
export const SET_ROOM = 'SET_ROOM'

// Reducer
export interface Room {
  id?: number
  name?: string
}
export default function reducer(state: Room = {}, action: Action): Room {
  switch (action.type) {
    case SET_ROOM:
      return action.payload.room
    default:
      return state
  }
}

// Action Creators
export function setRoom(room) {
  return {
    type: SET_ROOM,
    payload: {
      room,
    },
  }
}
