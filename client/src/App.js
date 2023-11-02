import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Account from './components/Account';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';

function App() {
  return (
    <div>
      Expense Tracker


      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path = "/Account" element = {<Account/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
