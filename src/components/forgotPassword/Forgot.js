import React, { useState } from 'react';
import { Style } from '../signIn/style';
// import { useNavigate } from 'react-router-dom';

import axios from 'axios';
export default function Forgot() {
    const [email, setEmail] = useState('');
    // const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlenTheForgot = async(e) => {
        e.preventDefault();
        const requestBody = {
            email
        };
        try {
            const response = await axios.put('http://localhost:8080/user/forgetpassword', requestBody)
            if (response.data.success) {
                alert('check your email please to rest the password')

                //  <div>   </div>
            } if(!response.data.success) {
                console.log('failed')
                alert( response.data.message)

            }
        }
        catch (err) {
            console.log(err);
            alert('try with the exact email', err)

        }
    }
    return (
        <Style>
            <div className='bodyOfForm'>

                <div className='signInForm'>
                    <span>ForgotPassword</span>
                    <form className='form'>
                        <label>Email</label>
                        <input
                            className='input'
                            type='email'
                            placeholder='Enter your email'
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <button className='btn forgot' onClick={handlenTheForgot}>Forgot</button>

                    </form>

                </div>
            </div>
     </Style>
    )
}
