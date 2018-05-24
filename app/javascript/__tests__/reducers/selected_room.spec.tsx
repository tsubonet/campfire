import reducers, { SelectedRoom } from '../../modules/selected_room'

const initialState = {
  item: {},
  loading: false,
}
const existingState: SelectedRoom = {
  item: {
    id: 1,
    name: 'room1',
    created_at: '2018-05-21T02:54:20.295Z',
    updated_at: '2018-05-21T02:58:13.659Z',
  },
  loading: false,
}
describe('selectedRoom reducer', () => {
  it('should return the initial state', () => {
    expect(reducers(undefined, {})).toEqual(initialState)
  })

  it('should handle SELECT_ROOM_REQUEST', () => {
    expect(reducers(initialState, { type: 'SELECT_ROOM_REQUEST' })).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('should handle SELECT_ROOM_SUCCESS', () => {
    const room = {
      id: 1,
      name: 'room1',
      created_at: '2018-05-21T02:54:20.295Z',
      updated_at: '2018-05-21T02:58:13.659Z',
    }
    expect(
      reducers(existingState, {
        type: 'SELECT_ROOM_SUCCESS',
        payload: {
          room,
        },
      })
    ).toEqual({
      loading: false,
      item: room,
    })
  })

  it('should handle SELECT_ROOM_ERROR')
})
