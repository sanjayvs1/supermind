import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Horoscope from "./pages/Horoscope";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Horoscope />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
