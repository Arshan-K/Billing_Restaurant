class BillItem < ApplicationRecord
  belongs_to :bill
  belongs_to :menu_item
end
