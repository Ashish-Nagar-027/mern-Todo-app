import "./App.css";

import { Route, Routes } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import Login from "./pages/LoginPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import AuthSuccess from "./pages/AuthSuccess";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
      </Routes>
    </div>
  );
}

export default App;
