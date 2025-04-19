import { Fragment, Suspense, memo } from "react";
import "./assets/styles/App.css";
import useHandleRoutes from "./routes/routes";
import { Loading, ErrorBoundary } from "./components";
import { Header } from "./layouts";

// Memoize the Header component to prevent unnecessary re-renders
const MemoizedHeader = memo(Header);

/**
 * The main application component.
 *
 * This component renders the entire app, including the header, loading
 * fallback, and main content area. The main content area is a {@link Suspense}
 * component that renders the {@link routes} returned by
 * {@link useHandleRoutes}. The fallback is rendered when the routes are
 * loading.
 *
 * @returns {JSX.Element} The main app component.
 *
 * @example
 * <App />
 */
function App() {
  const { routes } = useHandleRoutes();

  return (
    <Fragment>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <MemoizedHeader />
          <main className="flex-1">{routes}</main>
        </Suspense>
      </ErrorBoundary>
    </Fragment>
  );
}

export default App;
