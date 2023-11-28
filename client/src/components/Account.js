import React, { useEffect, useState } from "react";
// space and dash not allowed in import
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import "./components.css"
const Account = () => {
    const baseUrl = 'http://localhost:5000';
    const [user, setUser] = useState('');
    const [userIncome, setUserIncome] = useState(0);
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    const handleIncomeChange = (e) => {
        setUserIncome(e.target.value);

    }
    const updateUserIncome = () => {
        // the second parameteris a req body object
        setOpen(false);
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
        <div className="accountGrid">
            <div className="accountInfo" >
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
            </div>
            <div>
                <Button className="modalButton" variant="outlined" onClick={handleClickOpen}>
                    + Update Income
                </Button>
                <Button className="modalButton" variant="outlined" onClick={handleLogout}>
                    Logout
                </Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Update Income"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Income"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleIncomeChange}

                        />
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={updateUserIncome} autoFocus>
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>


        </div>




    )
}


export default Account;