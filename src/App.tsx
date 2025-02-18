import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import UsersPage from './pages/UsersPage';
import ChestPage from './pages/ChestPage';
import FriendsPage from './pages/FriendsPage';
import AwardPage from './pages/AwardPage';

function App() {
  return (
    <div className="App" style={{
      }}>
      <Link to="/">
        <img className='logoName' src='/pictures/logo_name.png' alt='logo_name'/>
      </Link>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/friends' element={<FriendsPage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/chest' element={<ChestPage />} />
        <Route path='/award' element={<AwardPage />} />
      </Routes>
    </div>
  );
}

export default App;
