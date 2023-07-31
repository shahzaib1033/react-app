import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout/Layout';
import { Style } from './style.js';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
const Product = () => {
  const [existingProducts, setExistingProducts] = useState([]);
  const [ExistingCategory, setExistingCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  const fetchProductData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/add/getProducts', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setExistingProducts(response.data.data);
      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // Fetch product data from the API and set the state
    fetchProductData();
  }, [token]);
  const fetchcategoryData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/add/getAllcategory', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setExistingCategory(response.data.data);
      fetchSubcategoryData(response.data.data[0]._id);  
      // console.log(response.data.data[0]._id)
      setIsLoading(false);
      setSelectedCategory(response.data.data[0]._id);
    } catch (error) {
      console.error('Error fetching category data:', error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // Fetch product data from the API and set the state
    fetchcategoryData();
  }, [token]);


  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleOpenModal = (variant) => {
    setSelectedVariant(variant);
    setIsModalOpen(true);
  };
  useEffect(() => {
    // Fetch product data from the API and set the state
    if (selectedCategory)
    {
      fetchSubcategoryData(selectedCategory);
      console.log(selectedCategory)
    }
  }, [token]);
  const handleCloseModal = () => {
    setSelectedVariant(null);
    setIsModalOpen(false);
  };
  // const CloseModal = () => {
  //   setSelectedCategory(null);
  //   setIsModalOpen(false);
  // };
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/admin/add/deleteproduct`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: { ProductId: id }, // Pass the data parameter here
        }
      );
      if (response.data.success) {
        alert('The product was successfully deleted.');
        console.log(response.data.success);
        fetchProductData()
      } else {
        alert('Failed to delete the product.');
      }
    } catch (error) {
      console.error('Error in deleting product:', error);
    }
  };
  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/admin/add/deleteCategory`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: { categoryId: id }, // Pass the data parameter here
        }
      );
      if (response.data.success) {
        // alert('The category was successfully deleted.');
        // console.log(response.data.success);
        fetchcategoryData();
        navigate('/products');
      } else {
        alert('Failed to delete the category.');

      }
    } catch (error) {
      alert('error')
      console.error('Error in deleting category:', error);
    }
  };
  const deleteSubCategory = async (id) => {
    try {
      console.log(id)
      const response = await axios.delete(
        `http://localhost:8080/admin/add/deletesubCategory`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: { subCategoryId: id }, // Pass the data parameter here
        }
      );
      if (response.data.success) {
        alert('The subcategory is successfully deleted.');
        console.log(selectedCategory);
        fetchSubcategoryData(selectedCategory)
        navigate('/products');
      } else {
        alert('Failed to delete the subcategory.');

      }
    } catch (error) {
      alert('error')
      console.error('Error in deleting subcategory:');
    }
  };


  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const fetchSubcategoryData = async (id) => {
    try {
      console.log ('i am here')
      const response = await axios.get(`http://localhost:8080/admin/add/getsubCategory`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: {
          category: id,
        },
      });
     setSelectedSubcategory(response.data.data);
    } catch (error) {
      console.error('Error fetching subcategory data:', error);
    }
  };
  const handleOpenSubcategory = async (id) => {
    setSelectedCategory(id);
    fetchSubcategoryData(id);
  };
  return (
    <Layout>
      <Style>
        <div className='mainbody'>
          <div className='subdetails'>
          <div className='products'>
            <h2>Product</h2>
            <table className='table'>
              <thead>
                <tr className='row'>
                  <th className='name'>Name</th>
                  <th className='column'>Category</th>
                  <th className='column'>Colors</th>
                  <th className='column'>details</th>
                </tr>
              </thead>
              <tbody className='table-container'>
                {existingProducts.map((product) => (
                  <>
                    {product.variants.map((variant, index) => (
                      <>
                        <tr className='datarow'>
                          <td className='column name' rowSpan={product.variants.length}>{product.name}</td>
                          <td className='column' rowSpan={product.variants.length}>{product.category.name}</td>

                          <td className='column' >{variant.name}</td>
                          <td className='column'>
                            <button onClick={() => handleOpenModal(variant)}>more..</button>
                          </td>
                          <td onClick={() => navigate(`/updateproducts/${product._id}`)}><AiFillEdit /></td>
                          <td onClick={() => deleteProduct(product._id)}>
                            <AiOutlineDelete />
                          </td>
                        </tr>
                      </>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
            <button className='btn' onClick={() => navigate(`/addproducts`)}>Add Product</button>
            </div>
            {selectedVariant && isModalOpen && (
              <div className='modal'>
                <div className='.modal-container'>
                  <span className='close' onClick={handleCloseModal}>&times;</span>
                  <h3>Variant: {selectedVariant.name}</h3>
                  <table className='table details'>
                    <thead>
                      <tr className='row'>
                        <th className='column'>Price</th>
                        <th className='column'>Size</th>
                        <th className='column'>Quantity</th>
                      </tr>
                    </thead>
                    <tbody className='table-container'>
                      {selectedVariant.skus.map((sku, skuIndex) => (
                        <tr className='datarow' key={`${selectedVariant._id}-${skuIndex}`}>
                          <td className='column'>{'$'+sku.price}</td>
                          <td className='column'>{sku.size}</td>
                          <td className='column'>{sku.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
        </div >
            <div className='subdetails'>
              <div>
                <h2>Category</h2>
                <table className='table'>
                  <thead>
                    <tr className='row'>
                      <th className='column'>Name</th>
                      <th className='name'>details</th>
                    </tr>
                  </thead>
                  <tbody className='table-container'>
                    {ExistingCategory.map((item) =>
                      <>
                        <tr className='datarow'>
                          <td className='column' rowSpan={''}>{item.name}</td>
                          <td className='name'>
                            <button onClick={() => handleOpenSubcategory(item._id)}>more..</button>
                          </td>
                          <td onClick={() => navigate(`/addcategory/${item._id}`)}><AiFillEdit /></td>
                          <td onClick={() => deleteCategory(item._id)}>
                            <AiOutlineDelete />
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
                <button className='btn' onClick={() => navigate(`/addcategory`)}>Add Category</button>
              </div>

              {selectedSubcategory && (
                <div className='modal'>
                  <div>
                    <h2>Subcategory Details</h2>
                    <table className='table details'>
                      {/* Render subcategory details here */}
                      {/* For example: */}
                      <thead>
                        <tr className='row'>
                          <th className='column'>No.</th>
                          <th className='column'>Name</th>
                          <th className='column'>Category</th>
                        </tr>
                      </thead>
                      <tbody className='table-container'>
                        {selectedSubcategory.map((item, index) => (
                          <tr className='datarow'>
                            <td className='column'>{index + 1}</td>
                            <td className='column'>{item.name}</td>
                            <td className='column'>{item.category.name}</td>
                            <td onClick={() => navigate(`/updateSubcategory/${item._id}`)}><AiFillEdit /></td>
                            <td onClick={() => deleteSubCategory(item._id)}>
                              <AiOutlineDelete />
                            </td>
                            {/* Additional details about subcategories can be added here */}
                          </tr>
                        ))}
                      </tbody>

                    </table>
                    <button className='btn' onClick={() => navigate(`/addsubcategory`)}>Add subCategory</button>
                  </div>
                </div>
              )}
       </div>
          <div>
         
           
          </div>
        </div>
      </Style>
    </Layout>
  );
};
export default Product;
