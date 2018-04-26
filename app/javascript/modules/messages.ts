// Actions
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const SET_MESSAGES = 'SET_MESSAGES'
export const GET_OLD_MESSAGES = 'GET_OLD_MESSAGES'

// Reducer
const initialState = {
  items: [],
  hasNext: false,
  currentPage: 1,
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return Object.assign({}, state, {
        items: [action.message, ...state.items],
      })
    case SET_MESSAGES:
      return action.messages

    case GET_OLD_MESSAGES:
      return Object.assign({}, state, {
        items: [...state.items, ...action.messages.items],
        hasNext: action.messages.hasNext,
        currentPage: action.messages.currentPage,
      })
    default:
      return state
  }
}

// Action Creators
export function setMessages(messages) {
  return {
    type: SET_MESSAGES,
    messages,
  }
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message,
  }
}
export function getOldMessages(messages) {
  return {
    type: GET_OLD_MESSAGES,
    messages,
  }
}
