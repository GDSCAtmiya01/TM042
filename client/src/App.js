import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Screen/home';
import Event from './Screen/event';
import Competition from './Screen/competition';
import DetailCompetition from './Screen/detailCompetition';
import About from './Screen/about';
import AllEvent from './Screen/allEvent';
import CreateEvent from './Screen/createEvent';
import CreateCompetition from './Screen/createCompetition';
import Signin from './Screen/signin';
import Signup from './Screen/signup';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<herosection/>}/>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/allevent' element={<AllEvent />} />
          <Route path='/:id' element={<Event />} />
          <Route path='/:id/:id' element={<Competition />} />
          <Route path='/:id/:id/:id' element={<DetailCompetition />} />
          <Route path='/createEvent' element={<CreateEvent />} />
          <Route path='createEvent/:eventId/createCompetition' element={<CreateCompetition />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
