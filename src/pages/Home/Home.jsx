import { useState } from "react";
import { BookingCard, Dropdown, Appointments } from "@/components";
import { DOCTORS_AVAILABILITY, DOCTORS_SPECIALTY } from "@/db/db";

import { Doctors } from "./components";

/**
 * The Home component serves as the main page for doctor booking and managing appointments.
 * It provides dropdowns for filtering doctors by specialty and availability, displays
 * a list of doctors based on the selected filters, and shows the user's current appointments.
 *
 * @returns {JSX.Element} Returns a JSX element containing the doctor booking interface,
 * including dropdown filters, a list of doctors, appointment details, and a booking card.
 */

export default function Home() {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const [selectedAvailability, setSelectedAvailability] = useState(null);

  return (
    <div className="container max-w-[700px] p-3 sm:p-8 sm:my-20 bg-white rounded-sm">
      <h1 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-5">
        Doctor Booking
      </h1>

      <section
        className="flex flex-col gap-8"
        aria-labelledby="filters-heading"
      >
        <div className="flex items-center flex-wrap sm:flex-nowrap gap-3">
          <h2 id="filters-heading" className="sr-only">
            Filter options
          </h2>

          <Dropdown
            placeholder={"Filter by specialty"}
            className="w-full sm:w-1/2"
            options={DOCTORS_SPECIALTY}
            selectedOption={selectedSpecialty}
            setSelectedOption={setSelectedSpecialty}
          />

          <Dropdown
            placeholder={"Filter by Availability"}
            options={DOCTORS_AVAILABILITY}
            selectedOption={selectedAvailability}
            className="w-full sm:w-1/2"
            setSelectedOption={setSelectedAvailability}
          />
        </div>

        <Doctors
          selectedSpecialty={selectedSpecialty}
          selectedAvailability={selectedAvailability}
        />

        <div className="my-5">
          <h2 className="text-2xl font-semibold mb-5">My Appointments</h2>

          <Appointments />
        </div>

        <BookingCard />
      </section>
    </div>
  );
}
