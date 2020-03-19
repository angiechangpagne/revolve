import axios from 'axios';

export default {
  //get user document from User Collection
  getUser: (loginData) => {
    return axios.post('/api/login', loginData);
  },
  //save new user into database
  saveUser : (userData) => {
    console.log("User data line 10 of api frontend", userData);
    return axios.post('/api/signup', userData);
  }, 
  //get all reminders for the current user
  getUserReminders : (userId) => {
    return axios.get(`/api/user/${userId/rmdr}`);
  }, 
  //save reminder for current user
  saveUserReminder : (userId, rmdrId) => {
    return axios.post(`/api/user/${userId}/rmdr`, rmdrData);
  },
  //update reminder
  updateUserReminder : (userId, rmdrId, rmdrData) => {
    return axios.put(`/api/user/${userId}/rmdr/${rmdrId}`);
  }
};