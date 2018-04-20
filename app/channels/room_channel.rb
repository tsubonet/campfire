class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "room_channel"
    #stream_for "room_channel_#{params[:id]}"
    puts "########################"
    puts params
    room = Room.find(params[:id])
    stream_for room
    # RoomChannel.broadcast_to(
    #   room,
    #   { content: " joined"}
    # )
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    #Message.create! content: data['message']
    #ActionCable.server.broadcast 'room_channel', message: data['message']
  end
end
