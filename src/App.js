// import logo from './logo.svg';
import AppNavBar from './components/AppNavBar';
// import { Fragment } from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
// import Banner from './components/Banner';
// import Highlights from './components/Highlights';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Courses from './pages/Courses';
import Error from './pages/Error';
import './App.css';
import { UserProvider } from './UserContext';
import Admin from './pages/admin';

function App() {

  const [ user, setUser ] = useState({
    email: localStorage.getItem('email'),
    access: localStorage.getItem('access')
  })
  const [access, setaccess] = useState(
    localStorage.getItem('access')
  )

  const unsetUser = () => {
    localStorage.clear();
  }

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
    <Router>
      <Container fluid>
        <AppNavBar />
        <Routes>
          <Route path="/products" element= {<Courses />} /> 
          <Route path="/register" element= {<Register />} /> 
          <Route path="/login" element= {<Login />} />
          <Route path="/logout" element= {<Logout />} />
          <Route path="/admin" element= {<Admin />} />
          <Route path="*" element={<Error />} />
        {/*element that is being rendered is Home.*/}
        </Routes>
      </Container>
    </Router>
    </UserProvider>
  );
}

export default App;
// React JS is a single page application
// When clicked on a button, it seems to be reloading
// But what exactly happens is moving, rendering, rerendering a specific component, demounting