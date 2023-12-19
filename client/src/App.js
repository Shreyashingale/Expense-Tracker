import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Account from './components/Account';
import Transactions from './components/Transactions';
import Dashboard from './components/Dashboard';
import Navigationbar from './components/Navigationbar';
import {  Routes , Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navigationbar/>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path = "/Account" element = {<Account/>}/>
          <Route path = "/Transactions" element = {<Transactions/>}/>
          <Route path = "/Dashboard" element = {<Dashboard/>}/>
          
        </Routes>
    </div>
  );
}

export default App;
