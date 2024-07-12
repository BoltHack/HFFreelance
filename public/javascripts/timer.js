const TIMER_DURATION = 850000;
// const TIMER_DURATION = 5000;
function startTimer(duration) {
    const startTime = Date.now();
    const endTime = startTime + duration;

    localStorage.setItem('endTime', endTime);

    updateTimer();
}

function updateTimer() {
    const endTime = parseInt(localStorage.getItem('endTime'), 10);

    const interval = setInterval(() => {
        const currentTime = Date.now();
        const remainingTime = endTime - currentTime;

        if (remainingTime <= 0) {
            clearInterval(interval);
            getNewTokens()
            localStorage.removeItem('endTime');
        } else {
            const minutes = Math.floor(remainingTime / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);
            timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
}

const storedEndTime = localStorage.getItem('endTime');

if (storedEndTime) {
    updateTimer();
} else {
    startTimer(TIMER_DURATION);
}


const homeId = localStorage.getItem('id');
const ref = localStorage.getItem('ref');
async function getNewTokens() {
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
            console.error('Failed to refresh token', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}