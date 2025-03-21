class Slot < ApplicationRecord
  belongs_to :coach, class_name: 'User'
  belongs_to :student, class_name: 'User', optional: true

  validates :start_time, presence: true
  validates :end_time, presence: true
  validate :slot_duration_is_two_hours

  validates :satisfaction_score, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }, allow_nil: true

  scope :available, -> { where(student_id: nil).where('start_time > ?', Time.now) }

  def slot_duration_is_two_hours
    if end_time - start_time != 2.hours
      errors.add(:base, 'Slot must be exactly 2 hours long')
    end
  end
end