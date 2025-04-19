import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DOCTORS } from "@/db/db";
import { DoctorCard } from "@/components";
import { handleFilter } from "@/assets/utils/utils";
import { useOptimizedMemo, useOptimizedCallback } from "@/hooks";

/**
 * A component that renders a list of doctors based on the given filters.
 * If no filters are provided, it renders all doctors.
 *
 * @param {string} [selectedSpecialty] - The selected specialty to filter by.
 * @param {string} [selectedAvailability] - The selected availability to filter by.
 * @returns {React.ReactElement} - A React component that renders a list of doctor cards.
 */
export default function Doctors({
  selectedSpecialty = null,
  selectedAvailability = null,
}) {
  const [doctors, setDoctors] = useState(DOCTORS);

  // Use useOptimizedMemo to optimize filtering
  const filteredDoctors = useOptimizedMemo(() => {
    return handleFilter(DOCTORS, selectedSpecialty, selectedAvailability);
  }, [selectedSpecialty, selectedAvailability]);

  // Use useOptimizedCallback for the update function
  const updateDoctors = useOptimizedCallback((newDoctors) => {
    setDoctors(newDoctors);
  }, []);

  useEffect(() => {
    updateDoctors(filteredDoctors);
  }, [filteredDoctors, updateDoctors]);

  if (!doctors.length)
    return (
      <>
        <div
          className="flex flex-col items-center justify-center h-64 text-center p-4"
          role="status"
          aria-live="polite"
        >
          <img
            src="/images/doctor.png"
            alt="No doctors illustration"
            className="w-32 h-32 mb-4"
            loading="lazy"
          />
          <h2 className="text-xl font-semibold text-gray-800">
            No Doctors Yet
          </h2>
          <p className="text-gray-500 mt-2">
            We couldn&apos;t find any doctors match your criteria. Try changing
            the Filters or check back later.
          </p>
        </div>
      </>
    );

  return (
    <div
      className="flex flex-col gap-2 relative z-10"
      role="list"
      aria-label="Doctors list"
    >
      {doctors.map((doctor) => {
        return <DoctorCard doctor={doctor} key={doctor.id} />;
      })}
    </div>
  );
}

Doctors.propTypes = {
  selectedSpecialty: PropTypes.string,
  selectedAvailability: PropTypes.string,
};
