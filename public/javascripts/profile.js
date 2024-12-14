document.getElementById('togglePassword1').addEventListener('click', function () {
    const togglePassword1 = document.getElementById('togglePassword1');
    const togglePassword2 = document.getElementById('togglePassword2');
    let oldPasswordField = document.getElementById('oldPwd');
    let passwordField = document.getElementById('pwd');
    let confirmPasswordField = document.getElementById('cpwd');
    let passwordFieldType = passwordField.getAttribute('type');
    togglePassword1.addEventListener('click', function () {
        if (passwordFieldType === 'password') {
            oldPasswordField.setAttribute('type', 'text');
            passwordField.setAttribute('type', 'text');
            confirmPasswordField.setAttribute('type', 'text');
            togglePassword2.hidden = false;
            togglePassword1.hidden = true;
        }
    })
    togglePassword2.addEventListener('click', function () {
        if (passwordFieldType === 'password') {
            oldPasswordField.setAttribute('type', 'password');
            passwordField.setAttribute('type', 'password');
            confirmPasswordField.setAttribute('type', 'password');
            togglePassword2.hidden = true;
            togglePassword1.hidden = false;
        }
    });
});

function profilePerms(){
    let profileImg = document.getElementById('userImage');
    let userImageEdit = document.getElementById('userImageEdit');
    let homeId = idUser;

    let editImageBtn = document.getElementById('editImageBtn');
    let attachFile = document.getElementById('attachFile');
    let editImagePart = document.getElementById('editImagePart');
    let changeBtn = document.getElementById('changeBtn');
    let cancelChangeBtn = document.getElementById('cancelChangeBtn');

    let changePasswordBtn = document.getElementById('changePasswordBtn');
    let changePassword = document.getElementById('changePassword');
    let zoomImage = document.getElementById('zoomImage');
    let zoomImageDiv = document.getElementById('zoomImageDiv');

    const barrier = document.createElement('barrier');

    profileImg.addEventListener('click', () => {
        barrier.innerHTML = `<div class="new-barrier"></div>`;
        document.body.appendChild(barrier);
        zoomImageDiv.hidden = false;
    })

    changePasswordBtn.addEventListener('click', () => {
        barrier.innerHTML = `<div class="new-barrier"></div>`;
        document.body.appendChild(barrier);
        changePassword.hidden = false;
    })

    editImageBtn.addEventListener('click', () => {
        barrier.innerHTML = `<div class="new-barrier"></div>`;
        document.body.appendChild(barrier);
        editImagePart.hidden = false
    })

    barrier.addEventListener('click', () => {
        document.body.removeChild(barrier);
        editImageBtn.hidden = false;
        editImagePart.hidden = true;
        changePassword.hidden = true;
        zoomImageDiv.hidden = true;
    })

    cancelChangeBtn.addEventListener('click', () => {
        editImageBtn.hidden = false;
        editImagePart.hidden = true;
        document.body.removeChild(barrier);
        localStorage.setItem('profileImage', `data:image/png;base64,${imageUser}`);
    })

    attachFile.addEventListener('change', () => {
        let href = URL.createObjectURL(attachFile.files[0])
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
                    console.log('Изображение успешно сохранено!')
                    return response.json();
                } else {
                    console.log('Ошибка при загрузке изображения');
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
    let settingsMenu = document.getElementById('settingsMenu');

    let profile = document.getElementById('profile');
    let news = document.getElementById('news');
    let myReview = document.getElementById('myReview');
    let settings = document.getElementById('settings');

    profileMenu.addEventListener('click', () => {
        profileMenu.style.backgroundColor = '#34495e'
        newsMenu.style.background = 'none'
        settingsMenu.style.background = 'none'
        profile.hidden = false;
        myReview.hidden = false;
        news.hidden = true;
        settings.hidden = true;
        const menus = JSON.parse(localStorage.getItem('menus') || '{}');
        menus.personalAreaMenu = 'profile';
        localStorage.setItem('menus', JSON.stringify(menus));
    })

    newsMenu.addEventListener('click', () => {
        newsMenu.style.backgroundColor = '#34495e'
        profileMenu.style.background = 'none'
        settingsMenu.style.background = 'none'
        news.hidden = false;
        profile.hidden = true;
        myReview.hidden = true;
        settings.hidden = true;
        const menus = JSON.parse(localStorage.getItem('menus') || '{}');
        menus.personalAreaMenu = 'news';
        localStorage.setItem('menus', JSON.stringify(menus));
    })

    settingsMenu.addEventListener('click', () => {
        settingsMenu.style.backgroundColor = '#34495e'
        profileMenu.style.background = 'none'
        newsMenu.style.background = 'none'
        settings.hidden = false;
        news.hidden = true;
        profile.hidden = true;
        myReview.hidden = true;
        const menus = JSON.parse(localStorage.getItem('menus') || '{}');
        menus.personalAreaMenu = 'settings';
        localStorage.setItem('menus', JSON.stringify(menus));
    })
    const personalAreaMenu = JSON.parse(localStorage.getItem('menus') || '{}');
    if (personalAreaMenu.personalAreaMenu === 'news'){
        newsMenu.style.backgroundColor = '#34495e'
        profileMenu.style.background = 'none'
        news.hidden = false;
        profile.hidden = true;
        myReview.hidden = true;
    }
    else if (personalAreaMenu.personalAreaMenu === 'settings'){
        settingsMenu.style.backgroundColor = '#34495e'
        profileMenu.style.background = 'none'
        newsMenu.style.background = 'none'
        settings.hidden = false;
        news.hidden = true;
        profile.hidden = true;
        myReview.hidden = true;
    }
    else{
        profileMenu.style.backgroundColor = '#34495e'
        newsMenu.style.background = 'none'
        profile.hidden = false;
        myReview.hidden = false;
        news.hidden = true;
    }
}
perms()

document.querySelectorAll('form').forEach(function(form) {
    form.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
});


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
                    console.log("Ошибка: " + errorMessage);
                });
            }
        })
        .catch(error => {
            dynamicMenu('Произошла ошибка при отправке запроса:', error);
            dynamicMenu("Произошла ошибка при отправке запроса: " + error.message);
        });
}

// document.getElementById('changePasswordBtn').addEventListener(function () {
// function changePassword(){
//     const homeId = idUser;
//     fetch(`/changePassword/${homeId}`,{
//         method: "POST",
//         headers: {
//             'Authorization': 'Bearer ' + localStorage.getItem("token")
//         },
//     })
//         .then(response => {
//             if(response.ok){
//                 localStorage.setItem('ref', 'refPersonalArea');
//                 window.location.href = '/accessToken';
//             } else {
//                 throw new Error('Ошибка при смене пароля');
//             }
//         })
//         .catch(error => {
//             console.error('Ошибка:', error);
//         });
// }


