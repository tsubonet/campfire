class MessageBroadcastJob < ApplicationJob
  queue_as :default
  def perform(message, room)
    puts "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    puts message
    puts room
    RoomChannel.broadcast_to(room,
      message: ActiveSupport::JSON.decode(MessagesController.render(
        partial: "messages/message.json.jbuilder",
        locals: { message: message })))
  end

  # def perform(message)
  #   ActionCable.server.broadcast "room_channel_#{message.room_id}", message: ActiveSupport::JSON.decode(render_message(message))
  # end

  private
    def render_message(message)
      ApplicationController.renderer.render(partial: 'messages/message.json.jbuilder', locals: { message: message })
    end
end
