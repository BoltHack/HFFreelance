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
