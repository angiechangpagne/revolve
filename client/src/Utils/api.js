import axios from 'axios';
// const client = axios.create();
// const formData = require('form-data');
//client router to server route middlewares and controller
const api = {
  //get user document from User Collection
  getUser: (loginData) => {
    //console.log("In the api call function");
    return axios.post('/api/login', loginData).then(res => {
      console.log('axios res for login received', res);
      // axios.interceptors.response.use((res) => {
      //   console.log('res interceptions', client.interceptors.response);
        return res;
      // }, err => { return Promise.reject(err);
      // });
    }, err => {
          return Promise.reject(err);
    });
  },
  //save new user into database
  saveUser : (userData) => {
    // console.log("User  line 10 of api frontend", userData);
    //  let data=new formData();

    // const params = new URLSearchParams();
      // data.append('firstname', userData.firstname);
      // data.append('lastname', userData.lastname);
      // data.append('email', userData.email);
      // data.append('password', userData.password);
      // data.append('phoneNumber', userData.phoneNumber);

    return axios.post('/api/signup', userData,{
      headers: { 'content-type': 'application/json' }
    }).then(res => {
      console.log('axios res received', res);
    
      // axios.interceptors.response.use((res) => {
      //   console.log('res interceptions', client.interceptors.response);
        return res;
      // }, err => { return Promise.reject(err);
      // });
    }, err => {
          return Promise.reject(err);
    });
    // axios({
    //   method: 'post',
    //   url: '/api/event/item',
    //   data: params
    // })
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
    return axios.get(`/api/user/${userId}/rmdr`)
      .then(res => {
        console.log('in axios', res);
        return res;
      })
      .catch(err => {
        console.log('err');
      });
  }, 
  //save reminder for current user
  saveUserReminder : (userId, rmdrData) => {
    return axios.post(`/api/user/${userId}/rmdr`, rmdrData, {
      headers: { 'content-type': 'application/json' }
    })
    .then(res => {
        console.log('in axios', res);
        return res;
      })
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