import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Components/layouts/MainLayout";
import DashboardLayout from "./Components/layouts/DashboardLayout";
import Login from "./Pages/Login&Register/Login";
import Register from "./Pages/Login&Register/Register";
import ForgotPassword from "./Pages/Login&Register/ForgotPassword";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Profile from "./Pages/Profile/Profile";
import "./i18n";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Statistics from "./Pages/DashBoard/Statistics";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>


          
          {/* مسارات عامة  */}
          
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>



          {/* مسار لوحة التحكم بدون */}
          
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="profile" element={<Profile />} />
            <Route path="Statistics" element={<Statistics />} />
          </Route>



        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
