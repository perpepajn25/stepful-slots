import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, View, Views, luxonLocalizer } from 'react-big-calendar';
import { DateTime, Settings } from 'luxon'
import { Box } from '@mui/material';
import { Slot, User } from '../types';
import { useState, useCallback } from 'react';
import { createSlot } from '@/api';


Settings.defaultZone = 'America/New_York'

// Localizer for the calendar
const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 7 })

interface CalendarViewProps {
  slots: Slot[];
  currentUser: User;
  handleOnSelectSlot: (slot: Slot) => void;
  onSetSlots: React.Dispatch<React.SetStateAction<Slot[]>>;
}

const CalendarView: React.FC<CalendarViewProps> = ({ slots, currentUser, handleOnSelectSlot, onSetSlots }) => {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<View>(Views.WEEK)
  
  const onNavigate = useCallback((newDate: Date) => {
    setDate(newDate)
  }, [])
  
  const onView = useCallback((newView: View) => {
    setView(newView)
  }, [])

 
const handleCreateSlot = useCallback(
  async ({ start, end }: { start: Date; end: Date }) => {
    const confirmCreate = window.confirm(
      `Create slot from ${start.toLocaleString()} to ${end.toLocaleString()}?`
    );

    if (confirmCreate) {
      try {
        const newEvent = await createSlot(currentUser.id, start, end);
        const formattedNewEvent = {
          ...newEvent,
          start: new Date(newEvent.start),
          end: new Date(newEvent.end),
        };

        onSetSlots((prevSlots) => [...prevSlots, formattedNewEvent]);
      } catch (error) {
        alert('Failed to create slot.');
      }
    }
  },
  []
);

  return (
    <Box my={4}>
      <Calendar
        localizer={localizer}
        onNavigate={onNavigate}
        onView={onView}
        view={view}
        date={date}
        selectable
        events={slots.map(slot => ({
          title: slot.student
          ? 'Booked'
          : DateTime.fromISO(slot.end_time) < DateTime.now()
            ? 'Unfilled (Past)'
            : 'Available',
          start: new Date(slot.start_time),
          end: new Date(slot.end_time),
          resource: slot,
        }))}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleCreateSlot}
        onSelectEvent={(event) => handleOnSelectSlot(event.resource)}
        style={{ height: 600 }}   
      />
    </Box>
  );
};

export default CalendarView;