const mainContainer = document.getElementById('mainContainer');
const myId = localStorage.getItem('id');
const myToken = localStorage.getItem('token');

// function indexFunction() {
//     mainContainer.innerHTML = "";
//     fetch('/main')
//         .then(response => response.text())
//         .then(data => {
//             mainContainer.insertAdjacentHTML('afterbegin', data);
//         })
//         .catch(error => {
//             console.error('Fetch error:', error);
//         });
// }

function registerFunction() {
    mainContainer.innerHTML = "";
    mainContainer.insertAdjacentHTML('afterbegin', `
<link rel="stylesheet" href="/stylesheets/login-register.css">
<div class="login-register-container">
    <form action="/auth/register" method="post" class="form-register" id="loginForm">
        <h2 style="text-align: center; padding: 10px;">Регистрация</h2>
        <div style="padding: 10px">
            <input type="text" class="form-control" id="name" placeholder="Имя или Имя и Фамилия" name="name" required>
            <input type="email" class="form-control" id="email" placeholder="Эл. адрес" name="email" required>
            <div class="password-container">
                <input type="password" class="form-control" id="pwd" placeholder="Пароль" name="password" required>
                <span class="toggle-password" id="togglePassword1">&#128065;</span>
            </div>

            <div class="password-container">
                <input type="password" class="form-control" id="cpwd" placeholder="повтор пароля" name="confirmPassword" require>
            </div>
        </div>
        <div class="rules">
            <span>Регистрируясь, вы принимаете наши <a href="/rules" target="_blank">Условия использования</a> и <a href="/privacyPolicy" target="_blank">Политику конфиденциальности.</a></span>
        </div><br>
        <button type="submit" class="btn-register" id="registerButton">Зарегистрироваться</button>
        <p id="loginErr"></p>
        <p id="correctRegister"></p>
    </form>
    <div class="already-have-account">
        <span>
        <p class="login">Уже есть аккаунт?</p>
        <a href="/auth/login" class="register">Войти</a>
        </span>
    </div>
</div>

`)

    document.getElementById('togglePassword1').addEventListener('click', function () {
        let passwordField = document.getElementById('pwd');
        let cpasswordField = document.getElementById('cpwd');
        let passwordFieldType = passwordField.getAttribute('type');
        if (passwordFieldType === 'password') {
            passwordField.setAttribute('type', 'text');
            cpasswordField.setAttribute('type', 'text');
            this.innerHTML = '&#128065;';
        } else {
            passwordField.setAttribute('type', 'password');
            cpasswordField.setAttribute('type', 'password');
            this.innerHTML = '&#128065;';
        }
    });

    let registerButton = document.getElementById('registerButton');
    let loginForm = document.getElementById('loginForm');
    let loginErr = document.getElementById('loginErr');
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let pwd = document.getElementById('pwd');
    let cpwd = document.getElementById('cpwd');

    registerButton.addEventListener('click', (evt) => {
        evt.preventDefault();

        if (!name.value || !email.value || !pwd.value || !cpwd.value) {
            loginErr.innerHTML = 'Пожалуйста, заполните все поля';
            name.style.border = '1px solid #780000';
            email.style.border = '1px solid #780000';
            pwd.style.border = '1px solid #780000';
            cpwd.style.border = '1px solid #780000';
            return;
        }

        let registerInfo = {
            email: loginForm.elements['email'].value,
            name: loginForm.elements['name'].value,
            password: loginForm.elements['password'].value,
            confirmPassword: loginForm.elements['confirmPassword'].value
        }
        fetch('/auth/register', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(registerInfo)
        }).then(res => res.json())
            .then(data => {
                const {error, message} = data;
                if (error) {
                    loginErr.innerHTML = error;
                    name.style.border = '1px solid #780000';
                    email.style.border = '1px solid #780000';
                    pwd.style.border = '1px solid #780000';
                    cpwd.style.border = '1px solid #780000';
                    return;
                }
                const correctRegister = document.getElementById('correctRegister');
                loginErr.innerHTML = '';
                correctRegister.innerHTML = `<p>Успешная регистрация!</p>`;
                name.style.border = '1px solid #0d2818';
                email.style.border = '1px solid #0d2818';
                pwd.style.border = '1px solid #0d2818';
                cpwd.style.border = '1px solid #0d2818';
                setTimeout(function (){
                    window.location.href = `/auth/login`;
                    setTimeout(function (){
                        window.location.reload();
                    }, 500)
                }, 1000)
            })
    })
}

