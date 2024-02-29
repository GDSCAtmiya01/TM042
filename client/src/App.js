import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Screen/home';
import Event from './Screen/event';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/home/:id' element={<Event />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
