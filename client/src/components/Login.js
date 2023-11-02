import React , {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const Login = ()=>{
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:5000';
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const loginUser = async(e)=>{
        e.preventDefault();
        console.log("User Login button clicked");
        await axios.post(`${baseUrl}/login` , {
            email : email ,
            password  : password
        }
        )
        .then((res)=>{
            console.log(res);
            console.log('User logged in');
            if(res.data.userLoginStatus === 1){
                navigate('/Account');
            }
        })
        .catch((error)=>{
            console.log(error);
        })
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

        <div>
            Login

            <form onSubmit={loginUser}>

                <label >Email : </label>
                <input type="email" onChange={handleEmailChange} />
                <br />
                <label>Password : </label>
                <input type="password"  onChange={handlePasswordChange} />
                <br />
                <button type="submit" >Submit</button>
            </form>
        </div>
    ) 
}


export default Login;