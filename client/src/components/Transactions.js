import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import "./components.css"

const Transactions = () => {
    const baseUrl = 'http://localhost:5000';
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [transactions, setTransactions] = useState([]);
    const rows = transactions;
    let transactionsLength = 0;
    const [tType, setTType] = useState('');
    const [tExpense, setTExpense] = useState('');

    const handleTTypeChange = (e) => {
        setTType(e.target.value);
    }
    const handleTExpenseChange = (e) => {
        setTExpense(e.target.value);
    }

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddTransaction = () => {
        console.log("add transactions");
        const updatedTransaction = transactions.map(({ id: tid, ...rest }) => ({ tid, ...rest }))
        transactionsLength = updatedTransaction.length + 1;
        const data = [...updatedTransaction, { tid: transactionsLength, ttype: tType, texpense: tExpense }];
        console.log(data);
        setOpen(false);
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
            alert("User Not Login"); 
            navigate('/');
        }
        console.log(email);
        axios.get(`${baseUrl}/userDetails/${email}`)
            .then((res) => {
                const userTranactions = res.data.userInfo[0].transactions;
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
        <div className='transactionGrid'>
                <Button className = "modalButton" variant="outlined" onClick={handleClickOpen}>
                    + Add Transaction
                </Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Transaction"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Transaction Type"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleTTypeChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Transaction Amount"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleTExpenseChange}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddTransaction} autoFocus>
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>

            <div style={{ height: 400, width: '100%' , marginTop :'50px' }}>
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

        </div>
    )
}
export default Transactions;





