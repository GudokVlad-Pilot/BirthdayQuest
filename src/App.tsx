import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import NumbersPage from './pages/NumbersPage';
import UsersPage from './pages/UsersPage';
import ChestPage from './pages/ChestPage';

function App() {
  return (
    <div className="App" style={{
        // backgroundImage: `url(${Background})` 
      }}>
       <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/numbers' element={<NumbersPage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/chest' element={<ChestPage />} />
      </Routes>
    </div>
  );
}

export default App;


// import React, {useEffect, useState} from "react";

// interface BackendData {
//   users?: string[];
// }

// const App: React.FC = () => {
//   const [backendData, setBackendData] = useState<BackendData>({});

//   useEffect(() => {
//     fetch("/users")
//       .then(response => response.json())
//       .then(data => {
//         setBackendData(data);
//       });
//   }, []);

//   return (
//     <div>
//       {typeof backendData.users === 'undefined' ? (
//         <p>Loading...</p>
//       ) : (
//         backendData.users.map((user, i) => (
//           <p key={i}>{user}</p>
//         ))
//       )}
//     </div>
//   );
// };

