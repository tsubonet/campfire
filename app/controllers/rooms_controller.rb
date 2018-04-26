class RoomsController < ApplicationController

  def show
    @rooms = Room.all

    @room = Room.find(params[:id] || 1)

    page_per = 5
    hasNext = true
    items = @room.messages
    all_items = items.count
    if all_items < page_per
      hasNext = false
    end
    items = items.page(1).per(page_per)
    @messages = { items: items, hasNext: hasNext }

    #puts "#######################"
    #puts @room.as_json(:include => @messages)
    #puts Room.includes(:messages.limit(2)).find(params[:id] || 1).as_json(:include => :messages)

    respond_to do |format|
      format.html
      format.json { render json: {room: @room, messages: @messages} }
    end
  end

end
