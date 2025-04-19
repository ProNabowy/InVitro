import { Appointments } from "@/components";

/**
 * Renders the appointments page displaying a list of user's appointments.
 *
 * This component utilizes the `AppContext` to access the current list of
 * appointments and displays each appointment using the `AppointmentsCard`
 * component.
 *
 * @returns {JSX.Element} A container with a list of appointment cards.
 */

export default function AppointmentsPage() {
  return (
    <div className="container max-w-[700px] p-3 sm:p-8 sm:my-20 bg-white rounded-sm">
      <h1 className="text-2xl font-semibold mb-5">My Appointments</h1>
      <Appointments />
    </div>
  );
}
