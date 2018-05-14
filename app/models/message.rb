class Message < ApplicationRecord
  belongs_to :room, touch: true
  after_commit { MessageBroadcastJob.perform_later self }
  default_scope -> { order(created_at: :desc) }
end
