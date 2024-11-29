import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";
import Trips from "./pages/Trips.jsx";
import Trip from "./pages/Trip.jsx";
import Guides from "./pages/Guides.jsx";
import Login from "./components/LoginPage.jsx";
import NotFound from "./pages/NotFound.jsx";

import "./styles/App.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="trips" element={<Trips />} />
      <Route path="guides" element={<Guides />} />
      <Route path="trip" element={<Trip />} />
   
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
