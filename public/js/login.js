const API_URL = window.location.origin;

const loginForm = document.querySelector('.auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = loginForm.querySelector('.btn-primary');

// Função para mostrar mensagem de erro
function showError(message) {
    // Remove mensagens anteriores
    const oldAlert = document.querySelector('.alert');
    if (oldAlert) oldAlert.remove();

    const alert = document.createElement('div');
    alert.className = 'alert alert-error';
    alert.textContent = message;
    loginForm.insertBefore(alert, loginForm.firstChild);

    setTimeout(() => alert.remove(), 5000);
}

// Função para mostrar mensagem de sucesso
function showSuccess(message) {
    const oldAlert = document.querySelector('.alert');
    if (oldAlert) oldAlert.remove();

    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.textContent = message;
    loginForm.insertBefore(alert, loginForm.firstChild);
}

// Função para fazer login
async function handleLogin(e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    // Validações
    if (!email || !password) {
        showError('Por favor, preencha todos os campos');
        return;
    }

    // Desabilitar botão durante requisição
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Entrando...';

    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            // Salvar token e dados do usuário
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            showSuccess(data.message);

            // Redirecionar após 1 segundo
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 1000);
        } else {
            showError(data.message || 'Erro ao fazer login');
        }

    } catch (error) {
        console.error('Erro:', error);
        showError('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
    } finally {
        // Reabilitar botão
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        submitButton.textContent = originalText;
    }
}

// Event Listeners
loginForm.addEventListener('submit', handleLogin);

// Verificar se já está logado
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
        // Verificar se token é válido
        fetch(`${API_URL}/api/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/dashboard.html';
            }
        })
        .catch(() => {
            // Token inválido, limpar storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        });
    }
});

