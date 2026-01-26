class Category < ApplicationRecord
    has_many :menu_items, dependent: :destroy
  
    scope :active, -> { where(active: true).order(:position) }
  end
  