import axios from 'axios';
import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { Style } from '../signIn/style';
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role set to 'user'
    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            // console.log('Form submitted:', { userName, email, password, role, token });
            const response = await axios.post( `http://localhost:8080/admin/add/createaccount`,
                {
                    userName, email, password, role,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
            if (response.data.success) {
                alert('The account is successfully created.');
                // console.log(response.data.success);
                navigate('/accounts');
            } else {
                alert('Failed to create the account.');

            }
        } catch (error) {
            console.error('Error in creating account:');
            alert('error')
        }
    };


    return (
        <Layout>
            <Style>
                <div className="bodyOfForm">
                    <div className='signInForm'>
                        <h2>Register Form</h2>
                        <form className='form' onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="userName">Username:</label>
                                <input
                                    className='input'
                                    type="text"
                                    id="userName"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    className='input'
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    className='input'
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Role:</label>
                                <select
                                    className='input'
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <button className='btn' type="submit">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Style>
        </Layout>
    );
};

export default RegisterForm;
