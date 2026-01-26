class MenuItem < ApplicationRecord
  belongs_to :category
  has_many :bill_items

  scope :active, -> { where(active: true) }

  validates :name, :price, presence: true
end
