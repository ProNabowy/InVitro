import React from "react";
import PropTypes from "prop-types";
import { useOptimizedMemo, useOptimizedCallback } from "@/hooks";
import { AppContext } from "@/context/AppContext";

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
  const { setAppointments } = React.useContext(AppContext);

  // Use useOptimizedCallback to optimize the date formatting function
  const formatDate = useOptimizedCallback((dateString) => {
    if (!dateString) return "";

    // Parse the date string
    const date = new Date(dateString);

    // Format the date with options
    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    // Return the formatted date and time
    return date.toLocaleString(undefined, dateOptions);
  }, []);

  // Handle appointment cancellation
  const handleCancel = useOptimizedCallback(
    (e) => {
      e.stopPropagation();
      setAppointments((prev) =>
        prev.filter((item) => item.doctorId !== appointment.doctorId)
      );
    },
    [appointment?.doctorId, setAppointments]
  );

  // Handle keyboard interaction for cancel button
  const handleCancelKeyDown = useOptimizedCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        handleCancel(e);
      }
    },
    [handleCancel]
  );

  // Use useOptimizedMemo to optimize rendering of appointment details
  const appointmentDetails = useOptimizedMemo(() => {
    if (!appointment) return null;

    const descriptionId = `appointment-desc-${
      appointment.doctorId || appointment.id
    }`;

    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect?.(appointment);
      }
    };

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
            id={`appointment-name-${appointment.doctorId || appointment.id}`}
          >
            {appointment.name}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-sm line-clamp-1">
              {formatDate(appointment.date)}
            </p>
            <button
              onClick={handleCancel}
              onKeyDown={handleCancelKeyDown}
              className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full p-1"
              aria-label={`Cancel appointment with ${appointment.name}`}
              data-test="cancel-appointment-button"
              tabIndex={0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
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
  }, [appointment, formatDate, handleCancel, handleCancelKeyDown, onSelect]);

  return appointmentDetails;
}

AppointmentsCard.propTypes = {
  appointment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    location: PropTypes.string.isRequired,
    doctorId: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func,
};
