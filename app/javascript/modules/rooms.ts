import { Action } from '../actions'
import { Rooms } from '../modules/rooms'
import { sleep } from '../components/utils'
import { SubmissionError } from 'redux-form'

// Actions
export const POST_ROOM_REQUEST = 'POST_ROOM_REQUEST'
export const POST_ROOM_SUCCESS = 'POST_ROOM_SUCCESS'
export const POST_ROOM_FAILURE = 'POST_ROOM_FAILURE'

export const POST_ROOM_RESET = 'POST_ROOM_RESET'

export const SORT_ROOM = 'SORT_ROOM'
export const DESTROY_ROOM_SUCCESS = 'DESTROY_ROOM_SUCCESS'

export const UPDATE_ROOM_SUCCESS = 'UPDATE_ROOM_SUCCESS'

export interface Room {
  id?: number
  name?: string
}
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
    case POST_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case POST_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [action.payload.room, ...state.items],
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
        errors: null,
      }
    case SORT_ROOM:
      return {
        ...state,
        items: [
          action.payload.room,
          ...[...state.items].filter(item => item.id !== action.payload.room.id),
        ],
      }
    case DESTROY_ROOM_SUCCESS:
      return {
        ...state,
        items: [...state.items].filter(item => item.id !== action.payload.id),
      }
    default:
      return {
        ...state,
        loading: false,
        errors: null,
      }
  }
}

// Action Creators
export function postRoomRequest() {
  return {
    type: POST_ROOM_REQUEST,
  }
}

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

export function sortRoom(room) {
  return {
    type: SORT_ROOM,
    payload: {
      room,
    },
  }
}

export function destroyRoomSuccess(id) {
  return {
    type: DESTROY_ROOM_SUCCESS,
    payload: {
      id,
    },
  }
}

export function postRoomAsync(name, history) {
  return async dispatch => {
    dispatch(postRoomRequest())
    const res = await fetch(`/rooms/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ name }),
    })
    await sleep(1000)
    const json = await res.json()
    if (res.status === 201) {
      dispatch(postRoomSuccess(json.room))
      history.push(`/rooms/${json.room.id}`)
    } else {
      dispatch(postRoomFailure(json.txt))
    }
  }
}

export function destroyRoomAsync(id, history) {
  return async (dispatch, getState) => {
    const res = await fetch(`/rooms/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    if (res.status === 204) {
      dispatch(destroyRoomSuccess(id))
      // TODO
      if (getState().selectedRoom.item.id === id) {
        history.push(`/rooms/${getState().rooms.items[0].id}`)
      }
    }
  }
}
