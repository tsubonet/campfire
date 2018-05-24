import { combineEpics } from 'redux-observable'
import { messagesEpic } from './modules/messages'

const epics = combineEpics(messagesEpic)

export default epics
