const mainContainer = document.getElementById('mainContainer');
const myId = document.getElementById('id')
const myToken = localStorage.getItem('token');

function homePageFunction() {
    mainContainer.innerHTML = "";
    fetch('/', {
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + myToken
        },
    }).then(response => response.text())
        .then(data => {
            mainContainer.insertAdjacentHTML('afterbegin', data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

const join = () => {
    localStorage.clear()
    window.location.href = `/auth/login`
}

const login = () => {
    window.location.href = `/auth/login`
}
const register = () => {
    window.location.href = `/auth/register`
}
document.getElementById('account').addEventListener('click', () => {
    displayInfo();
});
function displayInfo() {
        const barrier = document.createElement('barrier');
        const border = document.createElement('border');

        const token = localStorage.getItem('token');

        if (token){
            PersonalAreaJoin();
        }
        else {
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
}

function PersonalAreaJoin() {
    localStorage.setItem('ref', 'refPersonalArea');
    window.location.href = '/accessToken';
}

function sendReviewsJoin() {
    localStorage.setItem('ref', 'refSendReviews');
    window.location.href = '/accessToken';
}

function admin() {
    localStorage.setItem('ref', 'refAdmin');
    window.location.href = '/accessToken';
}

function logoutMenu() {
    const barrier = document.createElement('barrier');
    const border = document.createElement('border');

    barrier.innerHTML = `<div class="new-barrier"></div>`;
    border.innerHTML = `
        <link rel="stylesheet" href="/stylesheets/style.css">
        <div class="logout-border">
        <p style="text-align: center; color: white; margin: 40px 0">Вы точно хотите выйти?</p>
        <div class="yes-or-no">
        <button class="no-btn" id="closeBtn">Нет</button>
        <button class="yes-btn" onclick="logout()">Да</button>  
        </div>
        </div>`

    document.body.appendChild(border);
    document.body.appendChild(barrier);
    barrier.addEventListener('click', () => {
        document.body.removeChild(barrier);
        document.body.removeChild(border);
    })
    document.getElementById('closeBtn').addEventListener('click', () => {
        document.body.removeChild(barrier);
        document.body.removeChild(border);
    })
}
function logout() {
    fetch('/auth/logout', {
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(res => res.json()).then((res) => {
        const {status, error} = res;
        if (error) {
            return;
        }

        if (status) {
            localStorage.clear();
            window.location.href = "/auth/login";
            return;
        }
    });
}

function checkTokenFunc() {
    const token = localStorage.getItem('token');

    if(!token){
        displayInfo();
    }
    else{
        const barrier = document.createElement('barrier');
        const border = document.createElement('border');

        barrier.innerHTML = `<div class="new-barrier"></div>`;
        border.innerHTML = `
        <link rel="stylesheet" href="/stylesheets/style.css">
        <div class="logout-border">
        <p style="text-align: center; color: white; margin: 30px 0; padding: 10px;">Перейти в телеграм-чат с разработчиком?</p>
        <div class="yes-or-no">
        <button class="no-btn" id="closeBtn">Нет</button>
        <a href="https://web.telegram.org/a/" target="_blank"><button class="yes-btn">Да</button></a>
        </div>
        </div>`

        document.body.appendChild(border);
        document.body.appendChild(barrier);
        barrier.addEventListener('click', () => {
            document.body.removeChild(barrier);
            document.body.removeChild(border);
        })
        document.getElementById('closeBtn').addEventListener('click', () => {
            document.body.removeChild(barrier);
            document.body.removeChild(border);
        })
        // window.open('https://web.telegram.org/a/', '_blank');

    }
}

function chatFunc(){
    const barrier = document.createElement('barrier');
    const border = document.createElement('border');

    barrier.innerHTML = `<div class="new-barrier"></div>`;
    border.innerHTML = `
        <link rel="stylesheet" href="/stylesheets/style.css">
        <div class="logout-border">
        <img src="/images/discord.jpg">
        <div class="yes-or-no">
        <button class="no-btn" id="closeBtn">Нет</button>
        <button class="yes-btn" onclick="window.location.href = '/test'">Да</button>
        </div>
        </div>`

    document.body.appendChild(border);
    document.body.appendChild(barrier);
    barrier.addEventListener('click', () => {
        document.body.removeChild(barrier);
        document.body.removeChild(border);
    })
    document.getElementById('closeBtn').addEventListener('click', () => {
        document.body.removeChild(barrier);
        document.body.removeChild(border);
    })
}

function moreDetails() {
    window.location.href = '/moreDetails'
}

function weHaveAnAccount(){
    const name = localStorage.getItem('name');
    const account = document.getElementById('account');
    const accountImg = document.getElementById('account-img');
    if (name) {
        account.style.display = 'none'
        account.hidden = true
        const img = localStorage.getItem('profileImage');
        accountImg.src = img;
        accountImg.hidden = false
    }
    else{
        account.textContent = 'Мой аккаунт'
        accountImg.hidden = true;
    }
}
weHaveAnAccount();

function checkTokenSendPreview() {
    const token = localStorage.getItem('token');

    if(!token){
        displayInfo();
    }
    else{
        sendReviewsJoin();
    }
}

const rInfo = document.getElementById('rInfo');
const moreReviews = document.getElementById('moreReviews');
document.getElementById('moreReviews').addEventListener('click', () => {
    rInfo.hidden = false;
    moreReviews.hidden = true
})
document.getElementById('invincibleReviews').addEventListener('click', () => {
    rInfo.hidden = true;
    moreReviews.hidden = false;
})



function deleteAccountMenu() {
    const barrier = document.createElement('barrier');
    const border = document.createElement('border');

    barrier.innerHTML = `<div class="new-barrier"></div>`;
    border.innerHTML = `
        <link rel="stylesheet" href="/stylesheets/style.css">
        <div class="logout-border">
        <p style="text-align: center; color: white; margin: 30px 0; padding: 10px;">Вы уверены, что хотите удалить свою учётную запись?</p>
        <div class="yes-or-no">
        <button class="no-btn" id="closeBtn">Нет</button>
        <button class="yes-btn" onclick="deleteAccount()">Да</button>
        </div>
        </div>`

    document.body.appendChild(border);
    document.body.appendChild(barrier);
    barrier.addEventListener('click', () => {
        document.body.removeChild(barrier);
        document.body.removeChild(border);
    })
    document.getElementById('closeBtn').addEventListener('click', () => {
        document.body.removeChild(barrier);
        document.body.removeChild(border);
    })
}

function deleteReviewMenu() {
    const barrier = document.createElement('barrier');
    const border = document.createElement('border');

    barrier.innerHTML = `<div class="new-barrier"></div>`;
    border.innerHTML = `
        <link rel="stylesheet" href="/stylesheets/style.css">
        <div class="logout-border">
        <p style="text-align: center; color: white; margin: 30px 0; padding: 10px;">Вы уверены, что хотите удалить свой отзыв?</p>
        <div class="yes-or-no">
        <button class="no-btn" id="closeBtn">Нет</button>
            <button class="yes-btn" onclick="deleteReview()">Да</button>
        </div>
        </div>`

    document.body.appendChild(border);
    document.body.appendChild(barrier);
    barrier.addEventListener('click', () => {
        document.body.removeChild(barrier);
        document.body.removeChild(border);
    })
    document.getElementById('closeBtn').addEventListener('click', () => {
        document.body.removeChild(barrier);
        document.body.removeChild(border);
    })
}


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
