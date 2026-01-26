class Bill < ApplicationRecord
  belongs_to :user
  has_many :bill_items, dependent: :destroy

  enum :payment_method, {
    online: 0,
    offline: 1
  }
end
