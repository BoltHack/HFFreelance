function profileMenu(){
    const profileMenu = document.getElementById('profileMenu');
    const favoritesMenu = document.getElementById('favoritesMenu');

    const profileReview = document.getElementById('profileReview');
    const profileFavorites = document.getElementById('profileFavorites');

    profileMenu.addEventListener('click', () => {
        profileMenu.style.backgroundColor = '#34495e'
        favoritesMenu.style.background = 'none'
        profileFavorites.hidden = true;
        profileReview.hidden = false;
        const menus = JSON.parse(localStorage.getItem('menus') || '{}');
        menus.userPersonalAreaMenu = 'profile';
        localStorage.setItem('menus', JSON.stringify(menus));
    })
    favoritesMenu.addEventListener('click', () => {
        favoritesMenu.style.backgroundColor = '#34495e'
        profileMenu.style.background = 'none'
        profileReview.hidden = true;
        profileFavorites.hidden = false;
        const menus = JSON.parse(localStorage.getItem('menus') || '{}');
        menus.userPersonalAreaMenu = 'favorites';
        localStorage.setItem('menus', JSON.stringify(menus));
    })
    const userPersonalAreaMenu = JSON.parse(localStorage.getItem('menus') || '{}');
    if (userPersonalAreaMenu.userPersonalAreaMenu === 'profile'){
        profileMenu.style.backgroundColor = '#34495e'
        favoritesMenu.style.background = 'none'
        profileFavorites.hidden = true;
        profileReview.hidden = false;
    }
    else{
        favoritesMenu.style.backgroundColor = '#34495e'
        profileMenu.style.background = 'none'
        profileReview.hidden = true;
        profileFavorites.hidden = false;
    }
}
profileMenu()