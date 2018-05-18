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
    @rooms = { 
      items: Room.all, 
      loading: false,
      errors: nil 
    }
    if room = Room.find_by(id: params[:id])
      response_data = {
        room: {
          item: room,
          loading: false
        },
        messages: module_get_messages(room)
      }
    end

    #puts "#######################"
    #puts @room.as_json(:include => @messages)
    #puts Room.includes(:messages.limit(2)).find(params[:id] || 1).as_json(:include => :messages)

    respond_to do |format|
      format.html
      format.json { render json: response_data }
    end
  end

  # GET /rooms/1/edit
  # GET /rooms/1/edit.json
  def edit
    @rooms = { 
      items: Room.all, 
      loading: false,
      errors: nil 
    }
  end

  # PATCH /rooms/1
  # PATCH /rooms/1.json
  def update
    room = Room.find(params[:id])

    if room.update(room_params)
      response_data = {
        room: room,
        txt: ['更新しました！'],
      }
      render json: response_data, status: :ok
    else
      response_data = {
        txt: room.errors.full_messages,
      }
      render json: response_data, status: :unprocessable_entity
    end
  end

  # DELETE /rooms/1
  # DELETE /rooms/1.json
  def destroy
    room = Room.find(params[:id])
    if room.destroy
      head :no_content
      return
    else
      response_data = {
        txt: ['削除できませんでした！'],
      }
      render json: response_data, status: :unprocessable_entity
    end
  end


  def dummy
  end

  private
    def room_params
      params.permit(:name)
    end

end
