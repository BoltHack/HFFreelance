function localsF() {
    fetch(`/changeLocal`, {
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
                    window.location.reload();
                }
                else{
                    localStorage.setItem('local', 'en');
                    window.location.reload();
                }

            } else {
                response.text().then(errorMessage => {
                    console.log("Ошибка: " + errorMessage);
                });
            }
        })
        .catch(error => {
            dynamicMenu('Произошла ошибка при отправке запроса:', error);
            dynamicMenu("Произошла ошибка при отправке запроса: " + error.message);
        });
}