async function allPaths() {
    const paths = {
        '/': 'refMain',
        '/moreDetails': 'refMoreDetails',
        '/allReviews': 'refAllReviews',
        '/aboutUs': 'refAboutUs',
        '/rules': 'refRules',
        '/privacyPolicy': 'refPrivacyPolicy',
        '/PersonalArea': 'refPersonalArea',
        '/readyMadeSites': 'refReadyMadeSites',
        '/readyMadeSites/html-css-js': 'refHtmlCssJs',
        '/readyMadeSites/javascript': 'refJavascript',
        '/readyMadeSites/nodeJs': 'refNodeJs',
        '/readyMadeSites/reactJs': 'refReactJs',
        '/readyMadeSites/fullstack': 'refFullstack',
        '/readyMadeSites/favorites': 'refFavorites',
    };

    const pathname = window.location.pathname;
    if (pathname in paths) {
        localStorage.setItem('ref', paths[pathname]);
        await getNewToken()
    } else if (pathname.startsWith('/sendReviews/')) {
        localStorage.setItem('ref', 'refSendReviews');
    }
}

allPaths();

async function getNewToken() {
    try {
        const response = await fetch('/accessToken', {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            const {token} = data;

            if (!token) {
                console.log('Токен не найден')
                return;
            }

            localStorage.setItem('token', token);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function htmlCssJs(){
    localStorage.setItem('ref', 'refHtmlCssJs');
    window.location.href = '/accessToken';
}
function javascript(){
    localStorage.setItem('ref', 'refJavascript');
    window.location.href = '/accessToken';
}
function nodeJs(){
    localStorage.setItem('ref', 'refNodeJs');
    window.location.href = '/accessToken';
}
function reactJs(){
    localStorage.setItem('ref', 'refReactJs');
    window.location.href = '/accessToken';
}
function fullstack(){
    localStorage.setItem('ref', 'refFullstack');
    window.location.href = '/accessToken';
}
function allSites(){
    localStorage.setItem('ref', 'refReadyMadeSites');
    window.location.href = '/accessToken';
}

// function checkOnline(){
//     const fileId = localStorage.getItem('fileInfo');
//     const id = localStorage.getItem('id');
//     const pathName = window.location.pathname;
//     const session = localStorage.getItem('session');
//     const paths = {
//         main: '/',
//         moreDetails: '/moreDetails',
//         allReviews: '/allReviews',
//         aboutUs: '/aboutUs',
//         rules: '/rules',
//         sendReviews: `/sendReviews/${id}`,
//         privacyPolicy: '/privacyPolicy',
//         PersonalArea: '/PersonalArea',
//         readyMadeSites: '/readyMadeSites',
//         htmlCssJs: '/readyMadeSites/html-css-js',
//         javascript: '/readyMadeSites/javascript',
//         nodeJs: '/readyMadeSites/nodeJs',
//         reactJs: '/readyMadeSites/reactJs',
//         fullstack: '/readyMadeSites/fullstack',
//         fileInfo: `/fileInfo/${fileId}`
//     };
//     if (session === 'false'){
//         if (Object.values(paths).includes(pathName)){
//             localStorage.setItem('offline', 'true');
//             alert('logout');
//         }
//         else{
//             // window.addEventListener('beforeunload', function () {
//                 console.log('gfhfdgdfgdfgdfgd')
//                 localStorage.setItem('offline', 'false');
//             // });
//         }
//     }
// }


// window.addEventListener('unload', function () {
//     const id = localStorage.getItem('id');
//     const fileId = localStorage.getItem('fileInfo');
//     const pathName = window.location.pathname;
//     const paths = {
//         main: '/',
//         moreDetails: '/moreDetails',
//         allReviews: '/allReviews',
//         aboutUs: '/aboutUs',
//         rules: '/rules',
//         sendReviews: `/sendReviews/${id}`,
//         privacyPolicy: '/privacyPolicy',
//         PersonalArea: '/PersonalArea',
//         readyMadeSites: '/readyMadeSites',
//         htmlCssJs: '/readyMadeSites/html-css-js',
//         javascript: '/readyMadeSites/javascript',
//         nodeJs: '/readyMadeSites/nodeJs',
//         reactJs: '/readyMadeSites/reactJs',
//         fullstack: '/readyMadeSites/fullstack',
//         fileInfo: `/fileInfo/${fileId}`
//     };
//
//     const matchingPath = Object.values(paths).find(path => path === pathName);
//     const session = localStorage.getItem('session');
//     if (session === 'false') {
//         if (!matchingPath){
//             localStorage.removeItem('name');
//         }
//     }
// });