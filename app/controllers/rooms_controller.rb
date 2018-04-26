class RoomsController < ApplicationController

  def show
    @rooms = Room.all

    @room = Room.find(params[:id] || 1)

    page_per = 5
    current_page = 1
    has_next = true
    items = @room.messages
    all_items = items.count
    if all_items < page_per
      has_next = false
    end
    items = items.page(current_page).per(page_per)
    @messages = { items: items, hasNext: has_next, currentPage: current_page }

    #puts "#######################"
    #puts @room.as_json(:include => @messages)
    #puts Room.includes(:messages.limit(2)).find(params[:id] || 1).as_json(:include => :messages)

    respond_to do |format|
      format.html
      format.json { render json: {room: @room, messages: @messages} }
    end
  end

end
