/*JS index*/

document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');

    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (user) {
        document.getElementById('loginLink').style.display = 'none'; // Ocultar link de login
        logoutBtn.style.display = 'block'; // Mostrar botão de logout
    }

    logoutBtn.addEventListener('click', function() {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });
});





/*JS LOGIN*/

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const logoutBtn = document.getElementById('logout-btn');

    // Simulação de um "banco de dados" com localStorage
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([
            {
                email: 'usuario@example.com',
                password: '123456'
            }
        ]));
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;
        const users = JSON.parse(localStorage.getItem('users'));

        if (users) {
            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                successMessage.textContent = 'Login realizado com sucesso!';
                errorMessage.textContent = '';
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                logoutBtn.style.display = 'block'; // Mostrar botão "Sair da Conta"
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                errorMessage.textContent = 'Email ou senha incorretos. Por favor, tente novamente.';
                successMessage.textContent = '';
                logoutBtn.style.display = 'none'; // Esconder botão "Sair da Conta"
            }
        } else {
            console.error("Erro: Não foi possível acessar os dados do usuário.");
        }
    });


    logoutBtn.addEventListener('click', function() {
        sessionStorage.removeItem('loggedInUser');
        logoutBtn.style.display = 'none'; // Esconder botão "Sair da Conta"
    });
});
