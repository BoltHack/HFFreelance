setInterval(function (){
    getNewTokens()
}, 840000)
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

            window.location.href = '/PersonalArea';
        } else {
            console.error('Failed to refresh token', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

let profileMenu = document.getElementById('profileMenu');
let changePasswordMenu = document.getElementById('changePasswordMenu');
let newsMenu = document.getElementById('newsMenu');

let profile = document.getElementById('profile');
let changePassword = document.getElementById('changePassword');
let news = document.getElementById('news');

profileMenu.addEventListener('click', () => {
    profileMenu.style.backgroundColor = '#34495e'
    changePasswordMenu.style.background = 'none'
    newsMenu.style.background = 'none'
    profile.hidden = false;
    changePassword.hidden = true;
    news.hidden = true;
    document.body.style.overflowY = 'hidden'
})

changePasswordMenu.addEventListener('click', () => {
    changePasswordMenu.style.backgroundColor = '#34495e'
    profileMenu.style.background = 'none'
    newsMenu.style.background = 'none'
    changePassword.hidden = false;
    profile.hidden = true;
    news.hidden = true;
    document.body.style.overflowY = 'hidden'
})

newsMenu.addEventListener('click', () => {
    newsMenu.style.backgroundColor = '#34495e'
    changePasswordMenu.style.background = 'none'
    profileMenu.style.background = 'none'
    news.hidden = false;
    changePassword.hidden = true;
    profile.hidden = true;
    document.body.style.overflowY = 'auto'
})