import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Account from './components/Account';
import Transactions from './components/Transactions';
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
          <Route path = "/Transactions" element = {<Transactions/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
