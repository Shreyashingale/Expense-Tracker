import React , {useState}  from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:5000';
  const [userName , setUserName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const registerUser = async(e)=>{
    e.preventDefault();
    console.log("User Registered");
    await axios.post(`${baseUrl}/register` , {
      username : userName ,
      email : email ,
      password : password ,
    })
    .then((res)=>{
      console.log(res);
      if(res.data.userRegisterStatus === 1){
        navigate('/login');
      }
      console.log('User Registered');
    })
    .catch((error)=>{
      console.log(error);
    })
    
  }

  const handleUserNameChange = (e)=>{
    setUserName(e.target.value);
  }

  const handleEmailChange = (e)=>{
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e)=>{
    setPassword(e.target.value);
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