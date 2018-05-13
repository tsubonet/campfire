import { Action } from '../actions'
import { Room } from '../modules/room'

// Actions
export const ADD_ROOM = 'ADD_ROOM'

export default function reducer(state: Array<Room> = [], action: Action): Array<Room> {
  switch (action.type) {
    case ADD_ROOM:
      return [...state, action.payload.room]
    default:
      return state
  }
}

// Action Creators
export function addRoom(room) {
  return {
    type: ADD_ROOM,
    payload: {
      room,
    },
  }
}

export function postRoomAsync(name, history) {
  return async dispatch => {
    const res = await fetch(`/rooms/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ name }),
    })
    const json = await res.json()
    if (res.status === 201) {
      dispatch(addRoom(json.room))
      history.push(`/rooms/${json.room.id}`)
    } else {
      console.log(json)
    }
  }
}
