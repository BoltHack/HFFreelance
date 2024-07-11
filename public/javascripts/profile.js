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

const profileImg = document.getElementById('userImage');
// const profileImg = document.querySelector('.profile-pic')
const homeId = idUser
const email = localStorage.getItem('email');

let editImageBtn = document.querySelector('#editImageBtn');
let attachFile = document.querySelector('#attachFile');
let editImagePart = document.querySelector('#editImagePart');
let changeBtn = document.querySelector('#changeBtn');
let cancelChangeBtn = document.querySelector('#cancelChangeBtn');

editImageBtn.addEventListener('click', () => {
    editImageBtn.hidden = true;
    editImagePart.hidden = false
})

cancelChangeBtn.addEventListener('click', () => {
    editImageBtn.hidden = false;
    editImagePart.hidden = true;
})

attachFile.addEventListener('change', () => {
    let href = URL.createObjectURL(attachFile.files[0])
    profileImg.src = href

    const reader = new FileReader();
    reader.readAsDataURL(attachFile.files[0]);
    reader.onload = function () {
        const imageDataUrl = reader.result;
        localStorage.setItem('profileImage', imageDataUrl);
    };
})
changeBtn.addEventListener('click', () => {
    let formData = new FormData();
    const selectedFile = attachFile.files[0];

    if (!selectedFile) {
        return;
    }

    formData.append('image', selectedFile);

    fetch(`/upload/${homeId}`,{
        method: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: formData
    })
        .then(response => {
            if(response.ok){
                dynamicMenu('<p>Изображение успешно сохранено!</p>')
                return response.json();
            } else {
                dynamicMenu('<p>Ошибка при загрузке изображения</p>');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
})

setInterval(function (){
    getNewTokens()
}, 840000)
async function getNewTokens() {
    try {
        const response = await fetch('/refreshToken', {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            const { token } = data;

            if(!token) {
                console.log('Токен не найден')
                return;
            }

            localStorage.setItem('token', token);

            window.location.href = '/PersonalArea';
        } else {
            console.error('Failed to refresh token', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

let profileMenu = document.getElementById('profileMenu');
// let changePasswordMenu = document.getElementById('changePasswordMenu');
let newsMenu = document.getElementById('newsMenu');

let profile = document.getElementById('profile');
let changePassword = document.getElementById('changePassword');
let news = document.getElementById('news');

profileMenu.addEventListener('click', () => {
    profileMenu.style.backgroundColor = '#34495e'
    // changePasswordMenu.style.background = 'none'
    newsMenu.style.background = 'none'
    profile.hidden = false;
    changePassword.hidden = false;
    news.hidden = true;
    document.body.style.overflowY = 'hidden'
})

// changePasswordMenu.addEventListener('click', () => {
//     changePasswordMenu.style.backgroundColor = '#34495e'
//     profileMenu.style.background = 'none'
//     newsMenu.style.background = 'none'
//     changePassword.hidden = false;
//     profile.hidden = true;
//     news.hidden = true;
//     document.body.style.overflowY = 'hidden'
// })

newsMenu.addEventListener('click', () => {
    newsMenu.style.backgroundColor = '#34495e'
    // changePasswordMenu.style.background = 'none'
    profileMenu.style.background = 'none'
    news.hidden = false;
    changePassword.hidden = true;
    profile.hidden = true;
    document.body.style.overflowY = 'auto'
})

function deleteAccount() {
    fetch(`/deleteAccount/${homeId}`, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
    })
        .then(response => {
            if (response.ok) {
                localStorage.clear();
                window.location.href = '/auth/register';
            } else {
                response.text().then(errorMessage => {
                    dynamicMenu("Ошибка при удалении учетной записи: " + errorMessage);
                });
            }
        })
        .catch(error => {
            dynamicMenu('Произошла ошибка при отправке запроса:', error);
            dynamicMenu("Произошла ошибка при отправке запроса: " + error.message);
        });
}

function deleteReview() {
    fetch(`/deleteReview/${homeId}`, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
    })
        .then(response => {
            if (response.ok) {
                window.location.href = '/PersonalArea';
            } else {
                response.text().then(errorMessage => {
                    dynamicMenu("Ошибк: " + errorMessage);
                });
            }
        })
        .catch(error => {
            dynamicMenu('Произошла ошибка при отправке запроса:', error);
            dynamicMenu("Произошла ошибка при отправке запроса: " + error.message);
        });
}

document.getElementById('changePasswordBtn').addEventListener(function () {
    fetch(`/changePassword/${homeId}`,{
        method: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
    })
        .then(response => {
            if(response.ok){
                return window.location.href = '/refreshToken'
            } else {
                throw new Error('Ошибка при смене пароля');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
})