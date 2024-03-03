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
import Herosection from './Screen/herosection';
import Signin from './Screen/signin';
import Signup from './Screen/signup';
import Admin from './Screen/admin';
import Registration from './Screen/registration';
import Admin_View from './Screen/Admin_View';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Herosection/>}/>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/home' element={<Home />} />
          <Route path='/About us' element={<About />} />
          <Route path='/allevent' element={<AllEvent />} />
          <Route path='/:uniId' element={<Event />} />
          <Route path='/:uniId/:eventId' element={<Competition />} />
          <Route path='/:uniId/:eventId/:compId' element={<DetailCompetition />} />
          <Route path='/:uniId/createEvent' element={<CreateEvent />} />
          <Route path='/:uniId/createEvent/:eventId/createCompetition' element={<CreateCompetition />} />
          <Route path='/:uniId/:eventId/:compId/register' element={<Registration />} />
          <Route path='/adminView' element={<Admin_View />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
