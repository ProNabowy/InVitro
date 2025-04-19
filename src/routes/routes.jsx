import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { Loading } from "@/components";

// Lazy load components with preload function
const Home = lazy(() => import("../pages/Home"));
const Appointments = lazy(() => import("../pages/Appointments"));

// Preload function to start loading routes in the background
export const preloadRoutes = () => {
  // Start preloading routes
  const homePromise = import("../pages/Home");
  const appointmentsPromise = import("../pages/Appointments");

  // Return a promise that resolves when all routes are loaded
  return Promise.all([homePromise, appointmentsPromise]);
};

export default function useHandleRoutes() {
  let routes = useRoutes([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      ),
    },
    {
      path: "/appointments",
      element: (
        <Suspense fallback={<Loading />}>
          <Appointments />
        </Suspense>
      ),
    },
  ]);

  return { routes };
}
