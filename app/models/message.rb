class Message < ApplicationRecord
  belongs_to :room
  after_commit { MessageBroadcastJob.perform_later self }
  default_scope -> { order(created_at: :desc) }
end
