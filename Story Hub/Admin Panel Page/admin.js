window.addEventListener('load', function () {
    if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
        alert('You must be logged in to view this page.');
        window.location.href = 'admin-login.html';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userCount = users.length;
    const totalTimeSpent = users.reduce((total, user) => total + (user.timeSpent || 0), 0);

    document.getElementById('userCount').textContent = userCount;
    document.getElementById('totalTime').textContent = totalTimeSpent.toFixed(2);

    const ctx = document.getElementById('userStatsChart').getContext('2d');
    const usernames = users.map(user => user.username);
    const timeSpent = users.map(user => user.timeSpent || 0);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: usernames,
            datasets: [{
                label: 'Time Spent (minutes)',
                data: timeSpent,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    document.getElementById('logout').addEventListener('click', function () {
        sessionStorage.removeItem('adminLoggedIn');
        window.location.href = 'admin-login.html';
    });
});