function loginFunction() {
    mainContainer.innerHTML = '';
    mainContainer.insertAdjacentHTML('afterbegin', `
<link rel="stylesheet" href="/stylesheets/login-register.css">
<div class="login-register-container">
    <form action="/auth/login" class="form-login" id="loginForm">
        <div style="padding: 10px;">
            <h2>Авторизация</h2>
            <input type="email" placeholder="Эл. адрес" name="email" id="email" required>
            <div class="password-container">
                <input type="password" class="form-control" id="pwd" placeholder="Пароль" name="password" required>
                <span class="toggle-password" id="togglePassword1">&#128065;</span>
            </div>
            <button type="submit" id="loginButton">Войти</button>
            <p id="loginErr"></p>
            <p id="correctJoin"></p>
        </div>
    </form>
    <div class="already-have-account">
        <p style="text-align: center">У вас ещё нет аккаунта?</p>
        <a href="/auth/register" class="register">Зарегистрироваться</a>
    </div>
</div>
`);

    document.getElementById('togglePassword1').addEventListener('click', function () {
        let passwordField = document.getElementById('pwd');
        let passwordFieldType = passwordField.getAttribute('type');
        if (passwordFieldType === 'password') {
            passwordField.setAttribute('type', 'text');
            this.innerHTML = '&#128065;';
        } else {
            passwordField.setAttribute('type', 'password');
            this.innerHTML = '&#128065;';
        }
    });

    let loginButton = document.getElementById('loginButton');

    let loginErr = document.getElementById('loginErr');
    let loginForm = document.getElementById('loginForm');
    let email = document.getElementById('email');
    let pwd = document.getElementById('pwd');

    loginButton.addEventListener('click', (ev) => {
        ev.preventDefault();

        if (!email.value || !pwd.value) {
            loginErr.innerHTML = 'Пожалуйста, заполните все поля';
            email.style.border = '1px solid #780000';
            pwd.style.border = '1px solid #780000';
            return;
        }

        let loginInfo = {
            email: loginForm.elements['email'].value,
            password: loginForm.elements['password'].value
        };

        fetch('/auth/login', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        }).then(res => res.json())
            .then(data => {
                let {error, token, user} = data;

                if (error) {
                    loginErr.innerHTML = error;
                    email.style.border = '1px solid #780000';
                    pwd.style.border = '1px solid #780000';
                    return;
                }

                if (token) {
                    const correctJoin = document.getElementById('correctJoin');
                    loginErr.innerHTML = '';
                    correctJoin.innerHTML = '<p>Успешный вход!</p>';
                    email.style.border = '1px solid #0d2818';
                    pwd.style.border = '1px solid #0d2818';
                    localStorage.setItem('token', token);
                    localStorage.setItem('name', user.name);
                    localStorage.setItem('profileImage', 'data:image/png;base64,' + user.image);
                    localStorage.setItem('id', user._id);
                    setTimeout(function (){
                        window.location.href = '/';
                        window.location.reload();
                    }, 1000);
                }
            });
    });
}


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
    <br>
<h3>Вы не авторизованы</h3>
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
    window.location.href = '/refreshToken';
}

function sendReviews() {
    localStorage.setItem('ref', 'refSendReviews');
    window.location.href = '/refreshToken';
}

function admin() {
    localStorage.setItem('ref', 'refAdmin');
    window.location.href = '/refreshToken';
}
function logoutMenu() {
    const barrier = document.createElement('barrier');
    const border = document.createElement('border');

    barrier.innerHTML = `<div class="new-barrier"></div>`;
    border.innerHTML = `
        <link rel="stylesheet" href="/stylesheets/style.css">
        <div class="logout-border">
        <p style="text-align: center">Вы точно хотите выйти?</p>
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
        chatFunc();
    }
}

function chatFunc(){
    const barrier = document.createElement('barrier');
    const border = document.createElement('border');

    barrier.innerHTML = `<div class="new-barrier"></div>`;
    border.innerHTML = `
        <link rel="stylesheet" href="/stylesheets/style.css">
        <div class="logout-border">
        <p style="text-align: center">Перейти в чат с разработчиком?</p>
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
    if (name) {
        const account = document.getElementById('account');
        account.style.color = '#21f0df';
        account.textContent = 'Личный кабинет'
    }
}
weHaveAnAccount();

function checkTokenSendPreview() {
    const token = localStorage.getItem('token');

    if(!token){
        displayInfo();
    }
    else{
        sendReviews();
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
        <p style="text-align: center">Вы уверены, что хотите удалить свою учётную запись?</p>
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
