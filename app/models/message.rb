class Message < ApplicationRecord
  belongs_to :room, touch: true
  after_create_commit { MessageBroadcastJob.perform_later(self, "create") }
  before_destroy { MessageBroadcastJob.perform_later(self.clone, "destroy") }
  default_scope -> { order(created_at: :desc) }
end
