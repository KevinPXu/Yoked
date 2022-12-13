import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from "../utils/auth"

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [login, { error, data }] = useMutation(LOGIN_USER)

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login({
                variables: { name: user, password: pwd}
            });
            Auth.login(data.login.token)
            setUser('');
            setPwd('');
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
            {data ? (
                <section>
                    <h1>Logged In!</h1>
                    <br />
                    <p>
                    <Link to="/">back to the homepage.</Link>
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
            </section>)}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
            </>
    )
}

export default Login;