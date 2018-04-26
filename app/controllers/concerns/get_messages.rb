module GetMessages

  extend ActiveSupport::Concern

  included do
    # ここにcallback等
  end

  def module_get_messages room
    page_per = 10
    current_page = 
      if params[:page].nil? 
        1
      else
        params[:page].to_i
      end
    has_next = true
    items = room.messages
    all_items = items.count
    if all_items < page_per * current_page
      has_next = false
    end
    items = items.page(current_page).per(page_per)
    { items: items, hasNext: has_next, currentPage: current_page }
  end

 end