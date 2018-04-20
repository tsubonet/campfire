class MessageBroadcastJob < ApplicationJob
  queue_as :default
  def perform(message)
    RoomChannel.broadcast_to("room_channel_#{message.room_id}", message: ActiveSupport::JSON.decode(render_message(message)))
  end

  private
    def render_message(message)
      ApplicationController.renderer.render(partial: 'messages/message.json.jbuilder', locals: { message: message })
    end
end
