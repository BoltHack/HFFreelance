function adminWindow(){
    const allUsers = document.getElementById('allUsers')
    const sendLinks = document.getElementById('sendLinks')
    const news = document.getElementById('news')
    const allNews = document.getElementById('allNews')
    const requestUnban = document.getElementById('requestUnban')
    const allWebsites = document.getElementById('allWebsites')
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
    if(window.location.pathname === '/admin/requestUnban'){
        requestUnban.style.color = '#a2a8d3'
        localStorage.setItem('ref', 'sendRequestUnban')
    }
    if(window.location.pathname === '/admin/allWebsites'){
        allWebsites.style.color = '#a2a8d3'
        localStorage.setItem('ref', 'sendAllWebsites')
    }
}
adminWindow();
