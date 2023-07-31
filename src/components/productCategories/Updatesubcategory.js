import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Style } from '../signIn/style';
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdateSubcategory = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const params = useParams();

    const [query1, setQuery1] = useState('');
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    // const [Option, setOption] = useState('');
    // const [selectedOption, setSelectedOption] = useState('');
    // const [isUpdate, setIsUpdate] = useState(false);


    useEffect(() => {

        // Check if it's an update or add mode
        if (params?.id) {
            axios
                .get(`http://localhost:8080/admin/add/getsubCategory`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    params: {
                        subCategoryId: params.id,
                    }
                })
                .then((response) => {
                    const subCategoryData = response.data.data;
                    // console.log(subCategoryData)
                    setName(subCategoryData.name);
                    setCategory(subCategoryData.category.name);
                    setQuery1(subCategoryData.category._id); // Set the default category value
                })
                .catch((error) => {
                    console.error('Error fetching subcategory data:', error);
                });
        } 
    }, [params?.id, token]);

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            categoryId: query1,
            subCategoryId: params.id
        };

        // console.log(data)
            // Update the subcategory using the PUT method
            axios
                .post(`http://localhost:8080/admin/add/updatesubCategory`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    alert('Subcategory updated successfully!');
                    // console.log(response.data)
                    navigate('/products');
                })
                .catch((error) => {
                    console.error('Error updating subcategory:', error);
                });
        
    };

    return (
        <Layout>
            <Style>
                <div className='bodyOfForm'>
                    <div className='signInForm'>
                        <span className='heading'>
                            {'Update Subcategory'}
                        </span>
                        <form className='form' onSubmit={handleSubmit}>
                            <label htmlFor='name'>Name:</label>
                            <input
                                className='input'
                                type='text'
                                id='name'
                                name='name'
                                value={name}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor='category'>Category:</label>
                            <option className='input'>
                                {category}
                            </option>

                            <button className='btn' type='submit'>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </Style>
        </Layout>
    );
};

export default UpdateSubcategory;
