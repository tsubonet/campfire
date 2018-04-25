export interface Room {
  id: number
  name: string
}

export interface Message {
  id: number
  content: string
  room_id: number
}

export interface StoreState {
  room: Room
  rooms: Room[]
  messages: Message[]
}
