Slot.destroy_all
User.destroy_all

# Create coaches
coaches = 4.times.map do |i|
  User.create!(
    name: "Coach #{i + 1}",
    phone_number: "888-555-100#{i + 1}",
    role: 'coach'
  )
end

# Create students
students = 4.times.map do |i|
  User.create!(
    name: "Student #{i + 1}",
    phone_number: "888-555-200#{i + 1}",
    role: 'student'
  )
end

# Helper method to get a random start time this week between 8am–4pm (ending by 6pm)
def random_slot_start_time_this_week
  start_of_week = Time.current.beginning_of_week(:sunday)
  day_offset = rand(0..6).days
  hour_offset = rand(8..16).hours # start times between 8am and 4pm
  start_of_week + day_offset + hour_offset
end

coaches.each_with_index do |coach, index|
  # 2 available slots per coach
  2.times do
    start_time = random_slot_start_time_this_week
    Slot.create!(
      coach: coach,
      start_time: start_time,
      end_time: start_time + 2.hours
    )
  end

  # 1 booked slot with student
  booked_start = random_slot_start_time_this_week
  Slot.create!(
    coach: coach,
    student: students[index],
    start_time: booked_start,
    end_time: booked_start + 2.hours
  )

  # 1 past slot last week with satisfaction_score and notes
  past_start = (Time.current.beginning_of_week(:sunday) - rand(1..7).days) + rand(8..16).hours
  Slot.create!(
    coach: coach,
    student: students[index],
    start_time: past_start,
    end_time: past_start + 2.hours,
    satisfaction_score: rand(1..5),
    notes: "Great session with #{students[index].name}"
  )
end

puts "✅ Seeded #{User.count} users and #{Slot.count} slots for this week!"