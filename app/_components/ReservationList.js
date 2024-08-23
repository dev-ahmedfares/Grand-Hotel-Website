"use client";
import { deleteReservation } from "../_lib/actions";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDeleting] = useOptimistic(
    bookings,
    (currBooking, bookingId) => {
      return currBooking.filter((booking) => booking.id !== bookingId);
    },
  );

  async function handleDeleting(bookingId) {
    optimisticDeleting(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDeleting}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
