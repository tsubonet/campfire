import { Action } from '../actions'
import { Room } from '../modules/room'

// Actions
export const POST_ROOM_SUCCESS = 'POST_ROOM_SUCCESS'
export const POST_ROOM_FAILURE = 'POST_ROOM_FAILURE'
export const POST_ROOM_RESET = 'POST_ROOM_RESET'

export interface Rooms {
  items: Array<Room>
  loading: boolean
  errors: Array<string>
}
const initialState = {
  items: [],
  loading: false,
  errors: null,
}
export default function reducer(state: Rooms = initialState, action: Action): Rooms {
  switch (action.type) {
    case POST_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload.room],
      }
    case POST_ROOM_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.error,
      }
    case POST_ROOM_RESET:
      return {
        ...state,
        loading: false,
        errors: [],
      }
    default:
      return state
  }
}

// Action Creators
export function postRoomSuccess(room) {
  return {
    type: POST_ROOM_SUCCESS,
    payload: {
      room,
    },
  }
}

export function postRoomFailure(error) {
  return {
    type: POST_ROOM_FAILURE,
    error,
  }
}

export function postRoomReset() {
  return {
    type: POST_ROOM_RESET,
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
      dispatch(postRoomSuccess(json.room))
      history.push(`/rooms/${json.room.id}`)
    } else {
      dispatch(postRoomFailure(json.txt))
    }
  }
}
