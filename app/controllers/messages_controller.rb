class MessagesController < ApplicationController
  
  include GetMessages

  def create
    room = Room.find(params[:room_id])
    message = room.messages.build(message_params)
    message.save
  end

  def old
    room = Room.find(params[:room_id])
    messages = module_get_messages(room)
    render json: {messages: messages}, status: :ok
  end

  private
    def message_params
      params.require(:message).permit(:content, :room_id, :user_id)
    end
end