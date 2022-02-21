import './App.css';
import Header from './Layout/Header/Header';
import { createContext,useState} from 'react'
import { Route, Routes } from 'react-router-dom';
import Admin from './Pages/Admin';
import Login from './Pages/Login/Login';
import Home from './Pages/Home';
import Exercise from './Pages/Exercise';
import AdminExercise from './Components/AdminExercise/AdminExercise';
import AdminCreateExercise from './Components/AdminCreateExcersice/AdminCreateExercise';
import AllExercise from './Components/Allexercise/AllExercise';
export const UserContext = createContext()

function App() {
  const [registeruser, setregisteruser] = useState(),
        [loginUser, setloginUser] = useState()

  return (

    <div className="App">
      <UserContext.Provider value={{setregisteruser, loginUser, setloginUser}}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin/languages' element={<AllExercise admin={true} />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/exercise' element={<AdminCreateExercise/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/exercise/:id' element={<Exercise />} />
        <Route path='/admin/exercise/:id' element={<AdminExercise />} />
      </Routes>
      </UserContext.Provider>

    </div>
  );
}

export default App;
