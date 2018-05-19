import { Action } from '../actions'

import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'

// Actions
export const POST_MESSAGE = 'POST_MESSAGE'
export const DESTROY_MESSAGE = 'DESTROY_MESSAGE'
export const SET_MESSAGES = 'SET_MESSAGES'
export const REQUEST_MESSAGES = 'REQUEST_MESSAGES'
export const FETCH_OLD_MESSAGES = 'FETCH_OLD_MESSAGES'
export const REQUEST_OLD_MESSAGES = 'REQUEST_OLD_MESSAGES'

// Reducer
export interface Message {
  id: number
  content: string
  room_id: number
  created_at: string
  updated_at: string
}

export interface Messages {
  items: Array<Message>
  hasNext: boolean
  currentPage: number
  loading: boolean
}

const initialState = {
  items: [],
  hasNext: false,
  currentPage: 1,
  loading: false,
}
export default function reducer(state: Messages = initialState, action: Action): Messages {
  switch (action.type) {
    case POST_MESSAGE:
      return {
        ...state,
        items: [action.payload.message, ...state.items],
      }

    case DESTROY_MESSAGE:
      return {
        ...state,
        items: [...state.items].filter(item => item.id !== action.payload.id),
      }

    case SET_MESSAGES:
      return action.payload.messages

    case REQUEST_OLD_MESSAGES:
    case REQUEST_MESSAGES:
      return {
        ...state,
        loading: true,
      }

    case FETCH_OLD_MESSAGES:
      return {
        ...state,
        items: [...state.items, ...action.payload.messages.items],
        hasNext: action.payload.messages.hasNext,
        currentPage: action.payload.messages.currentPage,
        loading: false,
      }

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
export function receiveMessage(message) {
  return {
    type: POST_MESSAGE,
    payload: {
      message,
    },
  }
}
export function destroyMessage(id) {
  return {
    type: DESTROY_MESSAGE,
    payload: {
      id,
    },
  }
}
export function fetchOldMessages(messages) {
  return {
    type: FETCH_OLD_MESSAGES,
    payload: {
      messages,
    },
  }
}
export function requestMessages() {
  return {
    type: REQUEST_MESSAGES,
  }
}

export function fetchOldMessagesSync(id, messages) {
  return {
    type: REQUEST_OLD_MESSAGES,
    payload: {
      id,
      messages,
    },
  }
  // return async dispatch => {
  //   dispatch(requestMessages())
  //   await sleep(1000)
  //   const res = await fetch(`/rooms/${id}/messages/old/?page=${messages.currentPage + 1}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //   })
  //   const json = await res.json()
  //   dispatch(fetchOldMessages(json.messages))
  // }
}

export function messagesEpic(action$) {
  return action$
    .ofType('REQUEST_OLD_MESSAGES')
    .delay(2000)
    .mergeMap(async action => {
      const res = await fetch(
        `/rooms/${action.payload.id}/messages/old/?page=${action.payload.messages.currentPage + 1}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )
      return res.json()
    })
    .map(action => fetchOldMessages(action.messages))
  //.do(action => console.log(action))
}
