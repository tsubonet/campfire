import { Action } from '../actions'

// Actions
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const SET_MESSAGES = 'SET_MESSAGES'
export const GET_OLD_MESSAGES = 'GET_OLD_MESSAGES'

// Reducer
export interface Item {
  id: number
  content: string
  room_id: number
}

export interface Messages {
  isFetching: boolean
  items: Array<Item>
  hasNext: boolean
  currentPage: number
}

const initialState = {
  isFetching: false,
  items: [],
  hasNext: false,
  currentPage: 1,
}
export default function reducer(state: Messages = initialState, action: Action): Messages {
  switch (action.type) {
    case ADD_MESSAGE:
      return Object.assign({}, state, {
        items: [action.payload.message, ...state.items],
      })
    case SET_MESSAGES:
      return action.payload.messages

    case GET_OLD_MESSAGES:
      return Object.assign({}, state, {
        items: [...state.items, ...action.payload.messages.items],
        hasNext: action.payload.messages.hasNext,
        currentPage: action.payload.messages.currentPage,
      })
    default:
      return state
  }
}

// Action Creators
export function setMessages(messages) {
  return {
    type: SET_MESSAGES,
    payload: {
      messages,
    },
  }
}
export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: {
      message,
    },
  }
}
export function getOldMessages(messages) {
  return {
    type: GET_OLD_MESSAGES,
    payload: {
      messages,
    },
  }
}

export function getOldMessagesAsync(id, messages) {
  return async dispatch => {
    const res = await fetch(`/rooms/${id}/messages/old/?page=${messages.currentPage + 1}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const json = await res.json()
    dispatch(getOldMessages(json.messages))
  }
}
