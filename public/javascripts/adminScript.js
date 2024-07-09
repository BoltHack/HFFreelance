setInterval(function (){
    getAdminTokens()
}, 100000)

async function getAdminTokens() {
    try {
        const response = await fetch('/refreshAdmin', {
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

            window.location.href = '/admin/allUsers';
        } else {
            console.error('Failed to refresh token', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function adminWindow(){
    const allUsers = document.getElementById('allUsers')
    const sendLinks = document.getElementById('sendLinks')
    const news = document.getElementById('news')
    const allNews = document.getElementById('allNews')
    if(window.location.pathname === '/admin/sendNews'){
        news.style.color = '#a2a8d3'
    }
    if(window.location.pathname === '/admin/allNews'){
        allNews.style.color = '#a2a8d3'
    }
    if(window.location.pathname === '/admin/allUsers'){
        allUsers.style.color = '#a2a8d3'
    }
    if(window.location.pathname === '/admin/sendLinks'){
        sendLinks.style.color = '#a2a8d3'
    }
}
adminWindow();