import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbars from "./components/Navbars";
import Content from "./components/Content";
import Footer from "./components/Footer";
import SignUpPage from "./pages/signup";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="w-full z-10 h-screen">
      <Navbars />
      <Content />
      <Footer />
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
