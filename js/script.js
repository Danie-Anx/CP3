document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const message = document.getElementById('message');
    const logoutButton = document.getElementById('logoutButton');
    const userInfo = document.getElementById('userInfo');

    const users = [
        { email: 'user@example.com', password: 'password123', name: 'John Doe' },
        { email: 'admin@example.com', password: 'admin123', name: 'Admin User' }
    ];

    function showMessage(msg, isError) {
        message.textContent = msg;
        message.style.color = isError ? 'red' : 'green';
        setTimeout(() => {
            message.textContent = '';
        }, 5000);
    }

    loginForm?.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
            showMessage('Login bem-sucedido!', false);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 5000);
        } else {
            showMessage('Email ou senha inválidos.', true);
        }
    });

    if (userInfo) {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            userInfo.textContent = `Bem-vindo, ${user.name}! Seu email é ${user.email}.`;
        } else {
            window.location.href = 'login.html';
        }
    }

    logoutButton?.addEventListener('click', function() {
        sessionStorage.removeItem('user');
        window.location.href = 'login.html';
    });
});
