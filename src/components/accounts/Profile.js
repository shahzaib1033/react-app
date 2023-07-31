import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import {Style} from '../addproducts/style';
const ProfileForm = () => {
  const initialAddress = {
    addresstype: '',
    country: '',
    city: '',
    district: '',
    streetNo: '',
    houseNo: '',
  };

  const [fullName, setFullName] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [address, setAddress] = useState([initialAddress]);
  const [addressErrors, setAddressErrors] = useState([{}]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Manual validation
    const newAddressErrors = address.map((addressItem) => {
      const addressErrors = {};
      if (!addressItem.addresstype) addressErrors.addresstype = 'Address Type is required';
      if (!addressItem.country) addressErrors.country = 'Country is required';
      if (!addressItem.city) addressErrors.city = 'City is required';
      if (!addressItem.district) addressErrors.district = 'District is required';
      if (!addressItem.streetNo) addressErrors.streetNo = 'Street No is required';
      if (!addressItem.houseNo) addressErrors.houseNo = 'House No is required';
      return addressErrors;
    });

    setAddressErrors(newAddressErrors);

    // If there are no errors, you can proceed with form submission
    if (
      fullName &&
      description &&
      age &&
      gender &&
      phoneNo &&
      hobbies &&
      newAddressErrors.every((addressError) => Object.keys(addressError).length === 0)
    ) {
      const formData = {
        fullName,
        description,
        age,
        gender,
        phoneNo,
        hobbies,
        address,
      };
      console.log('Submitted values:', formData);
      // You can perform further actions like API calls to save the data.
    }
  };

  const handleAddAddress = () => {
    setAddress([...address, initialAddress]);
    setAddressErrors([...addressErrors, {}]);
  };

  const handleRemoveAddress = (index) => {
    const updatedAddress = [...address];
    updatedAddress.splice(index, 1);
    setAddress(updatedAddress);

    const updatedAddressErrors = [...addressErrors];
    updatedAddressErrors.splice(index, 1);
    setAddressErrors(updatedAddressErrors);
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddress = [...address];
    updatedAddress[index] = { ...updatedAddress[index], [name]: value };
    setAddress(updatedAddress);
  };

  return (
    <Layout>

      <Style>
        <div className='bodyOfForm'>
          <div className='signInForm'>
            <h2>Profile Form</h2>
            <form className='form' onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName">Full Name</label>
                <input
                  className='input'
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {fullName===''&& <div className='message'>Full Name is required</div>}
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <input
                  className='input'
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {description === '' && <div className='message'>Description is required</div>}
              </div>

              <div>
                <label htmlFor="age">Age</label>
                <input
                  className='input'
                  type="text"
                  id="age"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                {age === '' && <div className='message'>Age is required</div>}
              </div>

              <div>
                <label htmlFor="gender">Gender</label>
                <input
                  className='input'
                  type="text"
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
                {gender === '' && <div className='message'>Gender is required</div>}
              </div>

              <div>
                <label htmlFor="phoneNo">Phone No</label>
                <input
                  className='input'
                  type="text"
                  id="phoneNo"
                  name="phoneNo"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
                {phoneNo === '' && <div className='message'>Phone No is required</div>}
              </div>

              <div>
                <label htmlFor="hobbies">Hobbies</label>
                <input
                  className='input'
                  type="text"
                  id="hobbies"
                  name="hobbies"
                  value={hobbies}
                  onChange={(e) => setHobbies(e.target.value)}
                />
                {hobbies === '' && <div className='message'>Hobbies is required</div>}
              </div>

              <fieldset className='set'>
                <legend>Address</legend>
                {address.map((addressItem, index) => (
                  <div key={index}>
                    <h4>Address {index + 1}</h4>
                    <div>
                      <label htmlFor={`addresstype_${index}`}>Address Type</label>
                      <input
                        className='input'
                        type="text"
                        id={`addresstype_${index}`}
                        name={`address[${index}].addresstype`}
                        value={addressItem.addresstype}
                        onChange={(e) => handleAddressChange(index, e)}
                      />
                      {addressErrors[index] && addressErrors[index].addresstype && (
                        <div>{addressErrors[index].addresstype}</div>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`country_${index}`}>Country</label>
                      <input
                        className='input'
                        type="text"
                        id={`country_${index}`}
                        name={`address[${index}].country`}
                        value={addressItem.country}
                        onChange={(e) => handleAddressChange(index, e)}
                      />
                      {addressErrors[index] && addressErrors[index].country && (
                        <div>{addressErrors[index].country}</div>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`city_${index}`}>City</label>
                      <input
                        className='input'
                        type="text"
                        id={`city_${index}`}
                        name={`address[${index}].city`}
                        value={addressItem.city}
                        onChange={(e) => handleAddressChange(index, e)}
                      />
                      {addressErrors[index] && addressErrors[index].city && (
                        <div>{addressErrors[index].city}</div>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`district_${index}`}>District</label>
                      <input
                        className='input'
                        type="text"
                        id={`district_${index}`}
                        name={`address[${index}].district`}
                        value={addressItem.district}
                        onChange={(e) => handleAddressChange(index, e)}
                      />
                      {addressErrors[index] && addressErrors[index].district && (
                        <div>{addressErrors[index].district}</div>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`streetNo_${index}`}>Street No</label>
                      <input
                        className='input'
                        type="text"
                        id={`streetNo_${index}`}
                        name={`address[${index}].streetNo`}
                        value={addressItem.streetNo}
                        onChange={(e) => handleAddressChange(index, e)}
                      />
                      {addressErrors[index] && addressErrors[index].streetNo && (
                        <div>{addressErrors[index].streetNo}</div>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`houseNo_${index}`}>House No</label>
                      <input
                        className='input'
                        type="text"
                        id={`houseNo_${index}`}
                        name={`address[${index}].houseNo`}
                        value={addressItem.houseNo}
                        onChange={(e) => handleAddressChange(index, e)}
                      />
                      {addressErrors[index] && addressErrors[index].houseNo && (
                        <div>{addressErrors[index].houseNo}</div>
                      )}
                    </div>

                    <button className='btn' type="button" onClick={() => handleRemoveAddress(index)}>
                      Remove Address
                    </button>
                  </div>
                ))}
                <button className='btn' type="button" onClick={handleAddAddress}>
                  Add Address
                </button>
              </fieldset>

              <button className='btn' type="submit">Submit</button>
            </form>
          </div>
        </div>
      </Style>

    </Layout>
  );
};

export default ProfileForm;
