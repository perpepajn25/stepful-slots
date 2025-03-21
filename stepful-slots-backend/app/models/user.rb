class User < ApplicationRecord
    has_many :coach_slots, class_name: 'Slot', foreign_key: 'coach_id'
    has_many :student_slots, class_name: 'Slot', foreign_key: 'student_id'
  
    validates :role, inclusion: { in: %w[coach student] }

    def coach?
        role == 'coach'
    end

    def student?
        role == 'student'
    end
  end