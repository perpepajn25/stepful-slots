import Head from "next/head";
import { useState, useEffect } from "react";
import { User, Slot } from "../types";
import UserSelector from "../components/UserSelector";
import CalendarView from "../components/CalendarView";
import SlotModal from "../components/SlotModal";
import { fetchUsers, fetchSlots } from "../api";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  
  useEffect(() => {
    fetchUsers().then((fetchedUsers) => {
      setUsers(fetchedUsers);
      if (fetchedUsers.length > 0) {
        setCurrentUser(fetchedUsers[0]);
      }
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchSlots(currentUser.id).then(setSlots);
    }
  }, [currentUser]);

  const handleUpdateSlot = (updatedSlot: Slot) => {
    setSlots((prevSlots) =>
      prevSlots.map((slot) => (slot.id === updatedSlot.id ? updatedSlot : slot))
    );
  };

  return (
    <>
      <Head>
        <title>Stepful Slots</title>
      </Head>

      <UserSelector
        users={users}
        currentUser={currentUser}
        handleOnChange={setCurrentUser}
      />

      {currentUser && (
        <CalendarView
          slots={slots}
          handleOnSelectSlot={setSelectedSlot}
          onSetSlots={setSlots}
          currentUser={currentUser}
        />
      )}

      <SlotModal
        slot={selectedSlot}
        open={true}
        handleUpdateSlot={handleUpdateSlot}
        handleOnClose={() => setSelectedSlot(null)}
        currentUser={currentUser}
      />
    </>
  );
}
