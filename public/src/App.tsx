import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Horoscope from "./pages/Horoscope";
import HoroscopeDashboard from "./pages/Kundli";
import HoroscopeChatSheet from "./pages/HoroscopeChatSheet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Horoscope />} />
        <Route path="/dashboard" element={<HoroscopeDashboard />} />
        <Route path="/chat" element={<HoroscopeChatSheet />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;
