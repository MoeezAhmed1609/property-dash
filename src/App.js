import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Analytics from "./pages/Dashboard/Analytics";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import FormElements from "./pages/Form/FormElements";
import FormLayout from "./pages/Form/FormLayout";
import Tables from "./pages/Tables";
import Settings from "./pages/Settings";
import Chart from "./pages/Chart";
import Alerts from "./pages/UiElements/Alerts";
import Buttons from "./pages/UiElements/Buttons";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Redux/Store";
import useAuthState from "./hooks/useAuthState";
import PropertyView from "./pages/PropertyView";
import UpdateProperty from "./pages/UpdateProperty";
import useLocalStorage from "./hooks/useLocalStorage";
import {
  AboutUsGuide,
  Blog,
  Contact,
  Enquiry,
  Login,
  Properties,
  Register,
  Team,
  TeamUpdated,
  Testimonials,
  User,
} from "./pages";
import ContentUpload from "./pages/ContentUpload";
import Content from "./pages/ContentUpload/Content";
import DashboardUsers from "./pages/DashboardUsers";

import "react-modern-drawer/dist/index.css";
import BrokerEnquiry from "./pages/BrokerEnquiry.js";
import Subscription from "./pages/Subscription";

const App = () => {
  const [loading, setLoading] = useState(true);

  const preloader = document.getElementById("preloader");

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    !loading && (
      <>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes>
              <Route
                path="/"
                element={useAuthState ? <Analytics /> : <Login />}
              />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/forms/form-elements" element={<FormElements />} />
              <Route path="/forms/form-layout" element={<FormLayout />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/chart" element={<Chart />} />
              <Route path="/ui/alerts" element={<Alerts />} />
              <Route path="/ui/buttons" element={<Buttons />} />
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user" element={<User />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/testimonial" element={<Testimonials />} />
              <Route path="/Single/:id" element={<PropertyView />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/:id" element={<UpdateProperty />} />
              <Route path="/enquiry" element={<Enquiry />} />
              <Route path="/broker-enquiry" element={<BrokerEnquiry />} />
              <Route path="/team" element={<Team />} />
              <Route path="/team/:id" element={<TeamUpdated />} />
              <Route path="/about" element={<AboutUsGuide />} />
              <Route path="/content" element={<ContentUpload />} />
              <Route path="/dash/users" element={<DashboardUsers />} />
              <Route path="/subscription" element={<Subscription />} />
            </Routes>
          </PersistGate>
        </Provider>
      </>
    )
  );
};

export default App;
