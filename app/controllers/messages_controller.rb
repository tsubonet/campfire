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

  # DELETE /messages/1
  # DELETE /messages/1.json
  def destroy
    message = Message.find(params[:id])
    if message.destroy
      head :no_content
      return
    else
      response_data = {
        txt: ['削除できませんでした！'],
      }
      render json: response_data, status: :unprocessable_entity
    end
  end

  private
    def message_params
      params.require(:message).permit(:content, :room_id, :user_id)
    end
end