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

    
    const [tId , setTId] = useState('');
    const [tType , setTType] = useState('');
    const [tExpense , setTExpense] = useState('');

    const handleTIdChange = (e)=>{
        console.log(e.target.value);
        setTId(e.target.value);
    }
    const handleTTypeChange = (e)=>{
        console.log(e.target.value);
        setTType(e.target.value);
    }
    const handleTExpenseChange = (e)=>{
        console.log(e.target.value);
        setTExpense(e.target.value);
    }


    const handleAddTransaction = ()=>{
        const data = [...transactions , {tid : tId , ttype : tType , texpense :tExpense}];
        axios.put(`${baseUrl}/updateTransactions/${email}` , data)
            .then((res)=>{
                setTransactions(res.data.data.transactions)
            })
            .catch((error)=>{
                console.log(error);
            })
        
    }
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
        //here the email is state so async in behaviour so that's why 
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
           {/* i think js render every time any state chnages */}
            {
                transactions && transactions.map((transaction)=>{
                   return( <div key = {transaction.tid}>
                        <h3>Transaction</h3>
                        <p>tid : {transaction.tid}</p>
                        <p>T type : {transaction.ttype}</p>
                        <p>expense : {transaction.texpense}</p>
                        
                    </div>
                   )
                })
            }

            <label>Tid : </label>
            <input type="text"  onChange={handleTIdChange}/>
            <label>Ttype : </label>
            <input type="text" onChange={handleTTypeChange}/>
            <label>Expense</label>
            <input type="text"  onChange={handleTExpenseChange}/>
            <button onClick={handleAddTransaction}>Add Transaction</button>
        </div>
    )
}
export default Transactions;





