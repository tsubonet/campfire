class RoomsController < ApplicationController

  def index
    @rooms = Room.all
  end

  def show
    @room = Room.find(params[:id])
    @messages = @room.messages

    respond_to do |format|
      format.html
      format.json { render json: @room.as_json(:include => :messages) }
    end
  end
end
