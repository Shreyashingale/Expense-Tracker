import React, { useEffect, useState } from "react";
// space and dash not allowed in import
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './components.css';
const Account = () => {
    const baseUrl = 'http://localhost:5000';
    const [user, setUser] = useState('');
    const [userIncome, setUserIncome] = useState(0);
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    const handleIncomeChange = (e) => {
        setUserIncome(e.target.value);

    }
    const updateUserIncome = () => {
        // the second parameteris a req body object
        axios.put(`${baseUrl}/updateIncome/${user}`, {
            income: userIncome
        })
            .then((res) => {
                console.log("Updated");
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
        window.location.reload(false);
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // after installing package read there latest doc
            const user = jwtDecode(token);
            console.log(user);
            setUser(user.email);
            console.log("from account page");
        }
        else {
            navigate('/login')
        }
        axios.get(`${baseUrl}/userDetails/${user}`)
            .then((res) => {
                console.log(res.data.userInfo);
                setUserDetails(res.data.userInfo[0]);
            })
            .catch((error) => {
                console.log(error);
            })

    }, [user])
    return (
        <div className="accountMainDiv">
            <div className="sideNav">
                {
                    userDetails &&
                    (
                        <span>
                            Welcome {userDetails.username}
                        </span>
                    )
                }
                <ul>
                    <li>User Details</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </div>
            <div className="userDetailsDiv">



                {
                    // js inside curly react inside round in one div
                    userDetails && (
                        <div>
                            <ul>
                                <li>My Details </li>
                                <li>Email : {userDetails.email}</li>
                                <li>User : {userDetails.username}</li>
                                <li>Income : {userDetails.income}</li>
                                <li>Expenses : {userDetails.expenses}</li>
                            </ul>


                        </div>
                    )


                }


                <input type="text" onChange={handleIncomeChange} />
                <br />
                <button onClick={updateUserIncome}>Update Income</button>
            </div>

        </div>




    )
}


export default Account;