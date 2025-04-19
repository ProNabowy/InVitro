const handleFilter = (DOCTORS, selectedSpecialty, selectedAvailability) => {
  const validSpecialty =
    selectedSpecialty && !selectedSpecialty.includes("Filter");

  const validAvailability =
    selectedAvailability && !selectedAvailability.includes("Filter");

  if (!validSpecialty && !validAvailability) return DOCTORS;

  return DOCTORS.filter((doctor) => {
    if (validSpecialty && doctor.specialty !== selectedSpecialty) {
      return false;
    }

    if (validAvailability) {
      let availableCount = 0;
      let foundMatchingSlot = false;

      for (let i = 0; i < doctor.availability.length; i++) {
        const slot = doctor.availability[i];

        if (doctor.available) {
          availableCount++;

          if (slot.time === selectedAvailability) {
            foundMatchingSlot = true;
          }

          if (foundMatchingSlot && availableCount >= 2) break;
        }
      }

      if (!foundMatchingSlot || availableCount < 2) {
        return false;
      }
    }

    return true;
  });
};

export { handleFilter };
