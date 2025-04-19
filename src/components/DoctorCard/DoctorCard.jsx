import React, { useContext, useEffect, useRef, useCallback } from "react";
import { Star } from "@/assets/icons";
import { AppContext } from "@/context/AppContext";

/**
 * Renders a doctor card component.
 *
 * @param {Object} doctor - The doctor to be rendered in the card.
 * @param {string} doctor.name - The doctor's name.
 * @param {string} doctor.image - The doctor's image URL.
 * @param {number} doctor.rate - The doctor's rating out of 5.
 * @param {boolean} doctor.available - Whether the doctor is available or not.
 *
 * @returns A React component containing a doctor card.
 *
 * @example
 * <DoctorCard doctor={{ name: 'Dr. Sarah', image: 'https://example.com/image.jpg', rate: 4.5, available: true }} />
 */
function DoctorCard({ doctor = {} }) {
  const { setVisible, setDoctor, setPosition, appointments } =
    useContext(AppContext);
  const ref = useRef(null);

  // Check if the user has already booked an appointment with this doctor
  const isBooked = appointments.some(
    (appointment) => appointment.doctorId === doctor.id
  );

  useEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      top: rect.top + window.scrollY + 60,
      left: rect.left + window.scrollX + 0,
    });
  }, [setPosition]);

  const onClick = useCallback(
    (e) => {
      e.stopPropagation();
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY + 60,
        left: rect.left + window.scrollX + 0,
      });
      setVisible(true);
      setDoctor(doctor);
    },
    [doctor, setDoctor, setPosition, setVisible]
  );

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e);
      }
    },
    [onClick]
  );

  return (
    <div
      ref={ref}
      className="border border-[#ced7de] px-2 sm:px-4 py-2 rounded-lg flex sm:items-center justify-between flex-col sm:flex-row gap-3 sm:gap-5 relative z-10"
      role="group"
      aria-labelledby={`doctor-name-${doctor.id}`}
      aria-describedby={`doctor-info-${doctor.id}`}
    >
      <div className="flex items-center gap-3">
        <img
          src={doctor.image}
          className="min-w-20 size-20 rounded-full object-cover"
          alt={`Doctor ${doctor.name}`}
          loading="lazy"
        />
        <div>
          <h3
            id={`doctor-name-${doctor.id}`}
            className="font-medium text-[#010423]"
          >
            {doctor.name}
          </h3>

          <div
            className="flex items-center gap-[2px]"
            aria-label={`Rating: ${doctor.rate} out of 5`}
          >
            {new Array(5).fill(0).map((_, index) => (
              <Star
                className={`w-[15px]  ${
                  index < Math.floor(doctor.rate)
                    ? "fill-[#f8cc0a]"
                    : "fill-[#9e9e9eb3]"
                }`}
                key={index}
              />
            ))}
            <p className="ms-1 font-normal text-sm">{doctor.rate}</p>
          </div>

          <p className="text-sm" id={`doctor-info-${doctor.id}`}>
            {doctor.available ? "Available" : "Unavailable"}
          </p>
        </div>
      </div>

      {doctor.available && (
        <button
          onClick={isBooked ? undefined : onClick}
          onKeyDown={isBooked ? undefined : handleKeyPress}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isBooked
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-primary text-white hover:bg-[#106ff566]/90"
          }`}
          tabIndex={isBooked ? -1 : 0}
          aria-disabled={isBooked}
          data-test={isBooked ? "booked-button" : "book-now-button"}
        >
          {isBooked ? "Booked" : "Book Now"}
        </button>
      )}
    </div>
  );
}

// Wrap with React.memo to prevent unnecessary re-renders
export default React.memo(DoctorCard);
