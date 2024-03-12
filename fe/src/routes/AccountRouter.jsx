import Authentication from "~/src/pages/auth/Authentication";
import AccountActivation from "~/src/pages/auth/AccountActivation";
import ErrorPage from "~/src/ErrorPage";
import Page404 from "~/src/Page404";

export default AccountRouter = [
  {
    path: "*",
    element: <Page404 />,
  },
  {
    path: "authentication",
    element: <Authentication />,
    errorElement: <ErrorPage />,
  },
  {
    path: "activate",
    element: <AccountActivation />,
    errorElement: <ErrorPage />,
  },
  {
    path: "activate/:uidb64/:token",
    element: <AccountActivation />,
    errorElement: <ErrorPage />,
  },
  {
    path: "reset-password",
    element: <Authentication />,
    errorElement: <ErrorPage />,
  },
];
