import { Action } from '../actions'
import { Room } from '../modules/rooms'
import { setMessages } from '../modules/messages'
import { sleep } from '../components/utils'

// Actions
export const SET_ROOM_REQUEST = 'SET_ROOM_REQUEST'
export const SET_ROOM_SUCCESS = 'SET_ROOM_SUCCESS'

// Reducer
export interface SelectedRoom {
  item?: Room
  loading?: boolean
}
const initialState = {
  item: {},
  loading: false,
}
export default function reducer(state: SelectedRoom = initialState, action: Action): SelectedRoom {
  switch (action.type) {
    case SET_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SET_ROOM_SUCCESS:
      return action.payload.room
    default:
      return state
  }
}

// Action Creators
export function setRoomRequest() {
  return {
    type: SET_ROOM_REQUEST,
  }
}

export function setRoomSuccess(room) {
  return {
    type: SET_ROOM_SUCCESS,
    payload: {
      room,
    },
  }
}

export function setRoomAsync(id, wait) {
  return async dispatch => {
    if (wait) {
      dispatch(setRoomRequest())
    }
    const res = await fetch(`/rooms/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    if (wait) {
      await sleep(wait)
    }
    const json = await res.json()
    await dispatch(setMessages(json.messages))
    dispatch(setRoomSuccess(json.room))
  }
}
