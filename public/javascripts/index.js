if (localStorage.getItem('token')) {
    if (window.location.pathname === '/auth/login' || window.location.pathname === '/auth/register') {
        window.location.href = '/';
    } else if (window.location.pathname === '/auth/logout') {
        logout();
    } else {
        homePageFunction();
    }
} else {
    if (window.location.pathname === '/auth/login') {
        loginFunction();
    } else if (window.location.pathname === '/auth/register') {
        registerFunction();
    } else {
        indexFunction();
    }
}