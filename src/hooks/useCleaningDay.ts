import { useEffect, useState } from "react";
import {
  doc,
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { CleaningEvent, Participant } from "../types";

const SAMPLE_EVENT: CleaningEvent = {
  id: "demo-event",
  title: "Market Cleaning Day",
  date: "Saturday, Oct 12th",
  time: "7:00 AM — 10:00 AM",
  location: "Main Gate Assembly Point",
  targetParticipants: 60,
  currentParticipants: 45,
};

const SAMPLE_PARTICIPANTS: Participant[] = [
  {
    id: "1",
    name: "Adebayo",
    stallNumber: "A-5",
    joinedAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
  },
  {
    id: "2",
    name: "Chioma",
    stallNumber: "B-12",
    joinedAt: { seconds: Date.now() / 1000 - 3600, nanoseconds: 0 } as any,
  },
  {
    id: "3",
    name: "Emeka",
    stallNumber: "C-3",
    joinedAt: { seconds: Date.now() / 1000 - 7200, nanoseconds: 0 } as any,
  },
  {
    id: "4",
    name: "Fatima",
    stallNumber: "D-8",
    joinedAt: { seconds: Date.now() / 1000 - 10800, nanoseconds: 0 } as any,
  },
];

export function useCleaningDay(eventId: string = "current") {
  const [event, setEvent] = useState<CleaningEvent | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
    if (!projectId) {
      setEvent(SAMPLE_EVENT);
      setParticipants(SAMPLE_PARTICIPANTS);
      setLoading(false);
      return;
    }

    try {
      const unsubEvent = onSnapshot(
        doc(db, "cleaningEvents", eventId),
        (snap) => {
          if (snap.exists()) {
            setEvent({ id: snap.id, ...snap.data() } as CleaningEvent);
          } else {
            setEvent(SAMPLE_EVENT);
          }
          setLoading(false);
        },
        () => {
          setEvent(SAMPLE_EVENT);
          setLoading(false);
        }
      );

      const unsubParticipants = onSnapshot(
        collection(db, "cleaningEvents", eventId, "participants"),
        (snap) => {
          const items = snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as Participant[];
          setParticipants(
            items.length > 0 ? items : SAMPLE_PARTICIPANTS
          );
        },
        () => {
          setParticipants(SAMPLE_PARTICIPANTS);
        }
      );

      // Safety timeout: fall back to sample data if Firestore hasn't
      // responded (e.g. DB not provisioned, rules blocking, network issues)
      const timeout = setTimeout(() => {
        setEvent((prev) => prev ?? SAMPLE_EVENT);
        setParticipants((prev) =>
          prev.length > 0 ? prev : SAMPLE_PARTICIPANTS
        );
        setLoading(false);
      }, 5000);

      return () => {
        clearTimeout(timeout);
        unsubEvent();
        unsubParticipants();
      };
    } catch {
      setEvent(SAMPLE_EVENT);
      setParticipants(SAMPLE_PARTICIPANTS);
      setLoading(false);
    }
  }, [eventId]);

  const joinCleaningDay = async (name: string, stallNumber: string) => {
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
    if (!projectId) {
      // Demo mode: add locally
      const newParticipant: Participant = {
        id: `demo-${Date.now()}`,
        name,
        stallNumber,
        joinedAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
      };
      setParticipants((prev) => [newParticipant, ...prev]);
      setEvent((prev) =>
        prev
          ? { ...prev, currentParticipants: prev.currentParticipants + 1 }
          : prev
      );
      return;
    }

    try {
      await Promise.race([
        (async () => {
          await addDoc(
            collection(db, "cleaningEvents", eventId, "participants"),
            { name, stallNumber, joinedAt: serverTimestamp() }
          );
          await updateDoc(doc(db, "cleaningEvents", eventId), {
            currentParticipants: increment(1),
          });
        })(),
        new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000)),
      ]);
    } catch {
      // Firestore unavailable — update locally for demo
      const newParticipant: Participant = {
        id: `demo-${Date.now()}`,
        name,
        stallNumber,
        joinedAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
      };
      setParticipants((prev) => [newParticipant, ...prev]);
      setEvent((prev) =>
        prev
          ? { ...prev, currentParticipants: prev.currentParticipants + 1 }
          : prev
      );
    }
  };

  return { event, participants, loading, joinCleaningDay };
}
