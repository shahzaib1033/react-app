import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import Layout from '../Layout/Layout';
import { Style } from '../products/style';

export default function Accounts() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [Admins, setAdmins] = useState([]);

    const fetchAdmins = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/add/getAdmins', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response) {
                setAdmins(response?.data?.data);
            }
        } catch (err) {
            console.log(err);
            alert('error');
        }
    };
    useEffect(() => {

        fetchAdmins(); // Call the async function here
    }, [token]);
    const deleteAdmin = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/admin/add/deleteAccount`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    data: {
                        id: id, // Pass the id in the request body
                    },
                }
            );
            if (response.data.success) {
                alert('account deleted successfully');
                fetchAdmins();
            } else {
                alert('account not deleted successfully');
            }
        } catch (err) {
            console.log(err);
            alert('error');
        }
    };

    return (
        <Layout>
            <Style>
                <div className='body'>
                    <div >
                        <h2>People With Authority</h2>
                        <table className='table'>
                            <thead>
                                <tr className='row'>
                                    <th className='column'>No.</th>
                                    <th className='column'>Name</th>
                                    <th className='column'>role</th>
                                    <th className='bigname'>email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Admins.map((admin, index) => (
                                    <tr className='datarow' key={admin._id}>
                                        <td className='column'>{index + 1}</td>
                                        <td className='column'>{admin.userName}</td>
                                        <td className='column'>{admin.role}</td>
                                        <td className='bigname'>{admin.email}</td>
                                        <td className='icon' onClick={() => deleteAdmin(admin._id)}>
                                            <AiOutlineDelete />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                            <button className='btn' onClick={() => navigate('/addaccounts')}>
                                Add New
                            </button>
                    </div>
                </div>
            </Style>
        </Layout>
    );
}
