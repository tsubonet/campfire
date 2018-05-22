import reducers, { Messages } from '../../modules/messages'

const initialState = {
  items: [],
  hasNext: false,
  currentPage: 1,
  loading: false,
}
const existingState: Messages = {
  items: [
    {
      id: 1,
      content: 'message1',
      room_id: 1,
      created_at: '2018-05-21T02:54:20.295Z',
      updated_at: '2018-05-21T02:58:13.659Z',
    },
    {
      id: 2,
      content: 'message2',
      room_id: 1,
      created_at: '2018-05-21T02:54:20.295Z',
      updated_at: '2018-05-21T02:58:13.659Z',
    },
  ],
  hasNext: true,
  currentPage: 1,
  loading: false,
}
describe('messages reducer', () => {
  it('should return the initial state', () => {
    expect(reducers(undefined, {})).toEqual(initialState)
  })

  it('should handle SET_MESSAGES', () => {
    const messages = {
      items: [
        {
          id: 1,
          content: 'message1',
          room_id: 1,
          created_at: '2018-05-21T02:54:20.295Z',
          updated_at: '2018-05-21T02:58:13.659Z',
        },
        {
          id: 2,
          content: 'message2',
          room_id: 1,
          created_at: '2018-05-21T02:54:20.295Z',
          updated_at: '2018-05-21T02:58:13.659Z',
        },
      ],
      hasNext: true,
      currentPage: 1,
      loading: false,
    }
    expect(
      reducers(initialState, {
        type: 'SET_MESSAGES',
        payload: {
          messages,
        },
      })
    ).toEqual({
      ...messages,
    })
  })

  it('should handle POST_MESSAGE')
  it('should handle DESTROY_MESSAGE')
  it('should handle FETCH_OLD_MESSAGES')
  it('should handle REQUEST_MESSAGES')
  it('should handle REQUEST_OLD_MESSAGES')
})
