import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import data from "./data";
import { useState } from "react";
import SingleStream from "./components/SingleStream";
import MetaConnect from "./MetaConnect";
function App() {
  const [streams, setStreams] = useState(data);
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home streams={streams} />} />
          <Route
            path="/streams/:id"
            element={<SingleStream streams={streams} />}
          />

          <Route path="/login" element={<MetaConnect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
