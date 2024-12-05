const divTheme = document.getElementById('theme');
divTheme.addEventListener('change', () => {
    fetch('/changeTheme', {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
    })
        .then(response => {
            if (response.ok) {
                if (divTheme.checked){
                    localStorage.setItem('theme', 'light');
                    document.body.classList.add('lightTheme');
                    // setTimeout(function (){
                    //     window.location.reload();
                    // }, 500);
                }
                else{
                    localStorage.setItem('theme', 'dark');
                    document.body.classList.remove('lightTheme');
                    // setTimeout(function (){
                    //     window.location.reload();
                    // }, 500);
                }
            } else {
                response.json().then(errorMessage => {
                    console.log("Ошибка: " + errorMessage);
                });
            }
        })
        .catch(error => {
            console.log('Произошла ошибка при отправке запроса:', error);
            console.log("Произошла ошибка при отправке запроса: " + error.message);
        });
})


document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.remove('lightTheme');
        divTheme.checked = false;
    } else if (!theme) {
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.add('lightTheme');
        divTheme.checked = true;
    }
})
