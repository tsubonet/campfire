class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_for "room_channel_#{params[:room_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def delete(data)
    #ActionCable.server.broadcast "room_channel_#{data["room_id"]}", id: data['id']
    RoomChannel.broadcast_to("room_channel_#{data["room_id"]}", {action: "delete", id: data['id']})
    message = Message.find_by(id: data['id'])
    message.destroy
    
  end
end
