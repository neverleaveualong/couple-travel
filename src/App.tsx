import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DomesticMap from './pages/DomesticMap';
import Travel from './pages/Travel';
import Plans from './pages/Plans';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/korea-map" element={<DomesticMap />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/plans" element={<Plans />} />
      </Routes>
    </BrowserRouter>
  );
}
