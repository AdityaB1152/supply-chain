import "./App.css";
import AssignRoles from "./AssignRoles";
import Home from "./Home";
import AddCrop from "./AddCrop";
import Supply from "./Supply";
import Track from "./Track";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/roles" element={<AssignRoles />} />
          <Route path="/addCrop" element={<AddCrop />} />
          <Route path="/supply" element={<Supply />} />
          <Route path="/track" element={<Track />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
