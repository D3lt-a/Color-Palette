function logout() {
    // Clear session storage and redirect to the homepage
    sessionStorage.clear();
    alert('You have been logged out.');
    window.location.href = 'home.html';
}

function cancelLogout() {
    // Redirect back to the previous page or user profile page
    window.location.href = 'home.html';
}

function login() {
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.username === loginUsername && u.password === loginPassword);

    if (user) {
        sessionStorage.setItem('currentUser', user.username);
        sessionStorage.setItem('currentUserProfile', JSON.stringify(user));
        alert('You have successfully logged in.');
        window.location.href = 'profile.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }

    return false; // Prevent form submission
}
