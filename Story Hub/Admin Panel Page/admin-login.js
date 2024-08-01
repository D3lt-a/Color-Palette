function validateAdminLogin() {
    const adminUsername = document.getElementById('adminUsername').value;
    const adminPassword = document.getElementById('adminPassword').value;

    const storedCredentials = JSON.parse(localStorage.getItem('adminCredentials')) || {};

    if (adminUsername === storedCredentials.username && adminPassword === storedCredentials.password) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'admin.html';
    } else {
        alert('Invalid admin credentials.');
    }

    return false; // Prevent the form from submitting normally
}
