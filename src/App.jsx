import { Routes, Route } from 'react-router-dom';

import Home from "./scenes/Home";
import Track from './scenes/Track';

const App = () => {
  return (
    <main className="app">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/track/:id" element={<Track />} />
      </Routes>
    </main>
  );
};

export default App;