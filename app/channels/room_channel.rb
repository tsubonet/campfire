class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "room_channel"
    #stream_for "room_channel_#{params[:id]}"
    room = Room.find(params[:id])
    stream_for room
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
