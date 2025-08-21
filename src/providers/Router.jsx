import { createBrowserRouter, Outlet } from "react-router";

import ProtectionProvider from "./ProtectionProvider";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../routes/Login";
import Error from "../routes/Error";
import Users from "../routes/Users";
import Requests from "../routes/Requests";
import Companies from "../routes/Companies";
import DashBoard from "./../routes/DashBoard";
import GeneralSettings from "../routes/GeneralSettings";
import ProvidersUsers from "../routes/ProvidersUsers";
import ToolOrders from "../routes/ToolOrders";
import Support from "../routes/Support";
import Activities from "../routes/Activities";
import TripTypes from "../routes/TripTypes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: (
          <ProtectionProvider>
            <DashboardLayout />
          </ProtectionProvider>
        ),
        children: [
          {
            index: true,
            element: <DashBoard />,
          },
          {
            path: "general-settings",
            element: <GeneralSettings />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "providers",
            element: <ProvidersUsers />,
          },
          {
            path: "companies",
            element: <Companies />,
          },
          {
            path: "requests",
            element: <Requests />,
          },
          {
            path: "tools",
            element: <ToolOrders />,
          },
          {
            path: "activities",
            element: <Activities />,
          },
          {
            path: "support",
            element: <Support />,
          },
          {
            path: "trip-types",
            element: <TripTypes />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
