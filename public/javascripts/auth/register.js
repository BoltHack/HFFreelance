document.addEventListener('DOMContentLoaded', function (){
    const togglePassword1 = document.getElementById('togglePassword1');
    const togglePassword2 = document.getElementById('togglePassword2');
    let passwordField = document.getElementById('pwd');
    let confirmPasswordField = document.getElementById('cpwd');
    let passwordFieldType = passwordField.getAttribute('type');
    togglePassword1.addEventListener('click', function () {
        if (passwordFieldType === 'password') {
            passwordField.setAttribute('type', 'text');
            confirmPasswordField.setAttribute('type', 'text');
            togglePassword2.hidden = false;
            togglePassword1.hidden = true;
        }
    })
    togglePassword2.addEventListener('click', function () {
        if (passwordFieldType === 'password') {
            passwordField.setAttribute('type', 'password');
            confirmPasswordField.setAttribute('type', 'password');
            togglePassword2.hidden = true;
            togglePassword1.hidden = false;
        }
    });

    let registerButton = document.getElementById('registerButton');
    let loginForm = document.getElementById('loginForm');
    let registerErr = document.getElementById('registerErr');
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let pwd = document.getElementById('pwd');
    let cpwd = document.getElementById('cpwd');

    registerButton.addEventListener('click', (evt) => {
        evt.preventDefault();

        if (!name.value || !email.value || !pwd.value || !cpwd.value) {
            registerErr.innerHTML = 'Пожалуйста, заполните все поля';
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
        };

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
                    registerErr.innerHTML = error
                    name.style.border = '1px solid #780000';
                    email.style.border = '1px solid #780000';
                    pwd.style.border = '1px solid #780000';
                    cpwd.style.border = '1px solid #780000';
                    return;
                }
                const correctRegister = document.getElementById('correctRegister');
                registerErr.innerHTML = '';
                correctRegister.innerHTML = `<p>Успешная регистрация!</p>`;
                name.style.border = '1px solid #0d2818';
                email.style.border = '1px solid #0d2818';
                pwd.style.border = '1px solid #0d2818';
                cpwd.style.border = '1px solid #0d2818';
                setTimeout(function () {
                    window.location.href = `/auth/login`;
                    setTimeout(function () {
                        window.location.reload();
                    }, 500);
                }, 1000);
            });
    });
});

function checkToken () {
    const token = localStorage.getItem('token');
    if(token){
        window.location.href = '/'
    }
}
checkToken()