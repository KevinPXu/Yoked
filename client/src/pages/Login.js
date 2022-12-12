import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';

import axios from '../api/axios';
const LOGIN_URl = '../auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext)
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URl, 
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response!');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password!');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized!');
            } else {
                setErrMsg('Login failed!');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Logged In!</h1>
                    <br />
                    <p>
                        <a href="#">Return To Home Page</a>
                    </p>
                </section>
            ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor='password'>Password:</label>
                <input 
                    type="password"
                    id="password"
                    ref={userRef}
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Log In</button>
            </form>

        </section>
            )}
            </>
    )
}

export default Login;