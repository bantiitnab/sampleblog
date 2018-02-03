class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.text :body
      t.string :created_by
      t.references :post, foreign_key: true

      t.timestamps
    end
  end
end
