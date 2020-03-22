import axios from 'axios';

const api = {
  //get user document from User Collection
  getUser: (loginData) => {
    //console.log("In the api call function");
    return axios.post('/api/login', loginData);
  },
  //save new user into database
  saveUser : (userData) => {
    // console.log("User  line 10 of api frontend", userData);
    return axios.post('/api/signup', userData);
      // .then(resp => {data
      //   console.log('status code', `${resp.statusCode}`);
      //   axios.interceptors.response.use((resp) => {
      //     console.log("Response was received");
      //     return resp;
      //   }, err => {
      //     return Promise.reject(err);
      //   });
      // })
      // .catch(error => {
      //   console.log(error);
      // });
  }, 
  //get all reminders for the current user
  getUserReminders : (userId) => {
    return axios.get(`/api/user/${userId}/rmdr`);
  }, 
  //save reminder for current user
  saveUserReminder : (userId, rmdrData) => {
    axios.post(`/api/user/${userId}/rmdr`, rmdrData)
      .then(response => console.log(response))
      .catch(error => {
        if(!error.status){
          alert('unauthorized');
        } //console.log(error.response)
      });
  },
  //update reminder
  updateUserReminder : (userId, rmdrId, rmdrData) => {
    return axios.put(`/api/user/${userId}/rmdr/${rmdrId}`, rmdrData);
  },
  //delete appointment for current user
  deleteUserReminder : (userId, rmdrId) => {
    return axios.delete(`/api/user/${userId}/rmdr/${rmdrId}`);
  }
};


export default api;