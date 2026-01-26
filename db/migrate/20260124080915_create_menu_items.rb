class CreateMenuItems < ActiveRecord::Migration[8.0]
  def change
    create_table :menu_items do |t|
      t.string :name
      t.decimal :price
      t.references :category, null: false, foreign_key: true
      t.string :image_url
      t.boolean :active

      t.timestamps
    end
  end
end
