import React, { useState } from 'react';
import { Style } from '../signIn/style';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
export default function Forgot() {
    const [newPassword, setNewPassword] = useState('');
    const params = useParams();
    const [confirmPassword, setconfrimPassword] = useState('');
    const navigate = useNavigate();

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };
    const handleconfirmPasswordChange = (event) => {
        setconfrimPassword(event.target.value);
    };
    const handlenTheForgot = async (e) => {
        e.preventDefault();
        if (newPassword === confirmPassword) {
            const requestBody = {
                token: params?.token,
                newPassword

            };
            try {
                const response = await axios.put('http://localhost:8080/user/resetThePassword', requestBody)
                if (response.data.success) {
                    alert('now login with your new password')
                    navigate('/login')
                } else {
                    alert('you should have to enter Exactly Same password')
                    navigate('/resetPassword/:token')
                }
            } catch (err) {
                console.log(err)
                alert('someting went wrong try again')
            }
        } else {
            alert('you should have to enter Exactly Same password')
            navigate('/resetPassword/:token')

        }
    }
    return (
        <Style>
            <div className='bodyOfForm'>

                <div className='signInForm'>
                    <span>ResetPassword</span>
                    <form className='form'>
                        <label>New Password</label>
                        <input
                            className='input'
                            type='password'
                            placeholder='Enter your password'
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                        />
                        <label> confirm Password</label>
                        <input
                            className='input'
                            type='password'
                            placeholder='confirm your password'
                            value={confirmPassword}
                            onChange={handleconfirmPasswordChange}
                        />
                        <button className='btn forgot' onClick={handlenTheForgot}>ResetPassword</button>

                    </form>

                </div>
            </div>
        </Style>
    )
}

