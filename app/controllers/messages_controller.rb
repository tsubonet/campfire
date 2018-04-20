class MessagesController < ApplicationController
  def create
    room = Room.find(params[:room_id])
    message = room.messages.build(message_params)
    message.save
  end

  private
    def message_params
      params.require(:message).permit(:content, :room_id, :user_id)
    end
end