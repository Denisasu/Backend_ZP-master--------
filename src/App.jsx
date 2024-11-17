// App.jsx
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Contacts from './pages/Сontacts/Contacts';
import Statistics from './pages/Statistics/Statistics';
import Zayvka from './Zayvka';
import Login from './pages/Login/Login';
import Register from './pages/Registers/Register';
import PersonalAcc from './pages/PersonalAcc/PersonalAcc';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/zayvka" element={<Zayvka />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/personalacc" element={<PersonalAcc />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
