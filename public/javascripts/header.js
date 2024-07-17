function refs(){
    const refId = localStorage.getItem('id');
    if (window.location.pathname === '/PersonalArea'){
        const refPersonalArea = localStorage.getItem('ref');
        if (refPersonalArea !== 'refPersonalArea'){
            localStorage.setItem('ref', 'refPersonalArea');
            window.location.href = '/accessToken'
        }
    }
    if (window.location.pathname === '/readyMadeSites'){
        const refReadyMadeSites = localStorage.getItem('ref');
        if (refReadyMadeSites !== 'refReadyMadeSites'){
            localStorage.setItem('ref', 'refReadyMadeSites');
            window.location.href = '/accessToken'
        }
    }
    if (window.location.pathname === '/readyMadeSites/htmlCss'){
        const refReadyMadeSites = localStorage.getItem('ref');
        if (refReadyMadeSites !== 'refReadyMadeSites'){
            localStorage.setItem('ref', 'refReadyMadeSites');
            window.location.href = '/accessToken'
        }
    }
    if (window.location.pathname === '/readyMadeSites/javascript'){
        const refReadyMadeSites = localStorage.getItem('ref');
        if (refReadyMadeSites !== 'refReadyMadeSites'){
            localStorage.setItem('ref', 'refReadyMadeSites');
            window.location.href = '/accessToken'
        }
    }
    if (window.location.pathname === '/readyMadeSites/fullstack'){
        const refReadyMadeSites = localStorage.getItem('ref');
        if (refReadyMadeSites !== 'refReadyMadeSites'){
            localStorage.setItem('ref', 'refReadyMadeSites');
            window.location.href = '/accessToken'
        }
    }
    if (window.location.pathname === `/sendReviews/${refId}`){
        const refSendReviews = localStorage.getItem('ref');
        if (refSendReviews !== 'refSendReviews'){
            localStorage.setItem('ref', 'refSendReviews');
            window.location.href = '/accessToken'
        }
    }
}
refs()
function ha() {
    const sectionLinks = document.querySelectorAll('.ha');
    sectionLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href').substring(1);

            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({behavior: 'smooth'});
            }
        });
    });
}
ha();

const section = document.getElementById('headerSection');
const back = document.getElementById('back');
const types = document.getElementById('types');
// const fileId = localStorage.getItem('id');
function header(){
    if (window.location.pathname === '/'){
        section.hidden = false;
        types.hidden = true;
    }
    else if (window.location.pathname === '/readyMadeSites' || window.location.pathname === '/readyMadeSites/htmlCss' || window.location.pathname === '/readyMadeSites/javascript' || window.location.pathname === '/readyMadeSites/fullstack'){
        section.hidden = true;
        types.hidden = false;
    }
    else{
        section.hidden = true;
        types.hidden = true;
        back.hidden = true;
    }
}
header();

function webDisplayInfo() {
    const barrier = document.createElement('barrier');
    const border = document.createElement('border');

    const token = localStorage.getItem('token');

    if (token){
        readyMadeSitesJoin();
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

function readyMadeSitesJoin() {
    localStorage.setItem('ref', 'refReadyMadeSites');
    window.location.href = '/accessToken';
}