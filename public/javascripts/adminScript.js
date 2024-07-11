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

            const ref = localStorage.getItem('ref')

            if (ref === 'allUsers'){
                window.location.href = '/admin/allUsers';
            }
            if (ref === 'sendNews'){
                window.location.href = '/admin/sendNews';
            }
            if (ref === 'allNews'){
                window.location.href = '/admin/allNews';
            }
            if (ref === 'sendLinks'){
                window.location.href = '/admin/sendLinks';
            }
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
        localStorage.setItem('ref', 'sendNews')
    }
    if(window.location.pathname === '/admin/allNews'){
        allNews.style.color = '#a2a8d3'
        localStorage.setItem('ref', 'allNews')
    }
    if(window.location.pathname === '/admin/allUsers'){
        allUsers.style.color = '#a2a8d3'
        localStorage.setItem('ref', 'allUsers')
    }
    if(window.location.pathname === '/admin/sendLinks'){
        sendLinks.style.color = '#a2a8d3'
        localStorage.setItem('ref', 'sendLinks')
    }
}
adminWindow();