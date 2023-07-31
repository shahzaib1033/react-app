import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout'
import { Style } from '../products/style'
import axios from 'axios';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');
  const [existingOrders, setExistingOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/order/getOrder', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setExistingOrders(response.data.data);
        setIsLoading(false);
        // console.log(existingOrders);
      } catch (error) {
        console.error('Error fetching order data:', error);
        alert('Error fetching order data:')
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [token]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <Style>
        <div className='body'>
          <div >
            <h2>orders</h2>
            <div >
              <table className='table'>
              <thead>
                <tr className='row'>
                  <td className='column '>Order No.</td>
                  <td className='column'>Status</td>
                  {/* <td className='column'></td> */}
                  <td className='column'>payment</td>
                  <td className='column name'>orderDate</td>
                </tr>
              </thead>
                <tbody className='table-container'>
                {existingOrders.map((data, index) => (
                  <tr className='datarow' key={index + 1}>
                    <td className='column'>{index+1}</td>
                    <td className='column'>{data.status}</td>
                    <td className='column'>{data.payment}</td>
                    {/* <td className='column'>{ }</td> */}
                    <td className='column name'>{data.createdAt.split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>

              </table>
            </div>
      </div>
        </div>
      </Style>
    </Layout>
  )
}
