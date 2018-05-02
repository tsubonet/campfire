import { Action } from '../actions'

import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'

// Actions
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const SET_MESSAGES = 'SET_MESSAGES'
export const REQUEST_MESSAGES = 'REQUEST_MESSAGES'
export const GET_OLD_MESSAGES = 'GET_OLD_MESSAGES'
export const REQUEST_OLD_MESSAGES = 'REQUEST_OLD_MESSAGES'

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
  loading: boolean
}

const initialState = {
  isFetching: false,
  items: [],
  hasNext: false,
  currentPage: 1,
  loading: false,
}
export default function reducer(state: Messages = initialState, action: Action): Messages {
  switch (action.type) {
    case ADD_MESSAGE:
      return Object.assign({}, state, {
        items: [action.payload.message, ...state.items],
      })

    case SET_MESSAGES:
      return Object.assign({}, state, action.payload.messages)

    case REQUEST_OLD_MESSAGES:
    case REQUEST_MESSAGES:
      return Object.assign({}, state, {
        loading: true,
      })

    case GET_OLD_MESSAGES:
      return Object.assign({}, state, {
        items: [...state.items, ...action.payload.messages.items],
        hasNext: action.payload.messages.hasNext,
        currentPage: action.payload.messages.currentPage,
        loading: false,
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
export function requestMessages() {
  return {
    type: REQUEST_MESSAGES,
  }
}

export function getOldMessagesAction(id, messages) {
  return {
    type: 'REQUEST_OLD_MESSAGES',
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
  //   dispatch(getOldMessages(json.messages))
  // }
}

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))

export function messagesEpic(action$) {
  return action$
    .ofType('REQUEST_OLD_MESSAGES')
    .delay(1000)
    .mergeMap(action => {
      return fetch(`/rooms/${action.payload.id}/messages/old/?page=${action.payload.messages.currentPage + 1}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }).then(response => response.json())
    })
    .map(action => getOldMessages(action.messages))
    .do(action => console.log(action))
}
