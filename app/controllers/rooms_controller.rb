class RoomsController < ApplicationController
  def show
    @messages = Message.all
    @hello_world_props = { name: "Stranger" }
  end
end
