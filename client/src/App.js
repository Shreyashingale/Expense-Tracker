import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Account from './components/Account';
import Transactions from './components/Transactions';
import Dashboard from './components/Dashboard';
import Navigationbar from './components/Navigationbar';
import TableComp from './components/TableComp';
import Modal from './components/Modal';
import {  Routes , Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navigationbar/>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path = "/Account" element = {<Account/>}/>
          <Route path = "/Transactions" element = {<Transactions/>}/>
          <Route path = "/Dashboard" element = {<Dashboard/>}/>
          <Route path = "/Table" element = {<TableComp/>}/>
          <Route path = "/Modal" element = {<Modal/>}/>
        </Routes>
    </div>
  );
}

export default App;
