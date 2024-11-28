const divTheme = document.getElementById('theme');
divTheme.addEventListener('change', () => {
    if (divTheme.checked){
        localStorage.setItem('theme', 'light');
        setTimeout(function (){
            window.location.reload();
        }, 500);
        console.log('Светлый режим');
    }
    else{
        localStorage.setItem('theme', 'dark');
        setTimeout(function (){
            window.location.reload();
        }, 500);
        console.log('Тёмный режим');
    }
})


document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.remove('lightTheme');
        divTheme.checked = false;
    }
    else{
        document.body.classList.add('lightTheme');
        divTheme.checked = true;
    }
})