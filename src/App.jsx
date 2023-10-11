import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Reg from "./pages/reg/reg";
import Home from "./pages/home/home";
import Thome from "./pages/travel/traveler_home";
import Trhome from "./pages/train/train_home";
import Bhome from "./pages/booking/booking_home";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import Tacc from "../src/pages/travel/traveler_account";
import Tradd from "../src/pages/train/add_train";
import TView from "../src/pages/travel/taveler_view";
import Tupp from "../src/pages/travel/traveler_update";
import TViewA from "../src/pages/travel/traveler_status_a";
import TViewD from "../src/pages/travel/traveler_status_d";
import TrView from "../src/pages/train/view_train";
import Trupp from "../src/pages/train/update_train";
import BView from "../src/pages/booking/view_booking";
import Busers from "../src/pages/booking/booking_users";
import BViews from "../src/pages/booking/view_sbooking";
import Badd from "../src/pages/booking/booking_create";
import Bup from "../src/pages/booking/update_booking"
const Layout = ({ childComponent }) => {
  return (
    <div>
      <Header />
      {childComponent}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reg" element={<Reg />} />
          <Route path="/home" element={<Layout childComponent={<Home />} />} />
          <Route
            path="/thome"
            element={<Layout childComponent={<Thome />} />}
          />
          <Route
            path="/trhome"
            element={<Layout childComponent={<Trhome />} />}
          />
          <Route
            path="/bhome"
            element={<Layout childComponent={<Bhome />} />}
          />
          <Route path="/tacc" element={<Layout childComponent={<Tacc />} />} />
          <Route
            path="/tradd"
            element={<Layout childComponent={<Tradd />} />}
          />
          <Route
            path="/tview"
            element={<Layout childComponent={<TView />} />}
          />
          <Route
            path="/tupp/:id"
            element={<Layout childComponent={<Tupp />} />}
          />
          <Route
            path="/tviewa"
            element={<Layout childComponent={<TViewA />} />}
          />
          <Route
            path="/tviewd"
            element={<Layout childComponent={<TViewD />} />}
          />
          <Route
            path="/trview"
            element={<Layout childComponent={<TrView />} />}
          />
          <Route
            path="/trupp"
            element={<Layout childComponent={<Trupp />} />}
          />
          <Route
            path="/bview"
            element={<Layout childComponent={<BView />} />}
          />
          <Route
            path="/buse"
            element={<Layout childComponent={<Busers />} />}
          />
          <Route
            path="/bviews/:id"
            element={<Layout childComponent={<BViews />} />}
          />
          <Route
            path="/badd/:id/:nic"
            element={<Layout childComponent={<Badd />} />}
          />
          <Route
            path="/bup"
            element={<Layout childComponent={<Bup />} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
