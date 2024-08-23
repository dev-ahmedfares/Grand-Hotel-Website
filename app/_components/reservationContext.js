"use client";
import { createContext, useContext, useState } from "react";

const reservationContext = createContext();

const initialValue = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialValue);
  const resetRange = () => {
    setRange(initialValue);
  };
  return (
    <reservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </reservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(reservationContext);

  if (context === undefined) return null;

  return context;
}

export { ReservationProvider, useReservation };
