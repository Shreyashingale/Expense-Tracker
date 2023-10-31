import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';

function App() {
  return (
    <div>
      Expense Tracker


      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
