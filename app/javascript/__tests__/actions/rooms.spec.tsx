import * as configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as fetchMock from 'fetch-mock'
import { postRoomRequest, postRoomSuccess, postRoomAsync } from '../../modules/rooms'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('sync actions', () => {
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
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('should execute postRoomAsync Success', () => {
    const room = {
      id: 3,
      name: 'room3',
      created_at: '2018-05-21T13:34:39.881Z',
      updated_at: '2018-05-21T13:34:39.881Z',
    }
    fetchMock.postOnce('/rooms/', {
      body: { room },
      headers: { 'content-type': 'application/json' },
    })
    const store = mockStore({})

    // Return the promise
    return store.dispatch(postRoomAsync('room3', null)).then(() => {
      const actions = store.getActions()
      expect(actions).toEqual([postRoomRequest(), postRoomSuccess(room)])
    })
  })
  it('should execute postRoomAsync Failure')
  it('should execute destroyRoomAsync')
})
