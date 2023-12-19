import React , {useState}  from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import registerImg from '../assets/images/registerImg.png';

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
        navigate('/');
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


    <div>
            <div className='mainDiv'>
                <div>
                    <Form onSubmit={registerUser}>
                        <Form.Group className="mb-2 ml-50" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" onChange={handleUserNameChange} />
                        </Form.Group>
                        <Form.Group className="mb-2 ml-50" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
                        </Form.Group>

                        <Button variant="dark" type="submit">
                            Register
                        </Button>
                    </Form>
                </div>
                <div>
                    <img className='imgDiv' src={registerImg} alt="" />
                </div>
            </div>

        </div>

    
  )
}

export default Register