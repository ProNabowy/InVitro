import React from "react";
import PropTypes from "prop-types";
import { useOptimizedMemo, useOptimizedCallback } from "@/hooks";

/**
 * A single appointment card that shows the doctor's name, date, tags, and
 * location. It also supports keyboard navigation and clicking to select the
 * appointment.
 *
 * @param {{ appointment: object, onSelect?: function }} props
 * @param {object} props.appointment - The appointment details.
 * @param {function} [props.onSelect] - The function to call when the
 * appointment is selected.
 *
 * @returns {JSX.Element}
 */
export default function AppointmentsCard({ appointment, onSelect }) {
  if (!appointment) return <></>;

  const descriptionId = `appointment-desc-${appointment.id}`;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(appointment);
    }
  };

  // Use useOptimizedCallback to optimize the date formatting function
  const formatDate = useOptimizedCallback((dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }, []);

  // Use useOptimizedMemo to optimize rendering of appointment details
  const appointmentDetails = useOptimizedMemo(() => {
    return (
      <div
        className="border border-[#ced7de] px-2 sm:px-4 py-2 rounded-lg relative focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        role="group"
        aria-label={`Appointment with ${appointment.name}`}
        aria-describedby={descriptionId}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={() => onSelect?.(appointment)}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-5">
          <h3
            className="text-[#010423] text-sm sm:text-base line-clamp-1"
            id={`appointment-name-${appointment.id}`}
          >
            {appointment.name}
          </h3>
          <p className="text-sm line-clamp-1">{formatDate(appointment.date)}</p>
        </div>

        <div
          className="flex items-center justify-between gap-5"
          id={descriptionId}
        >
          <p className="text-sm text-[#01042376] line-clamp-1">
            {appointment.tags.join(", ")}
          </p>
          <p className="text-sm text-[#01042376] line-clamp-1">
            {appointment.location}
          </p>
        </div>
      </div>
    );
  }, [
    appointment.name,
    appointment.date,
    appointment.tags,
    appointment.location,
    formatDate,
  ]);

  return appointmentDetails;
}

AppointmentsCard.propTypes = {
  appointment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func,
};
