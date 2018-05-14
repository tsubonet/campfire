class RoomsController < ApplicationController

  include GetMessages
  
  # POST /rooms
  # POST /rooms.json
  def create
    room = Room.new(room_params)
    if room.save
      response_data = {
        room: room,
        txt: ['投稿しました！'],
      }
      render json: response_data, status: :created
    else
      response_data = {
        txt: room.errors.full_messages,
      }
      render json: response_data, status: :unprocessable_entity
    end
  end

  # GET /rooms/1
  # GET /rooms/1.json
  def show
    @rooms = {items: Room.all, loading: false}

    @room = Room.find(params[:id] || 1)
    @messages = module_get_messages(@room)

    #puts "#######################"
    #puts @room.as_json(:include => @messages)
    #puts Room.includes(:messages.limit(2)).find(params[:id] || 1).as_json(:include => :messages)

    respond_to do |format|
      format.html
      format.json { render json: {room: @room, messages: @messages} }
    end
  end

  def dummy
    @rooms = Room.all
  end

  private
  def room_params
    params.permit(:name)
  end

end
