import React, { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import AppointmentsCard from "../AppointmentsCard";
import { useOptimizedMemo } from "@/hooks";

/**
 * Renders the appointments page displaying a list of user's appointments.
 *
 * This component utilizes the `AppContext` to access the current list of
 * appointments and displays each appointment using the `AppointmentsCard`
 * component.
 *
 * @returns {JSX.Element} A container with a list of appointment cards.
 */
function Appointments() {
  const { appointments } = useContext(AppContext);

  // Use useOptimizedMemo to optimize rendering of appointment cards
  const appointmentCards = useOptimizedMemo(() => {
    return appointments.map((appointment) => (
      <AppointmentsCard appointment={appointment} key={appointment.id} />
    ));
  }, [appointments]);

  if (appointments.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center h-64 text-center p-4"
        role="status"
        aria-live="polite"
      >
        <img
          src="/images/appointment.png"
          alt="No appointments illustration"
          className="w-32 h-32 mb-4"
          loading="lazy"
        />
        <h2 className="text-xl font-semibold text-gray-800">
          No Appointments Yet
        </h2>
        <p className="text-gray-500 mt-2">
          You don&apos;t have any upcoming appointments. Book a doctor to get
          started.
        </p>
      </div>
    );
  }
  return (
    <div
      className="flex flex-col gap-2 relative z-10"
      data-test="appointments-list"
      role="list"
      aria-label="Appointments list"
    >
      {appointmentCards}
    </div>
  );
}

export default React.memo(Appointments);
