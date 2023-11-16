// client/src/components/AccountCreation.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AccountCreation.css"

const AccountCreation = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    toast.success('Account Created Successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    e.preventDefault();
    setUsername('');
    setEmail('');
    setPhone('');

    // Dummy data for testing
    const newUser = {
      username,
      email,
      phone,
    };

    // Send a POST request to create a new user
    axios.post('http://localhost:5000/api/users/create', newUser)
      .then(response => console.log('User created:', response.data))
      .catch(error => console.error(error));
  };

  return (
    <>
        <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark" />
    <div className='account'>

      <h2>Account Creation</h2>
      <form className='ivalues' onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required autoComplete='off' placeholder='Enter your Username' />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete='off' placeholder='Enter Your Email' />
        </label>
        <br />
        <label>
          Phone:
          <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} required autoComplete='off' placeholder='Enter Your Password' />
        </label>
        <br />
        <button type="submit">Create Account</button>
      </form>
    </div>
    </>
  );
};

export default AccountCreation;
