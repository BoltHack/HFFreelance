const ACCESS_TIMER_DURATION = 900000;
const homeId = localStorage.getItem('id');
const ref = localStorage.getItem('ref');
function accessStartTimer(duration) {
    const startTime = Date.now();
    const endTime = startTime + duration;

    localStorage.setItem('accessTokenEndTime', endTime);

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

            localStorage.setItem('token', token);

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

    localStorage.setItem('refreshTokenEndTime', endTime);

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

            localStorage.setItem('token', token);

            window.location.reload();

        } else {
            console.error('Ошибка', response.status);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}