import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const Transactions = () => {
    //also check that issue why it's returning array and not a object
    const baseUrl = 'http://localhost:5000';
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [transactions, setTransactions] = useState([]);
    const rows = transactions;

    const [tId, setTId] = useState('');
    const [tType, setTType] = useState('');
    const [tExpense, setTExpense] = useState('');

    const handleTIdChange = (e) => {
        setTId(e.target.value);
    }
    const handleTTypeChange = (e) => {
        setTType(e.target.value);
    }
    const handleTExpenseChange = (e) => {
        setTExpense(e.target.value);
    }


    const handleAddTransaction = () => {
        console.log("add transactions");
        const updatedTransaction = transactions.map(({ id: tid, ...rest }) => ({ tid, ...rest }))
        const data = [...updatedTransaction, { tid: tId, ttype: tType, texpense: tExpense }];
        console.log(data);
        axios.put(`${baseUrl}/updateTransactions/${email}`, data)
            .then((res) => {
                const userTranactions = res.data.data.transactions;
                setTransactions(userTranactions.map(({ tid: id, ...res }) => ({
                    id, ...res
                })));
                console.log(userTranactions);
            })
            .catch((error) => {
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
            navigate('/login');
        }
        console.log(email);
        //here the email is state so async in behaviour so that's why 
        axios.get(`${baseUrl}/userDetails/${email}`)
            .then((res) => {
                // console.log(res.data.userInfo[0].transactions)
                const userTranactions = res.data.userInfo[0].transactions;
                //res.data.userInfo[0].transactions
                setTransactions(userTranactions.map(({ tid: id, ...res }) => ({
                    id, ...res
                })));
            })
            .catch((error) => {
                console.log(error);
            })



    }, [email])


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'ttype', headerName: 'Type', width: 130 },
        { field: 'texpense', headerName: 'Expense', width: 130, type: 'number' }
    ];

    return (

        <div>
            Transactions
            {/* i think js render every time any state chnages */}
            {/* {
                transactions && transactions.map((transaction) => {
                    return (<div key={transaction.id}>
                        <h3>Transaction</h3>
                        <p>tid : {transaction.id}</p>
                        <p>T type : {transaction.ttype}</p>
                        <p>expense : {transaction.texpense}</p>

                    </div>
                    )
                })
            } */}
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>

            <label>Tid : </label>
            <input type="text" onChange={handleTIdChange} />
            <label>Ttype : </label>
            <input type="text" onChange={handleTTypeChange} />
            <label>Expense</label>
            <input type="text" onChange={handleTExpenseChange} />
            <button onClick={handleAddTransaction}>Add Transaction</button>
        </div>
    )
}
export default Transactions;





