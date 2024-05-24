document.addEventListener('DOMContentLoaded', function() {
    // ---- INDEX ----
    const userNameSpan = document.getElementById('user-name');
    const logoutBtnWrapper = document.getElementById('logoutBtnWrapper');
    const logoutBtnIndex = document.getElementById('logoutBtn');
    const loginLink = document.getElementById('loginLink');

    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (user) {
        if (userNameSpan) {
            userNameSpan.textContent = user.name || user.email; // Exibir o nome do usuário se disponível, caso contrário, exibir o email
            logoutBtnWrapper.style.display = 'block'; // Mostrar botão de logout
            loginLink.style.display = 'none'; // Esconder link de login
        }
    }

    if (logoutBtnIndex) {
        logoutBtnIndex.addEventListener('click', function() {
            sessionStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        });
    }

    // ---- LOGIN ----
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const logoutBtn = document.getElementById('logout-btn');

    // Simulação de um "banco de dados" com localStorage
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([
            {
                email: 'usuario@example.com',
                password: '123456',
                name: 'Daniel'
            },
            {
                email: 'robert@email.com',
                password: '1234',
                name: 'Robert'
            }
        ]));
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;
        const users = JSON.parse(localStorage.getItem('users'));

        // Ajustando a validação para o novo email e senha
        const validUser = users.find(user => user.email === email && user.password === password);

        if (validUser) {
            successMessage.textContent = 'Login realizado com sucesso!';
            errorMessage.textContent = '';
            sessionStorage.setItem('loggedInUser', JSON.stringify(validUser));
            logoutBtn.style.display = 'block'; // Mostrar botão "Sair da Conta"
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            errorMessage.textContent = 'Email ou senha incorretos. Por favor, tente novamente.';
            successMessage.textContent = '';
            logoutBtn.style.display = 'none'; // Esconder botão "Sair da Conta"
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('loggedInUser');
            logoutBtn.style.display = 'none'; // Esconder botão "Sair da Conta"
        });
    }
});
