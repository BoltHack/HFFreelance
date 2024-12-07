function localsFRu() {
    const homeId = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const url = token ? `/changeLocalAuth/${homeId}/ru` : '/changeLocal/ru';
    fetch(url, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
    })
        .then(response => {
            if (response.ok) {
                localStorage.setItem('local', 'ru');
                localStorage.setItem('changeLocale', true);
                window.location.href = '/';
                }
            else {
                response.json().then(errorMessage => {
                    console.log("Ошибка: " + errorMessage);
                });
            }
        })
        .catch(error => {
            console.log('Произошла ошибка при отправке запроса:', error);
            console.log("Произошла ошибка при отправке запроса: " + error.message);
        });
}

function localsFEn() {
    const homeId = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const url = token ? `/changeLocalAuth/${homeId}/en` : '/changeLocal/en';
    fetch(url, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
    })
        .then(response => {
            if (response.ok) {
                localStorage.setItem('local', 'en');
                localStorage.setItem('changeLocale', true);
                window.location.href = '/';
            }
            else {
                response.json().then(errorMessage => {
                    console.log("Ошибка: " + errorMessage);
                });
            }
        })
        .catch(error => {
            console.log('Произошла ошибка при отправке запроса:', error);
            console.log("Произошла ошибка при отправке запроса: " + error.message);
        });
}
function checkIp() {
    const changeLocale = localStorage.getItem('changeLocale');
    const local = localStorage.getItem('local');
    if (changeLocale === false || !changeLocale){
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const ip = data.ip
                document.cookie = `ip=${encodeURIComponent(ip)}; max-age=${24 * 60 * 60}`;
                const checkIp2 = ip.substr(0, 2);
                const checkIp3 = ip.substr(0, 3);
                if (checkIp2 === '90' || checkIp3 === '100') {
                    if (local !== 'en'){
                        localsFEn();
                    }
                } else {
                    if (local !== 'ru'){
                        localsFRu();
                    }
                }
            });
    }
}
checkIp();