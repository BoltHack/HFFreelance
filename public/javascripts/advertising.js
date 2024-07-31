document.addEventListener('DOMContentLoaded', function() {
    const ads = document.querySelectorAll('.center-advertising');

    if (ads.length > 1) {
        for (let i = 1; i < ads.length; i++) {
            ads[i].style.display = 'none';
        }
    }
});

function dynamicMenu(text) {
    const alert = document.createElement('div');
    const alertText = document.createElement('alertText');

    alert.classList.add('alert');
    alertText.innerHTML = text;

    alert.appendChild(alertText);
    document.body.appendChild(alert);

    setTimeout(() => {
        alert.classList.add('show');
    }, 100);
    setTimeout(() => {
        alert.classList.add('backShow');
    }, 3000)
    setTimeout(() => {
        document.body.removeChild(alert)
    }, 6000)
}


document.addEventListener('DOMContentLoaded', () => {
    const loveButton = document.querySelectorAll('.love');

    function checkLoveState() {
        loveButton.forEach(button => {
            const siteId = button.getAttribute('data-id');
            const love = document.getElementById('love-' + siteId);
            const alreadyLove = document.getElementById('alreadyLove-' + siteId);

            let favorites = localStorage.getItem('favorites');
            if (favorites) {
                favorites = JSON.parse(favorites);
                const favoritesIndex = favorites.findIndex(item => item.id === siteId);
                if (favoritesIndex !== -1) {
                    love.style.display = 'none';
                    alreadyLove.hidden = false;
                } else {
                    love.hidden = false;
                    alreadyLove.hidden = true;
                }
            } else {
                love.hidden = false;
                alreadyLove.hidden = true;
            }
        });
    }
    checkLoveState()

    loveButton.forEach(button => {
        button.addEventListener('click', function() {
            const siteId = this.getAttribute('data-id');
            const siteTitle = this.getAttribute('data-title');
            const siteType = this.getAttribute('data-type');
            const siteImg = this.getAttribute('data-img');
            const love = document.getElementById('love-'+siteId)
            const alreadyLove = document.getElementById('alreadyLove-'+siteId)

            let favorites = localStorage.getItem('favorites');

            if (favorites){
                favorites = JSON.parse(favorites)
            }
            else{
                favorites = [];
            }

            const favoritesIndex = favorites.findIndex(item => item.id === siteId)

            if(favoritesIndex === -1){
                favorites.push({id: siteId, title: siteTitle, type: siteType, img: siteImg })
            }

            love.hidden = true;
            alreadyLove.hidden = false;
            localStorage.setItem('favorites', JSON.stringify(favorites))
            dynamicMenu(`${siteTitle} добавлен в избранное!`)
        })
    })
})




function displayInfo() {
    const barrier = document.createElement('barrier');
    const border = document.createElement('border');

        barrier.innerHTML = `<div class="new-barrier"></div>`;
        border.innerHTML = `
<link rel="stylesheet" href="/stylesheets/style.css">
<div class="new-border">
<div class="border-data">
    <h2 class="yourAccount">Ваш аккаунт</h2>
    <br>
<h3>Вы не авторизованы</h3>
<p>Войдите в учётную запись или создайте аккаунт.</p>
<button onclick="login()" class="login-btn">Войти</button>
<button onclick="register()" class="register-btn">Создать аккаунт</button>
<span>Продолжая, вы принимаете наши <a class="termsOfUse" href="/rules" target="_blank">Условия использования</a> и <a href="privacyPolicy" target="_blank" class="privacyPolicy">Политику конфиденциальности</a>.</span>
</div>
</div>
</div>
    `

        document.body.appendChild(border);
        document.body.appendChild(barrier);
        barrier.addEventListener('click', () => {
            document.body.removeChild(border);
            document.body.removeChild(barrier);
        })
        document.getElementById('close').addEventListener('click', () => {
            document.body.removeChild(border);
            document.body.removeChild(barrier);
        })
}

const login = () => {
    window.location.href = `/auth/login`
}
const register = () => {
    window.location.href = `/auth/register`
}


function checkDownload(){
    document.addEventListener('DOMContentLoaded', () => {
        const elements = document.querySelectorAll('[data-download]');

        elements.forEach(element => {
            const dataId = element.getAttribute('data-download');
            const token = localStorage.getItem('token');

            if (token) {
                element.innerHTML = `
                <form action="/downloadFile/${dataId}" method="POST">
                    <button class="Download-button">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                            <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" fill="white"></path>
                        </svg>
                        <span>Скачать</span>
                    </button>
                </form>
            `;
            }
            else{
                element.innerHTML = `<button class="Download-button" onclick="displayInfo()">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                            <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" fill="white"></path>
                        </svg>
                        <span>Скачать</span>
                    </button>`
            }
        });
    });
}
checkDownload();