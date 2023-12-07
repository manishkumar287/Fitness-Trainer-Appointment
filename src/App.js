import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CalendarPage from "./components/CalendarPage";
import ClientDetails from "./components/ClientDetails";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calender" element={<CalendarPage />} />
          <Route path="/:id" element={<ClientDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
