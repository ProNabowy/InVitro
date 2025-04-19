import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

/**
 * Provides application-wide context values and state management for the app.
 *
 * This context provider manages the visibility of elements, the currently
 * selected doctor, the position of UI components, and the list of appointments.
 * It passes these values and their respective setter functions to the consuming
 * components.
 *
 * @param {React.ReactNode} children - The child components that can access the
 * context values.
 *
 * @returns {JSX.Element} A context provider component wrapping the children
 * with the application context.
 */

const AppProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [appointments, setAppointments] = useState([]);

  // Use useMemo to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      visible,
      setVisible,
      doctor,
      setDoctor,
      position,
      setPosition,
      appointments,
      setAppointments,
    }),
    [visible, doctor, position, appointments]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
