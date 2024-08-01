function validateAdminRegister() {
    const registerUsername = document.getElementById('registerUsername').value;
    const registerPassword = document.getElementById('registerPassword').value;

    if (registerUsername && registerPassword) {
        const adminCredentials = {
            username: registerUsername,
            password: registerPassword
        };

        localStorage.setItem('adminCredentials', JSON.stringify(adminCredentials));
        alert('Admin account created successfully. You can now log in.');
        window.location.href = 'admin-login.html';
    } else {
        alert('Both fields are required.');
    }

    return false; // Prevent the form from submitting normally
}
