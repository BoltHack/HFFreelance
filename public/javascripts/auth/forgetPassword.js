document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.getElementById('emailForm');
    let emailInfo = {
        email: emailForm.elements['email'].value,
    };

    fetch(`/auth/send-email`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(emailInfo)
    })
        .then(response => {
            if (response.ok) {
                alert('test')
                successMenu('Код успешно отправлен')
            } else {
                response.text().then(errorMessage => {
                    errorMenu(errorMessage)
                });
            }
        })
        .catch(error => {
            dynamicMenu('Произошла ошибка при отправке запроса:', error);
            dynamicMenu("Произошла ошибка при отправке запроса: " + error.message);
        });
})

document.querySelectorAll('form').forEach(function(form) {
    form.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
});
