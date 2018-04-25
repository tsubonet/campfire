// Actions
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const SET_MESSAGES = 'SET_MESSAGES'

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.message]
    case SET_MESSAGES:
      return action.messages
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
