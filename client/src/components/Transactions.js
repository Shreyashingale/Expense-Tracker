import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Transactions = () => {
    //also check that issue why it's returning array and not a object
    const baseUrl = 'http://localhost:5000';
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [transactions , setTransactions] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwtDecode(token);
            setEmail(user.email);
        }
        else {
            localStorage.removeItem('token');
            navigate('/logout');
        }
        console.log(email);
        axios.get(`${baseUrl}/userDetails/${email}`)
        .then((res)=>{
            console.log(res.data.userInfo[0].transactions);
            setTransactions(res.data.userInfo[0].transactions);
        })
        .catch((error)=>{
            console.log(error);
        })

    }, [email])
    return (

        <div>
            Transactions
           
            {
                transactions && transactions.map((transaction)=>{
                    console.log(transaction);
                   return( <div key = {transaction.tid}>
                        <h3>Transaction</h3>
                        <p>tid : {transaction.tid}</p>
                        <p>tid : {transaction.ttype}</p>
                        <p>tid : {transaction.expense}</p>
                        
                    </div>
                   )
                })
            }
        </div>
    )
}
export default Transactions;





