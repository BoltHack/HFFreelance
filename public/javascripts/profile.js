
document.getElementById('togglePassword1').addEventListener('click', function () {
    let passwordField = document.getElementById('pwd');
    let cPasswordField = document.getElementById('cpwd');
    let oldPasswordField = document.getElementById('oldPwd');
    let passwordFieldType = passwordField.getAttribute('type');
    if (passwordFieldType === 'password') {
        passwordField.setAttribute('type', 'text');
        cPasswordField.setAttribute('type', 'text');
        oldPasswordField.setAttribute('type', 'text');
        this.innerHTML = '&#128065;';
    } else {
        passwordField.setAttribute('type', 'password');
        cPasswordField.setAttribute('type', 'password');
        oldPasswordField.setAttribute('type', 'password');
        this.innerHTML = '&#128065;';
    }
});

function profilePerms(){
    let profileImg = document.getElementById('userImage')
    let userImageEdit = document.getElementById('userImageEdit')
    let homeId = idUser;

    let editImageBtn = document.getElementById('editImageBtn');
    let attachFile = document.getElementById('attachFile');
    let editImagePart = document.getElementById('editImagePart');
    let changeBtn = document.getElementById('changeBtn');
    let cancelChangeBtn = document.getElementById('cancelChangeBtn');

    let changePasswordBtn = document.getElementById('changePasswordBtn');
    let changePassword = document.getElementById('changePassword');

    const barrier = document.createElement('barrier');

    changePasswordBtn.addEventListener('click', () => {
        barrier.innerHTML = `<div class="new-barrier"></div>`;
        document.body.appendChild(barrier);
        changePassword.hidden = false;
    })

    editImageBtn.addEventListener('click', () => {
        barrier.innerHTML = `<div class="new-barrier"></div>`;
        document.body.appendChild(barrier);
        editImageBtn.hidden = true;
        editImagePart.hidden = false
    })

    barrier.addEventListener('click', () => {
        document.body.removeChild(barrier);
        editImageBtn.hidden = false;
        editImagePart.hidden = true;
        changePassword.hidden = true;
    })

    cancelChangeBtn.addEventListener('click', () => {
        editImageBtn.hidden = false;
        editImagePart.hidden = true;
        document.body.removeChild(barrier);
    })

    attachFile.addEventListener('change', () => {
        let href = URL.createObjectURL(attachFile.files[0])
        profileImg.src = href
        userImageEdit.src = href

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
                    localStorage.setItem('ref', 'refPersonalArea');
                    window.location.href = '/accessToken';
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
}
profilePerms();

function perms(){
    let profileMenu = document.getElementById('profileMenu');
    let newsMenu = document.getElementById('newsMenu');

    let profile = document.getElementById('profile');
    let news = document.getElementById('news');

    profileMenu.addEventListener('click', () => {
        profileMenu.style.backgroundColor = '#34495e'
        newsMenu.style.background = 'none'
        profile.hidden = false;
        news.hidden = true;
    })

    newsMenu.addEventListener('click', () => {
        newsMenu.style.backgroundColor = '#34495e'
        profileMenu.style.background = 'none'
        news.hidden = false;
        profile.hidden = true;
    })
}
perms()

function deleteAccount() {
    const homeId = idUser;
    fetch(`/deleteAccount/${homeId}`, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
    })
        .then(response => {
            if (response.ok) {
                localStorage.setItem('ref', 'refPersonalArea');
                window.location.href = '/accessToken';
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
    const homeId = idUser;
    fetch(`/deleteReview/${homeId}`, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
    })
        .then(response => {
            if (response.ok) {
                localStorage.setItem('ref', 'refPersonalArea');
                window.location.href = '/accessToken';
            } else {
                response.text().then(errorMessage => {
                    // dynamicMenu("Ошибка: " + errorMessage);
                });
            }
        })
        .catch(error => {
            dynamicMenu('Произошла ошибка при отправке запроса:', error);
            dynamicMenu("Произошла ошибка при отправке запроса: " + error.message);
        });
}

document.getElementById('changePasswordBtn').addEventListener(function () {
    const homeId = idUser;
    fetch(`/changePassword/${homeId}`,{
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
    })
        .then(response => {
            if(response.ok){
                localStorage.setItem('ref', 'refPersonalArea');
                window.location.href = '/accessToken';
            } else {
                throw new Error('Ошибка при смене пароля');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
})