import React , {useState} from 'react';
import './components.css';

const Popup = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    let toggle = 0;
    return (
        <>
            <div className="popup">
                <div className="popup-inner">
                    <h2>Login</h2>
                    <form >
                        <label>
                            Username:
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                        </label>
                        <label>
                            Password:
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </label>
                        <button type="submit">Login</button>
                    </form>
                    <button>Close</button>
                </div>
            </div>
        </>
    )
}

export default Popup;