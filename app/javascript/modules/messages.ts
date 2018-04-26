// Actions
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const SET_MESSAGES = 'SET_MESSAGES'

// Reducer
const initialState = {
  items: [],
  hasNext: false,
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return Object.assign({}, state, {
        items: [action.message, ...state.items],
      })
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
