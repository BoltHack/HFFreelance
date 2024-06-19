function footer(){
    const section = document.getElementById('footerSection');
    if(window.location.pathname === '/auth/login' || window.location.pathname === '/auth/register' || window.location.pathname === '/auth/youNeedToLogIn'){
        section.hidden = true
    }
    else{
        section.hidden = false
    }
}
footer();