import React from 'react';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import '../App.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const baseUrl = 'http://localhost:5000';
ChartJS.register(ArcElement, Tooltip, Legend);

let callTransactions = 1;
const Dashboard = () => {
    const [email, setEmail] = useState('');
    const [travelling, setTravelling] = useState(0);
    const [other, setOther] = useState(0);
    const [food, setFood] = useState(0);
    const [groceries, setGroceries] = useState(0);
    const [income , setIncome] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
    const data = {
        labels: ['Groceries', 'Other', 'Travelling', 'Food', 'Saving'],
        datasets: [
            {
                label: '# of expenses',
                data: [groceries, other, travelling, food, income - (food+other+groceries+travelling)],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };




    const getExpense = () => {
        console.log("calculating expense");
        transactions.map((transaction) => {
            if (transaction.ttype === "food") {
                setFood(food + transaction.texpense);
            }
            else if (transaction.ttype === "groceries") {
                setGroceries(groceries + transaction.texpense);
            }
            else if (transaction.ttype === "other") {
                setOther(other + transaction.texpense);
            }
            else if (transaction.ttype === "traveling") {
                setTravelling(travelling + transaction.texpense);
            }   
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
            navigate('/login');
        }
        console.log(email);
        //so by doing this we can call useeffect after updating of the transaction state and also it will not cause to render it again and again
        //here a bug is a new user and he wont have a tranasctions then it will cause rendered multiple time
        //solved by addig a basic flag
        if(transactions.length === 0 && callTransactions===1){
            console.log("getting user");
            console.log(callTransactions);
            axios.get(`${baseUrl}/userDetails/${email}`)
            .then((res) => {
                console.log(res.data.userInfo[0]);
                setIncome(res.data.userInfo[0].income);
                setTransactions(res.data.userInfo[0].transactions);
                const responseArray = res.data.userInfo[0].transactions;
                if(responseArray.length===0){
                    console.log("Updated Value");
                    callTransactions = 0;
                }
                console.log(`Updated Value ${callTransactions}`);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        getExpense();
    }, [email , transactions])
    return (
        <div className='pieChart'>
            Dashboard
            
            <Pie data={data} />
            <p>Food : {food}</p>
            <p>Other : {other}</p>
            <p>Groceries : {groceries}</p>
            <p>Travelling : {travelling}</p>
            <p>Savings : {income - (food+other+groceries+travelling)}</p>
        </div>
    )
}

export default Dashboard;