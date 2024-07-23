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
            const token = localStorage.getItem('token');
            if (!token){
                displayInfo()
            }
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