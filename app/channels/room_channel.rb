class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_for "room_channel_#{params[:room_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
