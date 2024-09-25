const socket = io();

// const form = document.getElementById('form');
// const input = document.getElementById('message');
// const messagesList = document.getElementById('messages');
//
// form.addEventListener('submit', function (e) {
//     e.preventDefault();
//     if (input.value) {
//         const messageData = {
//             message: input.value
//         };
//         socket.emit('chat message', messageData);
//         input.value = '';
//     }
// });
//
// socket.on('chat message', function (msg) {
//     const item = document.createElement('li');
//     item.innerHTML = `<strong>${msg.username}:</strong> ${msg.message}`;
//     messagesList.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
// });
