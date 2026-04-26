import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import LandingPage from "./pages/LandingPage";
import PatientDashboard from "./pages/PatientDashboard";
import AIScreening from "./pages/AIScreening";
import DoctorPanel from "./pages/DoctorPanel";
import Appointments from "./pages/Appointments";
import Reports from "./pages/Reports";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import { RequireRole } from "./auth/RequireAuth";
import ColorTest from "./pages/ColorTest";
import VisionTest from "./pages/VisionTest";

import AmslerGridTest from "./pages/AmslerGridTest";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      {
        path: "dashboard",
        element: (
          <RequireRole role="patient">
            <PatientDashboard />
          </RequireRole>
        ),
      },
      {
        path: "color-test",
        element: (
          <RequireRole role="patient">
            <ColorTest />
          </RequireRole>
        ),
      },
      {
        path: "vision-test",
        element: (
          <RequireRole role="patient">
            <VisionTest />
          </RequireRole>
        ),
      },
      {
        path: "pressure-test",
        element: (
          <RequireRole role="patient">
            <AmslerGridTest />
          </RequireRole>
        ),
      },
      {
        path: "screening",
        element: (
          <RequireRole role="patient">
            <AIScreening />
          </RequireRole>
        ),
      },
      {
        path: "appointments",
        element: (
          <RequireRole role="patient">
            <Appointments />
          </RequireRole>
        ),
      },
      {
        path: "reports",
        element: (
          <RequireRole role="patient">
            <Reports />
          </RequireRole>
        ),
      },
      {
        path: "chatbot",
        element: (
          <RequireRole role="patient">
            <Chatbot />
          </RequireRole>
        ),
      },
      {
        path: "doctor",
        element: (
          <RequireRole role="doctor">
            <DoctorPanel />
          </RequireRole>
        ),
      },
      {
        path: "admin",
        element: (
          <RequireRole role="admin">
            <AdminDashboard />
          </RequireRole>
        ),
      },
    ],
  },
]);