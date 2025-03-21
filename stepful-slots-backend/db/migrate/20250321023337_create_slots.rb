class CreateSlots < ActiveRecord::Migration[8.0]
  def change
    create_table :slots do |t|
      t.references :coach, null: false, foreign_key: { to_table: :users }
      t.references :student, foreign_key: { to_table: :users }
      t.datetime :start_time
      t.datetime :end_time
      t.text :notes
      t.integer :satisfaction_score

      t.timestamps
    end
  end
end
