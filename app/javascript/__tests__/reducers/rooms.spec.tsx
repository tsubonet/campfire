import reducers, { Rooms } from '../../modules/rooms'

const rooms: Rooms = {
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
    expect(reducers(undefined, {})).toEqual({
      items: [],
      loading: false,
      errors: null,
    })
  })

  it('should handle POST_ROOM_REQUEST', () => {
    const state = reducers({ ...rooms }, { type: 'POST_ROOM_REQUEST' })
    expect(state).toEqual({
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
      loading: true,
      errors: null,
    })
  })

  it('should handle POST_ROOM_SUCCESS', () => {
    const state = reducers(
      { ...rooms },
      {
        type: 'POST_ROOM_SUCCESS',
        payload: {
          room: {
            id: 3,
            name: 'room3',
            created_at: '2018-05-21T13:34:39.881Z',
            updated_at: '2018-05-21T13:34:39.881Z',
          },
        },
      }
    )
    expect(state).toEqual({
      items: [
        {
          id: 3,
          name: 'room3',
          created_at: '2018-05-21T13:34:39.881Z',
          updated_at: '2018-05-21T13:34:39.881Z',
        },
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
    })
  })

  it('should handle GET_POST_FAIL')
  it('should handle GET_POST_START')
})

// const initialState = {
//   year: new Date().getFullYear(),
//   month: new Date().getMonth() + 1,
//   date: new Date().getDate(),
// }

// describe('date reducer', () => {
//   it('should have initial state', () => {
//     expect(reducer(undefined, {})).toEqual(initialState)
//   })

//   it('should handle GET_DATE', () => {
//     expect(
//       reducer(
//         {},
//         {
//           type: 'GET_DATE',
//           date: { year: 2018, month: 1, day: 1 },
//         }
//       )
//     ).toEqual({ year: 2018, month: 1, day: 1 })
//   })
// })
