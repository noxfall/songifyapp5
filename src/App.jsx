import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { keepMode } from './utils/theme';

import Home from "./scenes/Home";
import Track from './scenes/Track';
import Favorites from './scenes/Favorites';
import Navbar from './components/Navbar';

const App = () => {

  useEffect(() => {
    keepMode();
  })

  return (
    <main className="app">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/track/:id" element={<Track />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </main>
  );
};

export default App;