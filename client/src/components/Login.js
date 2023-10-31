import React , {useState} from 'react'


const Login = ()=>{

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const loginUser = (e)=>{
        e.preventDefault();
        console.log("User Login button clicked");
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