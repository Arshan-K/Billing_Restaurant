class CreateBillItems < ActiveRecord::Migration[8.0]
  def change
    create_table :bill_items do |t|
      t.references :bill, null: false, foreign_key: true
      t.references :menu_item, null: false, foreign_key: true
      t.integer :quantity
      t.decimal :price_at_time
      t.decimal :total_price

      t.timestamps
    end
  end
end
