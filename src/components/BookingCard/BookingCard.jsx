import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import useClickOutside from "@/hooks/useClickOutside";

/**
 * Renders a booking card for a doctor.
 *
 * @returns A React component containing a booking card for a doctor.
 *
 * @example
 * <BookingCard />
 */

export default function BookingCard() {
  const { visible, setVisible, doctor, position, setAppointments } =
    useContext(AppContext);
  const [selectedTime, setSelectedTime] = useState({});

  useClickOutside({
    setState: () => {
      setVisible(false);
      setSelectedTime({});
    },
  });

  if (!doctor) return <></>;

  const onSubmit = () => {
    setVisible(false);

    setAppointments((prev) => {
      const exists = prev.some((item) => item.doctorId === doctor.id);

      const appointment = {
        ...doctor,
        doctorId: doctor.id,
        date: `${selectedTime.date}, ${selectedTime.time}`,
      };

      if (exists) {
        return prev.map((item) =>
          item.doctorId === doctor.id ? appointment : item
        );
      }

      return [...prev, appointment];
    });

    setSelectedTime({});
  };

  const handleKeySelect = (e, availability) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedTime(availability);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        top: position.top,
        right: position.left,
      }}
      className={`w-[300px] transition p-4 py-8 rounded-lg shadow-lg absolute right-0 top-10 z-[200] bg-white ${
        visible ? "visible opacity-100" : "invisible opacity-0"
      }`}
      role="dialog"
      aria-labelledby="booking-title"
      aria-describedby="booking-desc"
    >
      <h3 className="font-medium text-[#010423] mb-3" id="booking-title">
        {doctor.name}
      </h3>

      <p className="text-sm" id="booking-desc">
        {doctor.available ? "Available" : "Unavailable"}
      </p>

      <ul
        className="my-3 flex flex-col gap-2"
        role="listbox"
        aria-label="Available times"
      >
        {doctor.availability.map((availability) => (
          <li key={availability.time} role="option">
            <button
              onClick={() => setSelectedTime(availability)}
              onKeyDown={(e) => handleKeySelect(e, availability)}
              tabIndex={0}
              aria-selected={selectedTime.time === availability.time}
              className={`border border-[#ced7de] py-2 px-3 w-full rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                selectedTime.time === availability?.time
                  ? "bg-primary text-white"
                  : "hover:text-primary hover:border-primary"
              }`}
            >
              {availability.time}
            </button>
          </li>
        ))}
      </ul>

      <button
        disabled={!selectedTime?.time}
        onClick={onSubmit}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && selectedTime?.time) {
            onSubmit();
          }
        }}
        tabIndex={0}
        className="py-2 px-3 w-full rounded-md bg-primary text-white font-medium disabled:cursor-not-allowed disabled:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Confirm appointment"
      >
        Confirm
      </button>
    </div>
  );
}
