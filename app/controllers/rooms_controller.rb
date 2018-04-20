class RoomsController < ApplicationController

  def index
    @rooms = Room.all
  end

  def show
    @rooms = Room.all
    @room = Room.find(params[:id] || 1)
    @messages = @room.messages

    respond_to do |format|
      format.html
      format.json { render json: @room.as_json(:include => :messages) }
    end
  end
end
