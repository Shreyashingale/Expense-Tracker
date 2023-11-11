import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import loginImg from '../assets/images/loginImg.png'

const Login = () => {
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:5000';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginUser = async (e) => {
        e.preventDefault();
        console.log("User Login button clicked");
        await axios.post(`${baseUrl}/login`, {
            email: email,
            password: password
        }
        )
            .then((res) => {
                console.log(res);
                console.log('User logged in');
                if (res.data.userLoginStatus === 1 && res.data.token != null) {
                    console.log(res.data.token);
                    localStorage.setItem('token', res.data.token);
                    navigate('/Account');
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    return (
        <div className='mainDiv'>
            <div>
                <Form onSubmit={loginUser}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
                        <Form.Text className="text-muted">
                            Not Register ? <Link to="/register" > Register</Link>.
                        </Form.Text>
                    </Form.Group>
                    <Button style={{ backgroundColor: '#303142' }} variant="dark" type="submit">
                        Login
                    </Button>

                </Form>
            </div>
            <div>
                <img className='imgDiv' src={loginImg} alt="" />
            </div>
        </div>
    )
}


export default Login;