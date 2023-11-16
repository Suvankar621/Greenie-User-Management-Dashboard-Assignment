// client/src/components/UserDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AccountCreation.css"
import "./UserDetails.css"

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch users from the server
    axios.get('http://localhost:5000/api/users/')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Filter users based on the search term in real-time
    const filteredUsers = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    );

    setSearchResults(filteredUsers);
  }, [searchTerm, users]);



  const handleUserClick = (user) => {
    // Set the selected user for the modal
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    // Close the modal and reset the selected user
    setSelectedUser(null);
  };

  const handleGenerateReport = () => {
    // Placeholder logic for generating a text-based report
    toast.success('Report Generated Successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    const userReportContent = `
      User Report
      ------------
      Username: ${selectedUser.username}
      Email: ${selectedUser.email}
      Phone: ${selectedUser.phone}
      ID: ${selectedUser._id}
      Creation Date: ${new Date(selectedUser.creationDate).toLocaleString()}
    `;
  
    // Open a new window with the generated report content
    const newWindow = window.open('', '_blank');
    newWindow.document.write('<html><head><title>User Report</title></head><body>');
    newWindow.document.write(`<pre>${userReportContent}</pre>`);
    newWindow.document.write('</body></html>');
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
    <div className="UserDetails">
      <h2>User Details</h2>
      <div className='search'>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
   
      </div>
      <div className="stable">

  
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>ID</th>
            <th>Creation Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user._id}</td>
              <td>{new Date(user.creationDate).toLocaleString()}</td>
              <td>
                <button onClick={() => handleUserClick(user)}>Generate Report</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* Modal for generating reports */}
      {selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Generate Report</h2>
            <p>User: {selectedUser.username}</p>
            <button onClick={handleGenerateReport}>Generate</button>
          </div>
        </div>
      )}
    </div> 
    </>
  );
};

export default UserDetails;
