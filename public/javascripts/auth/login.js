document.addEventListener('DOMContentLoaded', function (){
    const togglePassword1 = document.getElementById('togglePassword1');
    const togglePassword2 = document.getElementById('togglePassword2');
    let passwordField = document.getElementById('pwd');
    let passwordFieldType = passwordField.getAttribute('type');
    togglePassword1.addEventListener('click', function () {
        if (passwordFieldType === 'password') {
            passwordField.setAttribute('type', 'text');
            togglePassword2.hidden = false;
            togglePassword1.hidden = true;
        }
    })
    togglePassword2.addEventListener('click', function () {
        if (passwordFieldType === 'password') {
            passwordField.setAttribute('type', 'password');
            togglePassword2.hidden = true;
            togglePassword1.hidden = false;
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
                    localStorage.setItem('ref', 'refMain');
                    setTimeout(function () {
                        window.location.href = `/`;
                        setTimeout(function () {
                            window.location.reload();
                        }, 500);
                    }, 1000);
                }
            });
    });
})

function checkToken () {
    const token = localStorage.getItem('token');
    if(token){
        window.location.href = '/'
    }
}
checkToken()