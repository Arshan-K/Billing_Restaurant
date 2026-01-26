class CreateBills < ActiveRecord::Migration[8.0]
  def change
    create_table :bills do |t|
      t.decimal :total_amount
      t.integer :payment_method
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
