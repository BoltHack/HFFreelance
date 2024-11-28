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

    loginForm.addEventListener('input', () => {
        if (email.value !== '' && pwd.value !== ''){
            loginButton.style.backgroundColor = '#0653c7';
        }
        else{
            loginButton.style.backgroundColor = '#2879f3';
        }
    })

    const local = localStorage.getItem('local');

    loginButton.addEventListener('click', (ev) => {
        ev.preventDefault();

        if (!email.value || !pwd.value) {
            // loginErr.innerHTML = 'Пожалуйста, заполните все поля';
            local === 'ru' ? errorMenu('Пожалуйста, заполните все поля') : errorMenu('Please fill in all fields');
            email.style.border = '1px solid #780000';
            pwd.style.border = '1px solid #780000';
            // togglePassword1.style.top = '53.6%';
            // togglePassword2.style.top = '53.6%';
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
                    // loginErr.innerHTML = error;
                    errorMenu(error)
                    email.style.border = '1px solid #780000';
                    pwd.style.border = '1px solid #780000';
                    // togglePassword1.style.top = '53.6%';
                    // togglePassword2.style.top = '53.6%';
                    return;
                }

                if (token) {
                    // const correctJoin = document.getElementById('correctJoin');
                    loginErr.innerHTML = '';
                    local === 'en' ? successMenu('Successful login!') : successMenu('Успешный вход!');
                    // if (local === 'en'){
                    //     correctJoin.innerHTML = '<p>Successful login!</p>'
                    // }
                    // else{
                    //     correctJoin.innerHTML = '<p>Успешный вход!</p>';
                    // }
                    email.style.border = '1px solid #0d2818';
                    pwd.style.border = '1px solid #0d2818';
                    localStorage.setItem('token', token);
                    localStorage.setItem('name', user.name);
                    localStorage.setItem('profileImage', 'data:image/png;base64,' + user.image);
                    localStorage.setItem('id', user._id);
                    localStorage.setItem('ref', 'refMain');
                    localStorage.setItem('favorites', JSON.stringify(user.favorites));
                    const checkbox = document.getElementById('rememberMeCheckbox');
                    if (checkbox.checked){
                        localStorage.setItem('session', 'true');
                    }
                    else{
                        localStorage.setItem('session', 'false');
                    }
                    localStorage.setItem('theme', 'dark');
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

document.querySelectorAll('form').forEach(function(form) {
    form.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
});

function successMenu(text) {
    const alert = document.createElement('div');
    alert.innerHTML = `
<div class="success-card" id="successCard">
  <svg class="success-wave" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0,256L11.4,240C22.9,224,46,192,69,192C91.4,192,114,224,137,234.7C160,245,183,235,206,213.3C228.6,192,251,160,274,149.3C297.1,139,320,149,343,181.3C365.7,213,389,267,411,282.7C434.3,299,457,277,480,250.7C502.9,224,526,192,549,181.3C571.4,171,594,181,617,208C640,235,663,277,686,256C708.6,235,731,149,754,122.7C777.1,96,800,128,823,165.3C845.7,203,869,245,891,224C914.3,203,937,117,960,112C982.9,107,1006,181,1029,197.3C1051.4,213,1074,171,1097,144C1120,117,1143,107,1166,133.3C1188.6,160,1211,224,1234,218.7C1257.1,213,1280,139,1303,133.3C1325.7,128,1349,192,1371,192C1394.3,192,1417,128,1429,96L1440,64L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
      fill-opacity="1"
    ></path>
  </svg>

  <div class="success-icon-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      stroke-width="0"
      fill="currentColor"
      stroke="currentColor"
      class="success-icon"
    >
      <path
        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
      ></path>
    </svg>
  </div>
  <div class="success-message-text-container">
    <p class="success-message-text">Выполнено!</p>
    <p class="success-sub-text">${text}</p>
  </div>
  <svg id="closeSuccessMenu"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15 15"
    stroke-width="0"
    fill="none"
    stroke="currentColor"
    class="success-cross-icon"
  >
    <path
      fill="currentColor"
      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
      clip-rule="evenodd"
      fill-rule="evenodd"
    ></path>
  </svg>
</div>
`

    document.body.appendChild(alert);

    setTimeout(() => {
        const successCard = document.getElementById('successCard');
        successCard.classList.add('back-show');
    }, 4000);
    setTimeout(() => {
        document.body.removeChild(alert);
    }, 6000);

    document.getElementById('closeSuccessMenu').addEventListener('click', () => {
        const successCard = document.getElementById('successCard');
        successCard.classList.add('back-show');
        setTimeout(() => {
            document.body.removeChild(alert);
        }, 2000);
    })
}

function errorMenu(text) {
    const alert = document.createElement('div');
    alert.innerHTML = `
<div class="error-card" id="errorCard">
  <svg class="error-wave" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0,256L11.4,240C22.9,224,46,192,69,192C91.4,192,114,224,137,234.7C160,245,183,235,206,213.3C228.6,192,251,160,274,149.3C297.1,139,320,149,343,181.3C365.7,213,389,267,411,282.7C434.3,299,457,277,480,250.7C502.9,224,526,192,549,181.3C571.4,171,594,181,617,208C640,235,663,277,686,256C708.6,235,731,149,754,122.7C777.1,96,800,128,823,165.3C845.7,203,869,245,891,224C914.3,203,937,117,960,112C982.9,107,1006,181,1029,197.3C1051.4,213,1074,171,1097,144C1120,117,1143,107,1166,133.3C1188.6,160,1211,224,1234,218.7C1257.1,213,1280,139,1303,133.3C1325.7,128,1349,192,1371,192C1394.3,192,1417,128,1429,96L1440,64L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
      fill-opacity="1"
    ></path>
  </svg>

  <div class="error-icon-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      stroke-width="0"
      fill="currentColor"
      stroke="currentColor"
      class="error-icon"
    >
      <path
        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
      ></path>
    </svg>
  </div>
  <div class="error-message-text-container">
    <p class="error-message-text">Ошибка!</p>
    <p class="error-sub-text">${text}</p>
  </div>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15 15"
    stroke-width="0"
    fill="none"
    stroke="currentColor"
    class="error-cross-icon"
  >
    <path
      fill="currentColor"
      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
      clip-rule="evenodd"
      fill-rule="evenodd"
    ></path>
  </svg>
</div>

`
    document.body.appendChild(alert);

    setTimeout(() => {
        const errorCard = document.getElementById('errorCard');
        errorCard.classList.add('back-show');
    }, 4000);
    setTimeout(() => {
        document.body.removeChild(alert);
    }, 6000);
}