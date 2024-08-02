function registerUser() {
    const fullname = document.getElementById('fullname').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const telephone = document.getElementById('telephone').value;
    const gender = document.getElementById('gender').value;
    const password = document.getElementById('password').value;

    if (fullname && username && email && telephone && gender && password) {
        const user = {
            id: Date.now(),
            fullname,
            username,
            email,
            telephone,
            gender,
            password,
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if username or email already exists
        const userExists = users.some(u => u.username === username || u.email === email);
        if (userExists) {
            alert('Username or email already exists.');
            return;
        }

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = '../Home Page Layout/home.html';
    } else {
        alert('All fields are required!!');
    }
}

function loginUser() {
    const loginusername = document.getElementById('loginusername').value;
    const loginpassword = document.getElementById('loginpassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.username === loginusername && u.password === loginpassword);

    if (user) {
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = "../Home Page Layout/home.html";
    } else {
        alert('Invalid Credentials');
        window.location.href = 'Register.html';
    }
}

function validateRegisterForm() {
    const fullname = document.getElementById('fullname').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const telephone = document.getElementById('telephone').value;
    const gender = document.getElementById('gender').value;
    const password = document.getElementById('password').value;

    if (!fullname || !username || !email || !telephone || !gender || !password) {
        alert('All fields are required!!');
        return false;
    }

    if (!/^[a-zA-Z ]+$/.test(fullname)) {
        alert('Full Name must contain only letters and spaces.');
        return false;
    }

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        alert('Username must contain only alphanumeric characters.');
        return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Invalid email format.');
        return false;
    }

    if (!/^\d+$/.test(telephone)) {
        alert('Telephone must contain only numbers.');
        return false;
    }

    if (!['male', 'female', 'other'].includes(gender.toLowerCase())) {
        alert('Gender must be Male, Female, or Other.');
        return false;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
    }

    registerUser();
    return false;
}

function validateLoginForm() {
    const loginusername = document.getElementById('loginusername').value;
    const loginpassword = document.getElementById('loginpassword').value;

    if (!loginusername || !loginpassword) {
        alert('All fields are required!!');
        return false;
    }

    loginUser();
    return false;
}

function loginUser() {
    const loginusername = document.getElementById('loginusername').value;
    const loginpassword = document.getElementById('loginpassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.username === loginusername && u.password === loginpassword);

    if (user) {
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('loginTime', Date.now());
        sessionStorage.setItem('currentUser', loginusername);
        window.location.href = "LoggedIn.html";
    } else {
        alert('Invalid Credentials');
        window.location.href = 'Register.html';
    }
}

function logoutUser() {
    const loginTime = sessionStorage.getItem('loginTime');
    const logoutTime = Date.now();
    const timeSpent = (logoutTime - loginTime) / 60000; 

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = sessionStorage.getItem('currentUser');
    users = users.map(user => {
        if (user.username === currentUser) {
            user.timeSpent = (user.timeSpent || 0) + timeSpent;
        }
        return user;
    });
    localStorage.setItem('users', JSON.stringify(users));
    
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('loginTime');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'Register.html';
}

document.getElementById('logout').addEventListener('click', logoutUser);

/* 
    TODO
    - Add time spent to each user
    - Add logout button to the logout page(make it)
*/