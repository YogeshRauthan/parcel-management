import Login from "./components/auth/login/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";
import { AuthProvider } from "./contexts/authContext";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;