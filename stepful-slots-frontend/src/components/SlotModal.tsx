import { Box, Button, FormControl, InputLabel, Modal,TextField, Select, Typography, MenuItem } from '@mui/material';
import { DateTime } from 'luxon';
import { Slot, User } from '../types';
import { useState, useEffect } from 'react';
import{ bookSlot, updateSlot} from '../api'

interface SlotModalProps {
  slot: Slot | null;
  open: boolean;
  handleOnClose: () => void;
  currentUser: User | null;
  handleUpdateSlot: (slot: Slot) => void
}

const SlotModal: React.FC<SlotModalProps> = ({ currentUser, slot, open, handleOnClose, handleUpdateSlot }) => {
  const [score, setScore] = useState<number | ''>('');
  const [notes, setNotes] = useState('');
  
  useEffect(() => {
    if (slot) {
      setScore(slot.satisfaction_score || '');
      setNotes(slot.notes || '');
    }
  }, [slot]);

  if (!slot || !currentUser) return null;

  const isPast = DateTime.fromISO(slot.end_time) < DateTime.now();
  const isStudent = currentUser?.role === 'student';
  const isCoach = currentUser?.role === 'coach';
  const slotBooked = !!slot.student

  const handleBook = () => {
    bookSlot(currentUser?.id as number, slot.id)
    .then((updatedSlot) => {
        handleUpdateSlot({
          ...slot,
          student: currentUser
        });
        handleOnClose();
      })
      .catch((err) => alert(err.message));
  };
  
  const handleSubmit = () => {
    updateSlot(currentUser.id, slot.id, score as number, notes)
    .then((updatedSlot) => {
      handleUpdateSlot({
        ...slot,
        notes: updatedSlot.notes,
        satisfaction_score: updatedSlot.satisfaction_score,
      });
      handleOnClose();
    })
    .catch((err) => alert(err.message));
  };

  return (
    <Modal open={open} onClose={handleOnClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper', p: 4, width: 400, boxShadow: 24, borderRadius: 2
      }}>
        <Typography variant="h6">Slot Details</Typography>
        {isStudent && <Typography>Coach: {slot.coach.name} ({slot.coach.phone_number})</Typography>}
        {isCoach && slotBooked && (
          <Typography>Booked by: {slot.student?.name} ({slot.student?.phone_number})</Typography>
        )}
        <Typography>Start: {DateTime.fromISO(slot.start_time).toLocaleString(DateTime.DATETIME_MED)}</Typography>
        <Typography>End: {DateTime.fromISO(slot.end_time).toLocaleString(DateTime.DATETIME_MED)}</Typography>
        {isStudent && !slotBooked && (
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleBook}>
            Book This Slot
          </Button>
        )}
         {isCoach && slotBooked && isPast && (
          <>
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel id="score-label">Satisfaction Score</InputLabel>
              <Select
                key="score"
                value={score}
                label="Satisfaction Score"
                onChange={(e) => setScore(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((val) => (
                  <MenuItem key={val} value={val}>{val}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Notes"
              multiline
              rows={3}
              fullWidth
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              Submit Feedback
            </Button>
          </>
          )}
      </Box>
    </Modal>
  );
};

export default SlotModal;