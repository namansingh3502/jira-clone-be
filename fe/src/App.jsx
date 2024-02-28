import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseRoute from "./routes/BaseRoute";
import ErrorPage from "./ErrorPage";

import Auth from "./pages/auth/Auth";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <BaseRoute />,
    errorElement: <ErrorPage />,
  },
]);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
