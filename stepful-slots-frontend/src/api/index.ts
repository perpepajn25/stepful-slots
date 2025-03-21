const apiBase = 'http://localhost:3000';

export async function fetchUsers() {
  const res = await fetch(`${apiBase}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function fetchSlots(userId: number) {
  const res = await fetch(`${apiBase}/users/${userId}/slots`);
  if (!res.ok) throw new Error('Failed to fetch slots');
  return res.json();
}

export async function createSlot(userId: number, start: Date, end: Date) {
        const res = await fetch(`${apiBase}/users/${userId}/slots`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slot: { start_time: start, end_time: end} }),
        });
      
        if (!res.ok) throw new Error('Failed to create slot');
      
        return res.json();
    }


export async function updateSlot(userId: number, slotId: number, score: number, notes: string) {
    const res = await fetch(`${apiBase}/users/${userId}/slots/${slotId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slot: { notes, satisfaction_score: score} }),
    });
    if (!res.ok) throw new Error('Failed to set feedback');
    return res.json();
  }

export async function bookSlot(studentId: number, slotId: number) {
  const res = await fetch(`${apiBase}/slots/${slotId}/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ student_id: studentId }),
  });
  if (!res.ok) throw new Error('Failed to book slot');
  return res.json();
}