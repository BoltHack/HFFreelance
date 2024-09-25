document.addEventListener('DOMContentLoaded', () => {
    const loveButton = document.querySelectorAll('.love');
    const alreadyLove = document.querySelectorAll('.alreadyLove');

    function checkLoveState() {
        loveButton.forEach(button => {
            const siteId = button.getAttribute('data-id');
            const love = document.getElementById('love-' + siteId);
            const alreadyLove = document.getElementById('alreadyLove-' + siteId);

            let favorites = localStorage.getItem('favorites');
            if (favorites) {
                favorites = JSON.parse(favorites);
                const favoritesIndex = favorites.findIndex(item => item.id === siteId);
                if (favoritesIndex !== -1) {
                    love.hidden = true;
                    alreadyLove.hidden = false;
                } else {
                    love.hidden = false;
                    alreadyLove.hidden = true;
                }
            } else {
                love.style.display = '';
                alreadyLove.hidden = true;
            }
        });
    }

    loveButton.forEach(button => {
        button.addEventListener('click', function() {
            const siteId = this.getAttribute('data-id');
            const siteTitle = this.getAttribute('data-title');
            const siteType = this.getAttribute('data-type');
            const siteImg = this.getAttribute('data-img');
            const love = document.getElementById('love-' + siteId);
            const alreadyLove = document.getElementById('alreadyLove-' + siteId);
            const load = document.getElementById('load-' + siteId);

            load.hidden = false;
            love.hidden = true;

            fetch(`/likeSite/${siteId}`, {
                method: "POST",
            })
                .then(response => {
                    if (response.ok) {
                        alreadyLove.hidden = false;
                        love.hidden = true;
                        load.hidden = true;

                        let favorites = localStorage.getItem('favorites');

                        if (favorites) {
                            try {
                                favorites = JSON.parse(favorites);
                            } catch (e) {
                                favorites = [];
                            }
                        } else {
                            favorites = [];
                        }

                        const favoritesIndex = favorites.findIndex(item => item.id === siteId);

                        if (favoritesIndex === -1) {
                            favorites.push({ id: siteId, title: siteTitle, type: siteType, img: siteImg });
                        }

                        localStorage.setItem('favorites', JSON.stringify(favorites));

                        const message = local === 'en' ? `${siteTitle} added to favorites!` : `${siteTitle} добавлен в избранное!`;
                        dynamicMenu(message);
                    } else {
                        response.text().then(errorMessage => {
                            console.log("Ошибка: " + errorMessage);
                        });
                    }
                })
                .catch(error => {
                    dynamicMenu("Произошла ошибка при отправке запроса: " + error.message);
                });

        });
    });
    checkLoveState();

    alreadyLove.forEach(button => {
        button.addEventListener('click', function (){
            const siteId = this.getAttribute('data-id');
            const siteTitle = this.getAttribute('data-title');
            const siteType = this.getAttribute('data-type');
            const siteImg = this.getAttribute('data-img');
            const love = document.getElementById('love-'+siteId);
            const alreadyLove = document.getElementById('alreadyLove-'+siteId);
            const load = document.getElementById('load-' + siteId);

            load.hidden = false;
            alreadyLove.hidden = true;

            fetch(`/dislikeSite/${siteId}`, {
                method: "POST",
            })
                .then(response => {
                    if (response.ok) {
                        love.hidden = false;
                        alreadyLove.hidden = true;
                        load.hidden = true;
                        const local = localStorage.getItem('local');

                        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                        const favoritesIndex = favorites.findIndex(item => item.id === siteId)

                        if(favoritesIndex !== -1){
                            favorites.splice(favoritesIndex, 1);
                        }

                        localStorage.setItem('favorites', JSON.stringify(favorites))
                        const message = local === 'ru' ? 'siteTitle удалён из избранного!' : 'siteTitle removed from favorites!'
                            dynamicMenu(message)
                    } else {
                        response.text().then(errorMessage => {
                            console.log("Ошибка: " + errorMessage);
                        });
                    }
                })
                .catch(error => {
                    dynamicMenu("Произошла ошибка при отправке запроса: " + error.message);
                });

        });
    });
    checkLoveState();
});

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