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

document.getElementById('htmlCssJs').addEventListener('click', () => {
    localStorage.setItem('ref', 'refHtmlCssJs');
    window.location.href = '/accessToken';
})

function redirections(){
    document.getElementById('htmlCssJs').addEventListener('click', () => {
        localStorage.setItem('ref', 'refHtmlCssJs');
        window.location.href = '/accessToken';
    })
    document.getElementById('javascript').addEventListener('click', () => {
        localStorage.setItem('ref', 'refJavascript');
        window.location.href = '/accessToken';
    })
    document.getElementById('nodeJs').addEventListener('click', () => {
        localStorage.setItem('ref', 'refNodeJs');
        window.location.href = '/accessToken';
    })
    document.getElementById('reactJs').addEventListener('click', () => {
        localStorage.setItem('ref', 'refReactJs');
        window.location.href = '/accessToken';
    })
    document.getElementById('fullstack').addEventListener('click', () => {
        localStorage.setItem('ref', 'refFullstack');
        window.location.href = '/accessToken';
    })
    document.getElementById('allSites').addEventListener('click', () => {
        localStorage.setItem('ref', 'refReadyMadeSites');
        window.location.href = '/accessToken';
    })
}
redirections();