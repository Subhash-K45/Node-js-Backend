import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import MainPage from "./MainPage";

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="SignUp"></Route>
      </Routes>
    
  );
};

export default App;
