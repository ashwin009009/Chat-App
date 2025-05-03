import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";

export default function App() {
  const getUser = () => {
    const user = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
    return user ? JSON.parse(user) : null;
  };

  const ProtectedRoute = ({ children }) => {
    const user = getUser();
    if (!user) return <Navigate to="/login" replace />;
    if (!user.isAvatarImageSet) return <Navigate to="/setAvatar" replace />;
    return children;
  };

  const AvatarRoute = ({ children }) => {
    const user = getUser();
    if (!user) return <Navigate to="/login" replace />;
    if (user.isAvatarImageSet) return <Navigate to="/" replace />;
    return children;
  };

  const GuestRoute = ({ children }) => {
    const user = getUser();
    if (user) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/setAvatar"
          element={
            <AvatarRoute>
              <SetAvatar />
            </AvatarRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}


