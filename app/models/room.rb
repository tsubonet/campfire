class Room < ApplicationRecord
  has_many :messages, dependent: :destroy
  validates :name, uniqueness: true, presence: true
end
