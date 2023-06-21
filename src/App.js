import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AnimeItem from "./components/AnimeItem";
import Homepage from "./components/HomePage";
import Gallery from "./components/Gallery";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/character/:id" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;
