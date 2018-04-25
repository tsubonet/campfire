class RoomsController < ApplicationController

  def show
    @rooms = Room.all

    @room = Room.find(params[:id] || 1)
    @messages = @room.messages.page(1).per(5)

    #puts "#######################"
    #puts @room.as_json(:include => @messages)
    #puts Room.includes(:messages.limit(2)).find(params[:id] || 1).as_json(:include => :messages)

    respond_to do |format|
      format.html
      format.json { render json: {room: @room, messages: @messages} }
    end
  end

end
