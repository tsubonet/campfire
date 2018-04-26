export interface Room {
  id: number
  name: string
}

export interface Item {
  id: number
  content: string
  room_id: number
}

export interface Messages {
  hasNext: boolean
  currentPage: number
  items: Item[]
}

export interface StoreState {
  room: Room
  rooms: Room[]
  messages: Messages
}
