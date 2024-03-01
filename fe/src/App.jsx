import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseRoute from "./routes/BaseRoute";
import ErrorPage from "./ErrorPage";

import Auth from "./pages/auth/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";

const queryClient = new QueryClient();

axios.defaults.baseURL = process.env.BASE_URL;

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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
