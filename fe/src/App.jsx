import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import axios from "axios";

import BaseRoute from "~/src/routes/BaseRoute";
import ErrorPage from "~/src/ErrorPage";
import Page404 from "~/src/Page404";
import Auth from "~/src/pages/auth/Auth";

/* react query settings */
const queryClient = new QueryClient();

/* axios config settings */
axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.withCredentials = true;
axios.interceptors.request.use(async (config) => {
  // some fun things needs to be done here
  return config;
});

/* base router settings */
const router = createBrowserRouter([
  {
    path: "*",
    element: <Page404 />,
  },
  {
    path: "/auth/*",
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/*",
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
