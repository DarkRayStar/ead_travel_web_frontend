import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Reg from "./pages/reg/Register";
import Home from "./pages/home/home";
import MainLayout from "./layouts/MainLayout";
import SecondaryLayout from "./layouts/secondary-layout/SecondaryLayout";
import Travellerhome from "./pages/travel/TravelerHome";
import TravelerAccountCreate from "./pages/travel/TravelerAccounts";
import TravelerAccountView from "./pages/travel/TravelerAccountView";
import TravelerAccountUpdate from "./pages/travel/TravelerAccountUpdate";
import TravelerAccountStatus from "./pages/travel/TravelerStatusActive";
import TravelerAccountStatusDeactive from "./pages/travel/TravelerStatusDeactive";
import Bookinghome from "./pages/booking/BookingHome";
import ScheduleHome from "./pages/train/train_home";
import BookingRequests from "./pages/booking/BookignRequests";
import AllBookings from "./pages/booking/AllBookings";
import CreateSchedule from "./pages/train/CreateSchedule";
import AllSchedules from "./pages/train/AllSchedules";
import UpdateSchedule from "./pages/train/update_train";
import UserBookings from "./pages/booking/UserBookings";
import CreateBooking from "./pages/booking/CreateBooking";
import BookingUpdate from "./pages/booking/update_booking";
import Travelerhome from "./pages/travel/TravelerHome";

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
              element={<TravelerAccountStatus />}
            />
            <Route
              path="traveller/stats-acc-deactive"
              element={<TravelerAccountStatusDeactive />}
            />
            <Route path="booking" element={<Bookinghome />} />
            <Route path="booking/add" element={<BookingRequests />} />
            <Route path="booking/user/:id" element={<UserBookings />} />
            <Route path="booking/update" element={<BookingUpdate />} />
            <Route path="booking/view" element={<AllBookings />} />
            <Route path="booking/:id/:nic" element={<CreateBooking />} />
            <Route path="scheduling" element={<ScheduleHome />} />
            <Route path="scheduling/add" element={<CreateSchedule />} />
            <Route path="scheduling/view" element={<AllSchedules />} />
            <Route path="scheduling/update" element={<UpdateSchedule />} />
          </Route>

          <Route path="/home" element={<MainLayout component={<Home />} />} />
          <Route
            path="/thome"
            element={<MainLayout component={<Travelerhome />} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
