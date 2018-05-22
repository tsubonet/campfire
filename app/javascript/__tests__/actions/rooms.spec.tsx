import 'isomorphic-fetch'
import * as configureStore from 'redux-mock-store'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import { postRoomRequest, postRoomSuccess, postRoomAsync } from '../../modules/rooms'

const history = createHistory()
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('rooms action', () => {
  it('should dispatch postRoomRequest', () => {
    // Initialize mockstore with empty state
    const initialState = {}
    const store = mockStore(initialState)

    // Dispatch the action
    store.dispatch(postRoomRequest())

    // Test if your store dispatched the expected actions
    const actions = store.getActions()
    const expectedPayload = { type: 'POST_ROOM_REQUEST' }
    expect(actions).toEqual([expectedPayload])
  })

  it('should dispatch postRoomSuccess', () => {
    // Initialize mockstore with empty state
    const initialState = {}
    const store = mockStore(initialState)

    const room = {
      id: 3,
      name: 'room3',
      created_at: '2018-05-21T13:34:39.881Z',
      updated_at: '2018-05-21T13:34:39.881Z',
    }
    // Dispatch the action
    store.dispatch(postRoomSuccess(room))

    // Test if your store dispatched the expected actions
    const actions = store.getActions()
    const expectedPayload = { type: 'POST_ROOM_SUCCESS', payload: { room } }
    expect(actions).toEqual([expectedPayload])
  })

  it('should dispatch postRoomFailure')
  it('should dispatch postRoomReset')
  it('should dispatch sortRoom')
  it('should dispatch destroyRoomSuccess')

  it('should execute postRoomAsync', () => {
    const store = mockStore({})
    const room = {
      id: 3,
      name: 'room3',
      created_at: '2018-05-21T13:34:39.881Z',
      updated_at: '2018-05-21T13:34:39.881Z',
    }
    // Return the promise
    return store.dispatch(postRoomAsync('a', history)).then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual(postRoomRequest())
      expect(actions[1]).toEqual(postRoomSuccess(room))
      expect(actions[2]).toEqual(postRoomSuccess(room))
    })
  })
})
