import { Action } from '../actions'
import { Room } from '../modules/room'

export default function reducer(state: Array<Room> = [], action: Action): Array<Room> {
  switch (action.type) {
    default:
      return state
  }
}
