const API_URL = window.location.origin;

const registerForm = document.querySelector('.auth-form');
const nameInput = document.getElementById('name');
const cpfInput = document.getElementById('cpf');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const termsCheckbox = document.getElementById('terms');
const submitButton = registerForm.querySelector('.btn-primary');

// Função para mostrar mensagem de erro
function showError(message) {
    const oldAlert = document.querySelector('.alert');
    if (oldAlert) oldAlert.remove();

    const alert = document.createElement('div');
    alert.className = 'alert alert-error';
    alert.textContent = message;
    registerForm.insertBefore(alert, registerForm.firstChild);

    setTimeout(() => alert.remove(), 5000);
}

// Função para mostrar mensagem de sucesso
function showSuccess(message) {
    const oldAlert = document.querySelector('.alert');
    if (oldAlert) oldAlert.remove();

    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.textContent = message;
    registerForm.insertBefore(alert, registerForm.firstChild);
}

// Função para validar email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validação básica de CPF (verifica 11 dígitos)
function isValidCPF(cpf) {
    const digits = (cpf || '').replace(/\D/g, '');
    return digits.length === 11;
}

// Função para registrar usuário
async function handleRegister(e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const cpf = cpfInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validações
    if (!name || !cpf || !email || !password || !confirmPassword) {
        showError('Por favor, preencha todos os campos');
        return;
    }

    if (name.length < 3) {
        showError('Nome deve ter no mínimo 3 caracteres');
        return;
    }

    if (!isValidCPF(cpf)) {
        showError('CPF inválido. Insira 11 dígitos ou no formato 000.000.000-00');
        return;
    }

    if (!isValidEmail(email)) {
        showError('Email inválido');
        return;
    }

    if (password.length < 8) {
        showError('Senha deve ter no mínimo 8 caracteres');
        return;
    }

    if (password !== confirmPassword) {
        showError('As senhas não coincidem');
        return;
    }

    if (!termsCheckbox.checked) {
        showError('Você deve aceitar os termos de uso');
        return;
    }

    // Desabilitar botão durante requisição
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Criando conta...';

    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, cpf, email, password })
        });

        const data = await response.json();

        if (data.success) {
            // Salvar token e dados do usuário
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            showSuccess(data.message);

            // Redirecionar após 1.5 segundos
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 1500);
        } else {
            if (data.errors && data.errors.length > 0) {
                showError(data.errors[0].msg);
            } else {
                showError(data.message || 'Erro ao criar conta');
            }
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
registerForm.addEventListener('submit', handleRegister);

// Validação em tempo real da confirmação de senha
confirmPasswordInput.addEventListener('input', () => {
    if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.setCustomValidity('As senhas não coincidem');
    } else {
        confirmPasswordInput.setCustomValidity('');
    }
});

// Verificar se já está logado
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
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
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        });
    }
});