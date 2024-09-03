function localsF() {
    const homeId = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const url = token ? `/changeLocalAuth/${homeId}` : '/changeLocal';
    fetch(url, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
    })
        .then(response => {
            if (response.ok) {
                const local = localStorage.getItem('local');
                if (local === 'en'){
                    localStorage.setItem('local', 'ru');
                    console.log(url)
                    window.location.href = '/';
                }
                else{
                    localStorage.setItem('local', 'en');
                    console.log(url)
                    window.location.href = '/';
                }

            } else {
                response.json().then(errorMessage => {
                    console.log("Ошибка: " + errorMessage);
                });
            }
        })
        .catch(error => {
            dynamicMenu('Произошла ошибка при отправке запроса:', error);
            dynamicMenu("Произошла ошибка при отправке запроса: " + error.message);
        });
}