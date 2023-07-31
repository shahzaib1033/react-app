import React, { useState ,useEffect} from 'react';
import { Style } from '../signIn/style';
import Layout from '../Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const CategoryForm = () => {
    const token = localStorage.getItem('token')
    const [name, setName] = useState()
    const navigate =useNavigate()
    // const [formData, setFormData] = useState({
    //     name: ''
    // });
const params = useParams()
    const handleChange = (e) => {
           setName(e.target.value)
    };
    useEffect(() => {
        // Fetch product data from the API and set the state
        if (params?.id) {
            const fetchcategoryData = async () => {
                // console.log(params?.id)
                try {
                    const response = await axios.get('http://localhost:8080/admin/add/getAllcategory', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        params: {
                            _id: params?.id
                        }
                    });
                    // setName(response.data.data.name)   
                    setName(response.data.data[0].name);
                    // console.log(response.data);
                } catch (error) {
                    console.error('Error fetching product data:', error);
                }
            };
            fetchcategoryData();
        }
    }, [token]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (params?.id) {
            // console.log(name)
            axios.post('http://localhost:8080/admin/add/updateCategory', {
                name,
            categoryId: params?.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // You can include other headers as needed
                },
               
            })
                .then((response) => {
                    alert('Form data sent successfully!', response.data);
                    navigate('/products')
                })
                .catch((error) => {
                    console.error('Error sending form data:', error);
                });
           
        }
        else {
            axios.post('http://localhost:8080/admin/add/addCategory', {name}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // You can include other headers as needed
                },
            })
                .then((response) => {
                    alert('category added successfully!', response.data);
                    navigate('/products')
                })
                .catch((error) => {
                    alert ('error to add')
                    console.error('Error sending form data:', error);
                });
        }
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
                                value={name}
                                onChange={handleChange}
                                required
                            />

                            <button className='btn' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </Style>
        </Layout>
    );
};

export default CategoryForm;
