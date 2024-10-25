const ACCESS_TIMER_DURATION = 900000;
const token = localStorage.getItem('token');

const ref = localStorage.getItem('ref');
function accessStartTimer(duration) {
    const startTime = Date.now();
    const endTime = startTime + duration;

    if (token){
        localStorage.setItem('accessTokenEndTime', endTime);
    }

    accessUpdateTimer();
}

function accessUpdateTimer() {
    const endTime = parseInt(localStorage.getItem('accessTokenEndTime'), 10);

    const interval = setInterval(() => {
        const currentTime = Date.now();
        const remainingTime = endTime - currentTime;

        if (remainingTime <= 0) {
            clearInterval(interval);
            getAccessTokens()
            localStorage.removeItem('accessTokenEndTime');
        }
    }, 1000);
}

const accessStoredEndTime = localStorage.getItem('accessTokenEndTime');

if (accessStoredEndTime) {
    accessUpdateTimer();
} else {
    accessStartTimer(ACCESS_TIMER_DURATION);
}


async function getAccessTokens() {
    try {
        const response = await fetch('/accessToken', {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            const { token } = data;

            if(!token) {
                console.log('Токен не найден')
                return;
            }

            if (token){
                localStorage.setItem('token', token);
            }

            window.location.reload();

        } else {
            console.error('Ошибка', response.status);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}






const REFRESH_TIMER_DURATION = 864000000;
function refreshStartTimer(duration) {
    const startTime = Date.now();
    const endTime = startTime + duration;

    if (token) {
        localStorage.setItem('refreshTokenEndTime', endTime);
    }

    refreshUpdateTimer();
}

function refreshUpdateTimer() {
    const endTime = parseInt(localStorage.getItem('refreshTokenEndTime'), 10);

    const interval = setInterval(() => {
        const currentTime = Date.now();
        const remainingTime = endTime - currentTime;

        if (remainingTime <= 0) {
            clearInterval(interval);
            getRefreshTokens()
            localStorage.removeItem('refreshTokenEndTime');
        }
    }, 1000);
}

const refreshStoredEndTime = localStorage.getItem('refreshTokenEndTime');

if (refreshStoredEndTime) {
    refreshUpdateTimer();
} else {
    refreshStartTimer(REFRESH_TIMER_DURATION);
}


async function getRefreshTokens() {
    try {
        const response = await fetch('/refreshToken', {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            const { token } = data;

            if(!token) {
                console.log('Токен не найден')
                return;
            }

            if (token){
                localStorage.setItem('token', token);
            }

            window.location.reload();

        } else {
            console.error('Ошибка', response.status);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}










const SESSION_TIMER_DURATION = 86400000;
const session = localStorage.getItem('session');
function sessionTimerStart(duration) {
    const startTime = Date.now();
    const endTime = startTime + duration;

    if (session === 'false' && token) {
        localStorage.setItem('sessionEndTime', endTime);
    }

    sessionUpdateTimer();
}

function sessionUpdateTimer() {
    const endTime = parseInt(localStorage.getItem('sessionEndTime'), 10);

    const interval = setInterval(() => {
        const currentTime = Date.now();
        const remainingTime = endTime - currentTime;

        if (remainingTime <= 0) {
            clearInterval(interval);
            sessionLogout();
            localStorage.removeItem('sessionEndTime');
        }
    }, 1000);
}

const sessionEndTime = localStorage.getItem('sessionEndTime');

if (sessionEndTime) {
    sessionUpdateTimer();
} else {
    sessionTimerStart(SESSION_TIMER_DURATION);
}


function sessionLogout() {
    fetch('/auth/logout', {
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(res => res.json()).then((res) => {
        const {status, error} = res;
        if (error) {
            return;
        }

        if (status) {
            localStorage.removeItem('id');
            localStorage.removeItem('profileImage');
            localStorage.removeItem('accessTokenEndTime');
            localStorage.removeItem('name');
            localStorage.removeItem('refreshTokenEndTime');
            localStorage.removeItem('token');
            localStorage.removeItem('ref');
            localStorage.removeItem('favorites');
            window.location.href = "/auth/sessionExpired";
            return;
        }
    });
}