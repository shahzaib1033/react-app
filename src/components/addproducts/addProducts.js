import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout/Layout';
import { Style } from './style';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [options, setOptions] = useState([]);
    let [query1, setQuery1] = useState('');
    const [category, setCategory] = useState('');
    const [subcategoryOptions, setSubcategoryOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [productImage, setProductImage] = useState('');
    let [imagePath, setImagePath] = useState('');
    const params = useParams();

    const [variants, setVariants] = useState([{ name: '', skus: [{ size: '', price: '', quantity: '', color: '' }] }]);
    const [selectedColor, setSelectedColor] = useState('');
    const [showSizes, setShowSizes] = useState(false);

    // Fetch categories from the API
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

    useEffect(() => {
        if (params?.id) {

            axios.get('http://localhost:8080/admin/add/getProducts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                params: {
                    _id: params?.id
                }
            })
                .then((response) => {
                    setProductName(response?.data?.data?.name);
                    setVariants(response?.data?.data?.variants)
                    // setCategory(response?.data?.data?.category.name)
                    // setSubcategory(response?.data?.data?.subcategory.name)
                    setDescription(response?.data?.data?.description)
                    setImagePath(response?.data?.data?.productImage)
                    // console.log(response?.data)

                })
                .catch((error) => {
                    console.log(error);
                    alert('error')
                })
        }
    }, [])

    // Fetch subcategories based on the selected category from the API
    useEffect(() => {
        if (category) {
            axios.get(`http://localhost:8080/admin/add/getsubCategory`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // You can include other headers as needed
                },
                params: {
                    category: query1,
                },
            })
                .then((response) => {
                    const apiSubcategoryOptions = response.data.data.map((subcategory) => ({
                        value: subcategory._id,
                        label: subcategory.name,
                    }));
                    // console.log(query1)
                    setSubcategoryOptions(apiSubcategoryOptions);
                })
                .catch((error) => {
                    console.error('Error fetching subcategory options:', error);
                });
        }
    }, [category]);

    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
        // Find the selected option and set the corresponding category value
        const selectedCategory = options.find((option) => option.value === e.target.value);
        if (selectedCategory) {
            setCategory(selectedCategory.value);
            setQuery1(selectedCategory.value)
            setSubcategory(''); // Clear the subcategory when the category is changed
            setSelectedColor('');
            setShowSizes(false);
        }
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
        setShowSizes(true);
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post('http://localhost:8080/user/profile/uploadImage', formData);
            const productImage = response.data.imagepath;
            setImagePath(response.data.data);
            setProductImage(productImage);
            console.log(productImage)
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        debugger
        console.log(e.target.value);
        console.log(e.target);
        const data = { productName, description, category, subcategory, imagePath, variants };
        console.log(data);
        debugger

        try {
            const response = await axios.post('http://localhost:8080/admin/add/createproducts', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // You can include other headers as needed
                },
            });
            if (response) {
                alert('The product was successfully added.');
                // console.log(response.data.success)
                navigate('/products')

            } else {
                alert('Failed to add the product.');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleVariantChange = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index][field] = value;
        setVariants(newVariants);
    };

    const handleSKUChange = (variantIndex, skuIndex, field, value) => {
        const newVariants = [...variants];
        newVariants[variantIndex].skus[skuIndex][field] = value;
        setVariants(newVariants);
    };

    const handleAddVariant = () => {
        setVariants([...variants, { name: '', skus: [{ size: '', price: '', quantity: '', color: '' }] }]);
    };

    const handleAddSKU = (variantIndex) => {
        const newVariants = [...variants];
        newVariants[variantIndex].skus.push({ size: '', price: '', quantity: '', color: '' });
        setVariants(newVariants);
    };

    const handleOpenModal = (variant) => {
        alert(`Color: ${selectedColor}\nSizes & Quantities:\n${variant.skus.map((sku) => `- Size: ${sku.size}, Quantity: ${sku.quantity}`).join('\n')}`);
    };

    return (
        <Layout>
            <Style>
                <div className='bodyOfForm'>
                    <div className='signInForm'>
                        <h1>Add Product</h1>
                        <div className='form' >
                            <label htmlFor="productName">Name:</label>
                            <input className='input' type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} required /><br />

                            <label htmlFor="description">Description:</label>
                            <textarea className='input' id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea><br />

                            <label htmlFor="category">Category:</label>
                            <select className='input' value={selectedOption} onChange={handleDropdownChange}>
                                <option className='input' value="">Select an option</option>
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="subcategory">Subcategory:</label>
                            <select className='input' value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                                <option className='input' value="">Select a subcategory</option>
                                {subcategoryOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="productImage">Product Image:</label>
                            <input className='input' type="file" id="productImage" value={productImage} onChange={handleUploadImage} required /><br />

                            <div>
                                {variants.map((variant, variantIndex) => (
                                    <div key={variantIndex}>
                                        <h2>Variant Details</h2>
                                        <label htmlFor="variantName">Variant Name:</label>
                                        <input className='input' type="text" id="variantName" value={variant.name} onChange={(e) => handleVariantChange(variantIndex, 'name', e.target.value)} required /><br />

                                        {variant.skus.map((sku, skuIndex) => (
                                            <div key={skuIndex}>
                                                <h3>SKU {skuIndex + 1}</h3>
                                                <label htmlFor="skuSize">Size:</label>
                                                <input className='input' type="text" id="skuSize" value={sku.size} onChange={(e) => handleSKUChange(variantIndex, skuIndex, 'size', e.target.value)} required /><br />

                                                <label htmlFor="skuPrice">Price:</label>
                                                <input className='input' type="number" id="skuPrice" value={sku.price} onChange={(e) => handleSKUChange(variantIndex, skuIndex, 'price', e.target.value)} required /><br />

                                                <label htmlFor="skuQuantity">Quantity:</label>
                                                <input className='input' type="number" id="skuQuantity" value={sku.quantity} onChange={(e) => handleSKUChange(variantIndex, skuIndex, 'quantity', e.target.value)} required /><br />



                                                {sku.color && (
                                                    <button className='btn' onClick={() => handleOpenModal(variant)}>View Sizes & Quantities</button>
                                                )}
                                            </div>
                                        ))}

                                        <button className='btn' type="button" onClick={() => handleAddSKU(variantIndex)}>Add SKU</button>
                                    </div>
                                ))}
                            </div>

                            <button className='btn' type="button" onClick={handleAddVariant}>Add Variant</button>
                            <button className='btn' onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </Style>
        </Layout>
    );
};

export default ProductForm;
