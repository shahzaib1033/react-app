import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Style } from '../signIn/style';
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';

const SubcategoryForm = () => {
    const token = localStorage.getItem('token')
    const [options, setOptions] = useState([]);
    const navigate = useNavigate()

    let [query1, setQuery1] = useState('');
    const [category, setCategory] = useState('');
    const [subcategoryOptions, setSubcategoryOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
        // Find the selected option and set the corresponding category value
        const selectedCategory = options.find((option) => option.value === e.target.value);
        if (selectedCategory) {
            setCategory(selectedCategory.value);
            setQuery1(selectedCategory.value)
            // Clear the subcategory when the category is changed
        }
    };
    const [formData, setFormData] = useState({
        name: '',
        category: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8080/admin/add/getAllCategory', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // You can include other headers as needed
            },
        })
            .then((response) => {
                const apiCategoryOptions = response.data.data.map((item) => ({
                    value: item._id,
                    label: item.name,
                }));
                setOptions(apiCategoryOptions);

            })
            .catch((error) => {
                console.error('Error fetching category options:', error);
            });
    }, []);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: formData.name,
            categoryId: query1,

        }
        // console.log(data)
        axios.post('http://localhost:8080/admin/add/addsubCategory', data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // You can include other headers as needed
                },

            }
        )
            .then((response) => {
                alert('Form data sent successfully!', response.data);
                navigate('/products')
            })
            .catch((error) => {
                console.error('Error sending form data:', error);
            });
    };

    return (

        <Layout>
            <Style>
                <div className='bodyOfForm'>
                    <div className='signInForm'>
                        <span className='heading'>add Category</span>
                        <form className='form' onSubmit={handleSubmit}>

                            <label htmlFor="name">Name:</label>
                            <input
                                className='input'
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />


                            <label htmlFor="category">Category:</label>
                            <select className='input' value={selectedOption} onChange={handleDropdownChange}>
                                <option className='input' value="">Select an option</option>
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <button className='btn' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </Style>
        </Layout>


    );
};

export default SubcategoryForm;
