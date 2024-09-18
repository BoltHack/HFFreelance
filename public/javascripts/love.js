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
            const love = document.getElementById('love-'+siteId);
            const alreadyLove = document.getElementById('alreadyLove-'+siteId);

            const local = localStorage.getItem('local');

            let favorites = localStorage.getItem('favorites');

            if (favorites){
                favorites = JSON.parse(favorites)
            }
            else{
                favorites = [];
            }

            const favoritesIndex = favorites.findIndex(item => item.id === siteId)

            if(favoritesIndex === -1){
                favorites.push({id: siteId, title: siteTitle, type: siteType, img: siteImg })
            }

            love.hidden = true;
            alreadyLove.hidden = false;
            localStorage.setItem('favorites', JSON.stringify(favorites))
            if (local === 'en'){
                dynamicMenu(`${siteTitle} added to favorites!`)
            }
            else{
                dynamicMenu(`${siteTitle} добавлен в избранное!`)
            }
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

            const local = localStorage.getItem('local');

            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            const favoritesIndex = favorites.findIndex(item => item.id === siteId)

            if(favoritesIndex !== -1){
                favorites.splice(favoritesIndex, 1);
            }

            love.hidden = false;
            alreadyLove.hidden = true;
            localStorage.setItem('favorites', JSON.stringify(favorites))
            if (local === 'en'){
                dynamicMenu(`${siteTitle} removed from favorites!`)
            }
            else{
                dynamicMenu(`${siteTitle} удалён из избранного!`)
            }
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