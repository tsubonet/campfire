import { Action } from '../actions'
import { Room } from '../modules/rooms'
import { setMessages } from '../modules/messages'
import { sleep } from '../components/utils'

// Actions
export const SELECT_ROOM_REQUEST = 'SELECT_ROOM_REQUEST'
export const SELECT_ROOM_SUCCESS = 'SELECT_ROOM_SUCCESS'
export const SELECT_ROOM_ERROR = 'SELECT_ROOM_ERROR'

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
    case SELECT_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SELECT_ROOM_SUCCESS:
      return action.payload.room
    default:
      return state
  }
}

// Action Creators
export function selectRoomRequest() {
  return {
    type: SELECT_ROOM_REQUEST,
  }
}

export function selectRoomSuccess(room) {
  return {
    type: SELECT_ROOM_SUCCESS,
    payload: {
      room,
    },
  }
}

export function selectRoomAsync(id, wait) {
  return async dispatch => {
    if (wait) {
      dispatch(selectRoomRequest())
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
    dispatch(selectRoomSuccess(json.room))
  }
}
