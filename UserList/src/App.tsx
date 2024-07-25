import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signUp";
import Home from "./pages/home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp switchToLogin={() => {}} />} />
        <Route path="/login" element={<Login switchToSignUp={() => {}} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
