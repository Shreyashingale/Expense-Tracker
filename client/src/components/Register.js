import React , {useState}  from 'react'
import axios from 'axios';
const Register = () => {

  const [userName , setUserName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const registerUser = (e)=>{
    e.preventDefault();
    console.log("User Registered");
    
  }

  const handleUserNameChange = (e)=>{
    setUserName(e.target.value);
    console.log(e.target.value);
  }

  const handleEmailChange = (e)=>{
    setEmail(e.target.value);
    console.log(e.target.value);
  }

  const handlePasswordChange = (e)=>{
    setPassword(e.target.value);
    console.log(e.target.value);
  }
  return (
    <div>Register
      <form onSubmit={registerUser}>
      <label>UserName</label>
      <input type="text" onChange={handleUserNameChange} />
      <br />
      <label>Email</label>
      <input type="email" onChange={handleEmailChange} />
      <br />
      <label>Password</label>
      <input type="password" onChange={handlePasswordChange} />
      <br />
      <button type="submit">Register</button>

      </form>
    </div>
  )
}

export default Register