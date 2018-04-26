class MessagesController < ApplicationController
  
  def create
    room = Room.find(params[:room_id])
    message = room.messages.build(message_params)
    message.save
  end

  def old
    room = Room.find(params[:room_id])

    page_per = 5
    current_page = params[:id].to_i
    has_next = true
    items = room.messages
    all_items = items.count
    if all_items < page_per * current_page
      has_next = false
    end
    items = items.page(current_page).per(page_per)
    @messages = { items: items, hasNext: has_next, currentPage: current_page }
    
    respond_to do |format|
      format.json { render json: {messages: @messages} }
    end

  end

  private
    def message_params
      params.require(:message).permit(:content, :room_id, :user_id)
    end
end