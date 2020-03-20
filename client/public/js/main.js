// // const numberInput = document.getElementById('number'),
// //                     textInput = document.getElementById('msg'),
// //                     scheduleSelect = document.getElementById('schedule'),
// //                     button = document.getElementById('button'),
// //                     response = document.querySelector('.response');

                   
// // button.addEventListener('click', send, false);
// const port = process.env.PORT || 3001;

// const server = app.listen(port, () => console.log(`🌎  ==> Server Listening on port ${port}`));

// const socketio = require('socket.io')
// const io = socketio(server);
// const socket = io();
// socket.on('smsStatus', (data) => {
//   if(data.error){
//     response.innerHTML = '<h5> Text message sent to ' + data.error + '</h5>';
//   } else {
//     response.innerHTML = '<h5> Text message sent to ' + data.number + '</h5>';
//   }
// });

// let timeOut;
// const getTimeSchedule = ({ time, number, text }) => {
//   if(timeOut) clearTimeout(timeOut);
//   timeOut = setTimeout(() => {
//     fetchServer({ number, text });
//   }, time * 60 * 1000);
// };


// const fetchServer = ({ number, text }) => {
//   console.log('send');
//   fetch('/', {
//     method: 'post',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify({ number, text })
//   })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// function send() {
//   const number = numberInput.value.replace(/\D/g, '');
//   const text = textInput.value;
//   const time = parseInt(scheduleSelect.value, 10);
//   getTimeSchedule({ number, text, time });
// }
