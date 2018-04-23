class RoomsController < ApplicationController

  def show
    @rooms = Room.all
    @room = Room.find(params[:id] || 1)
    @messages = @room.messages
    # puts "#######################3"
    # puts @room.as_json(:include => :messages)

    respond_to do |format|
      format.html
      format.json { render json: {room: @room, messages: @messages} }
    end
  end
end
