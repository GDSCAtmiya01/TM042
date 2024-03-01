import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Screen/home';
import Event from './Screen/event';
import Competition from './Screen/competition';
import DetailCompetition from './Screen/detailCompetition';
import About from './Screen/about';
import AllEvent from './Screen/allEvent';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/allevent' element={<AllEvent />} />
          <Route path='/:id' element={<Event />} />
          <Route path='/:id/:id' element={<Competition />} />
          <Route path='/:id/:id/:id' element={<DetailCompetition />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
