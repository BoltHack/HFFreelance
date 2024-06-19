const homeId = localStorage.getItem('id');
const ref = localStorage.getItem('ref');
async function getNewTokens() {
    try {
        const response = await fetch('/refreshToken', {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            const { token } = data;

            if(!token) {
                console.log('Токен не найден')
                return;
            }

            localStorage.setItem('token', token);

            if(ref === 'refPersonalArea') {
                window.location.href = '/PersonalArea';
            }
            else if(ref === 'refSendReviews'){
                window.location.href = `/sendReviews/${homeId}`;
            }
            else if(ref === 'refAdmin'){
                window.location.href = `/admin/allUsers`;
            }
        } else {
            console.error('Failed to refresh token', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

getNewTokens();