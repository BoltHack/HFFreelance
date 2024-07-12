// const isId = idUser
// setInterval(function (){
//     getNewTokens()
// }, 840000)
// async function getNewTokens() {
//     try {
//         const response = await fetch('/refreshToken', {
//             method: 'POST',
//             credentials: 'include'
//         });
//
//         if (response.ok) {
//             const data = await response.json();
//             const { token } = data;
//
//             if(!token) {
//                 console.log('Токен не найден')
//                 return;
//             }
//
//             localStorage.setItem('token', token);
//
//             window.location.href = `/sendReviews/${isId}`;
//         } else {
//             console.error('Failed to refresh token', response.status);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }
