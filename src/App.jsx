import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/sign-up";
import ChatLayout from "./layout/chat-layout";
import ChatPage from "./pages/chat-page/chart-page";
import ProfileUpdatePage from "./pages/profile-page/profile-update";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./layout/protected-route";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/chat" element={<ChatLayout />}>
            <Route path="/chat/:id" element={<ChatPage />} />
          </Route>

          <Route path="/profile" element={<ProfileUpdatePage />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
