function refs(){
    const refId = localStorage.getItem('id');
    const ref = localStorage.getItem('ref');
    if (window.location.pathname === '/PersonalArea'){
        if (ref !== 'refPersonalArea'){
            localStorage.setItem('ref', 'refPersonalArea');
            window.location.href = '/accessToken'
        }
    }
    if (window.location.pathname === `/sendReviews/${refId}`){
        if (ref !== 'refSendReviews'){
            localStorage.setItem('ref', 'refSendReviews');
            window.location.href = '/accessToken'
        }
    }
}
refs()
function ha() {
    const sectionLinks = document.querySelectorAll('.ha');
    sectionLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href').substring(1);

            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({behavior: 'smooth'});
            }
        });
    });
}
ha();

const section = document.getElementById('headerSection');
const back = document.getElementById('back');
const types = document.getElementById('types');
function header(){
    if (window.location.pathname === '/'){
        section.hidden = false;
        types.hidden = true;
    }
    else if (window.location.pathname === '/readyMadeSites' || window.location.pathname === '/readyMadeSites/html-css-js' || window.location.pathname === '/readyMadeSites/javascript' || window.location.pathname === '/readyMadeSites/fullstack' || window.location.pathname === '/readyMadeSites/nodeJs' || window.location.pathname === '/readyMadeSites/reactJs' || window.location.pathname === '/readyMadeSites/favorites'){
        section.hidden = true;
        types.hidden = false;
    }
    else{
        section.hidden = true;
        types.hidden = true;
        back.hidden = true;
    }
}
header();

function headerColor(){
    const allSites = document.getElementById('allSites');
    const htmlCssJs = document.getElementById('htmlCssJs');
    const javascript = document.getElementById('javascript');
    const fullstack = document.getElementById('fullstack');
    const nodeJs = document.getElementById('nodeJs');
    const reactJs = document.getElementById('reactJs');
    const favorites = document.getElementById('favorites');
    if (window.location.pathname === '/readyMadeSites'){
        allSites.style.color = '#a2a8d3'
        allSites.style.backgroundColor = '#ddd'
    }
    if (window.location.pathname === '/readyMadeSites/html-css-js'){
        htmlCssJs.style.color = '#a2a8d3'
        htmlCssJs.style.backgroundColor = '#ddd'
    }
    if (window.location.pathname === '/readyMadeSites/javascript'){
        javascript.style.color = '#a2a8d3'
        javascript.style.backgroundColor = '#ddd'
    }
    if (window.location.pathname === '/readyMadeSites/fullstack'){
        fullstack.style.color = '#a2a8d3'
        fullstack.style.backgroundColor = '#ddd'
    }
    if (window.location.pathname === '/readyMadeSites/nodeJs'){
        nodeJs.style.color = '#a2a8d3'
        nodeJs.style.backgroundColor = '#ddd'
    }
    if (window.location.pathname === '/readyMadeSites/reactJs'){
        reactJs.style.color = '#a2a8d3'
        reactJs.style.backgroundColor = '#ddd'
    }
    if (window.location.pathname === '/readyMadeSites/favorites'){
        favorites.style.color = '#a2a8d3'
    }
}
headerColor();

function favoritesJoin() {
    localStorage.setItem('ref', 'refFavorites');
    window.location.href = '/readyMadeSites/favorites';
}

function local(){
    const local = localStorage.getItem('local');
    if (!local){
        localStorage.setItem('local', 'en');
    }
}
local()

function goBack() {
    const id = localStorage.getItem('id');
    if (window.location.pathname === `/sendReviews/${id}` || window.location.pathname === '/PersonalArea') {
        window.history.back();
        window.history.back();
    } else {
        window.history.back();
    }
}