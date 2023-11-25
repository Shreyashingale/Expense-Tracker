import React from 'react';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import '../App.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
const baseUrl = 'http://localhost:5000';
ChartJS.register(ArcElement, Tooltip, Legend);

let callTransactions = 1;
const Dashboard = () => {
    const [email, setEmail] = useState('');
    const [travelling, setTravelling] = useState(0);
    const [other, setOther] = useState(0);
    const [food, setFood] = useState(0);
    const [groceries, setGroceries] = useState(0);
    const [income, setIncome] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
    const data = {
        labels: ['Groceries', 'Other', 'Travelling', 'Food', 'Saving'],
        datasets: [
            {
                label: '# of expenses',
                data: [groceries, other, travelling, food, income - (food + other + groceries + travelling)],
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



    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 18 , color :'grey' , fontWeight : 'bold' }} color="text.secondary" gutterBottom>
                    Overview
                </Typography>
                <Typography variant="body2">
                    Food: {food}
                    <br />
                    Other: {other}
                    <br />
                    Groceries : {groceries}
                    <br />
                    Travelling : {travelling}
                    <br />
                    Savings : {income - (food + other + groceries + travelling)}
                </Typography>
            </CardContent>
        </React.Fragment>
    );
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
        if (transactions.length === 0 && callTransactions === 1) {
            console.log("getting user");
            console.log(callTransactions);
            axios.get(`${baseUrl}/userDetails/${email}`)
                .then((res) => {
                    console.log(res.data.userInfo[0]);
                    setIncome(res.data.userInfo[0].income);
                    setTransactions(res.data.userInfo[0].transactions);
                    const responseArray = res.data.userInfo[0].transactions;
                    if (responseArray.length === 0) {
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
    }, [email, transactions])
    return (
        <div>

            <div className='pieGrid'>
                <div className="pieChart">
                    <Pie data={data} />
                    
                </div>
                <Box sx={{ minWidth: 280 }}>
                <Card style = {{backgroundColor : '#2d2d39' , color : '#ffff' , border : '1px solid #fff'}} variant="outlined">{card}</Card>
            </Box>
            </div>
            
        </div>
    )
}

export default Dashboard;