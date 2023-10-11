import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Reg from "./pages/reg/Register";
import Home from "./pages/home/home";
import Thome from "./pages/travel/traveler_home";
import Trhome from "./pages/train/train_home";
import Bhome from "./pages/booking/booking_home";
import Tacc from "./pages/travel/TravelerAccounts";
import Tradd from "./pages/train/add_train";
import TView from "./pages/travel/TravelerAccountView";
import Tupp from "./pages/travel/TravelerAccountUpdate";
import TViewA from "./pages/travel/traveler_status_a";
import TViewD from "./pages/travel/traveler_status_d";
import TrView from "./pages/train/view_train";
import Trupp from "./pages/train/update_train";
import BView from "./pages/booking/view_booking";
import Busers from "./pages/booking/booking_users";
import BViews from "./pages/booking/view_sbooking";
import Badd from "./pages/booking/booking_create";
import Bup from "./pages/booking/update_booking";
import MainLayout from "./layouts/MainLayout";
import SecondaryLayout from "./layouts/secondary-layout/SecondaryLayout";
import Travellerhome from "./pages/travel/traveler_home";
import TravelerAccountCreate from "./pages/travel/TravelerAccounts";
import TravelerAccountView from "./pages/travel/TravelerAccountView";
import TravelerAccountUpdate from "./pages/travel/TravelerAccountUpdate";
import TravelerAccoutnStatus from "./pages/travel/traveler_status_a";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reg" element={<Reg />} />
          <Route path="/dashboard" element={<SecondaryLayout />}>
            <Route index element={<Travellerhome />} />

            <Route path="traveller" element={<Travellerhome />} />
            <Route
              path="traveller/create-acc"
              element={<TravelerAccountCreate />}
            />
            <Route
              path="traveller/view-acc"
              element={<TravelerAccountView />}
            />
            <Route
              path="traveller/view-acc/:id"
              element={<TravelerAccountUpdate />}
            />
            <Route
              path="traveller/stats-acc"
              element={<TravelerAccoutnStatus />}
            />

            <Route path="booking" element={<Bhome />} />
            <Route path="booking/add" element={<Busers />} />
            <Route path="booking/view" element={<BView />} />

            <Route path="scheduling" element={<Trhome />} />
            <Route path="scheduling/add" element={<Tradd />} />
            <Route path="scheduling/view" element={<TrView />} />
          </Route>

          <Route path="/home" element={<MainLayout component={<Home />} />} />
          <Route path="/thome" element={<MainLayout component={<Thome />} />} />

          <Route
            path="/tupp/:id"
            element={<MainLayout component={<Tupp />} />}
          />

          <Route
            path="/tviewd"
            element={<MainLayout component={<TViewD />} />}
          />
          <Route
            path="/trview"
            element={<MainLayout component={<TrView />} />}
          />
          <Route path="/trupp" element={<MainLayout component={<Trupp />} />} />

          <Route
            path="/bviews/:id"
            element={<MainLayout component={<BViews />} />}
          />
          <Route
            path="/badd/:id/:nic"
            element={<MainLayout component={<Badd />} />}
          />
          <Route path="/bup" element={<MainLayout component={<Bup />} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
