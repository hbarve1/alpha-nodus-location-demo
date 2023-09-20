import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "./pages/HomePage.tsx";
import { LocationPage } from "./pages/LocationPage.tsx";
import { ErrorPage } from "./pages/ErrorPage.tsx";
import { LocationNewPage } from "./pages/LocationNewPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "locations/new",
        element: <LocationNewPage />,
      },
      {
        path: "locations/:locationId",
        element: <LocationPage />,
      },
    ],
  },
]);
