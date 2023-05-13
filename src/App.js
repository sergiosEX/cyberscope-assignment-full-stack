import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Markets from "./components/Markets";
import CoinDetails from "./components/CoinDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/coins/markets" element={<Markets />} />
        <Route path="/coins/:id" element={<CoinDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;