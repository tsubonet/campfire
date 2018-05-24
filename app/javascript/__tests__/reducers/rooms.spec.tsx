import reducers, { Rooms } from '../../modules/rooms'

const initialState = {
  items: [],
  loading: false,
  errors: null,
}

const existingState: Rooms = {
  items: [
    {
      id: 1,
      name: 'room1',
      created_at: '2018-05-21T02:54:20.295Z',
      updated_at: '2018-05-21T02:58:13.659Z',
    },
    {
      id: 2,
      name: 'room2',
      created_at: '2018-05-19T13:09:25.090Z',
      updated_at: '2018-05-20T05:24:08.351Z',
    },
  ],
  loading: false,
  errors: null,
}
describe('rooms reducer', () => {
  it('should return the initial state', () => {
    expect(reducers(undefined, {})).toEqual(initialState)
  })

  it('should handle POST_ROOM_REQUEST', () => {
    expect(reducers(existingState, { type: 'POST_ROOM_REQUEST' })).toEqual({
      ...existingState,
      loading: true,
    })
  })

  it('should handle POST_ROOM_SUCCESS', () => {
    const room = {
      id: 3,
      name: 'room3',
      created_at: '2018-05-21T13:34:39.881Z',
      updated_at: '2018-05-21T13:34:39.881Z',
    }
    expect(
      reducers(existingState, {
        type: 'POST_ROOM_SUCCESS',
        payload: {
          room,
        },
      })
    ).toEqual({
      ...existingState,
      loading: false,
      items: [room, ...existingState.items],
    })
  })

  it('should handle POST_ROOM_FAILURE', () => {
    expect(
      reducers(existingState, {
        type: 'POST_ROOM_FAILURE',
        error: 'error text',
      })
    ).toEqual({
      ...existingState,
      loading: false,
      errors: 'error text',
    })
  })

  it('should handle POST_ROOM_RESET', () => {
    expect(
      reducers(existingState, {
        type: 'POST_ROOM_RESET',
      })
    ).toEqual({
      ...existingState,
      loading: false,
      errors: null,
    })
  })

  it('should handle SORT_ROOM', () => {
    const room = {
      id: 3,
      name: 'room3',
      created_at: '2018-05-21T13:34:39.881Z',
      updated_at: '2018-05-21T13:34:39.881Z',
    }
    expect(
      reducers(existingState, {
        type: 'SORT_ROOM',
        payload: {
          room,
        },
      })
    ).toEqual({
      ...existingState,
      items: [room, ...[...existingState.items].filter(item => item.id !== room.id)],
    })
  })

  it('should handle DESTROY_ROOM_SUCCESS', () => {
    const id = 2
    expect(
      reducers(existingState, {
        type: 'DESTROY_ROOM_SUCCESS',
        payload: {
          id,
        },
      })
    ).toEqual({
      ...existingState,
      items: [...[...existingState.items].filter(item => item.id !== id)],
    })
  })
})
