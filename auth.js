if (typeof document !== 'undefined') {
document.addEventListener('DOMContentLoaded', () => {

    const isLoginPage = document.getElementById('login-card') !== null;

    if (!localStorage.getItem('weatherUsersDB')) {
        localStorage.setItem('weatherUsersDB', JSON.stringify([]));
    }

    if (isLoginPage) {
        initLoginPage();
    } else {
        initAppPage();
    }

    function initLoginPage() {
        const panels = {
            'login-panel': document.getElementById('login-panel'),
            'register-panel': document.getElementById('register-panel'),
            'forgot-panel': document.getElementById('forgot-panel')
        };
        const tabs = document.querySelectorAll('.card-tab');
        const loginMsg = document.getElementById('login-msg');
        const regMsg = document.getElementById('reg-msg');
        const forgotMsg = document.getElementById('forgot-msg');

        function showPanel(panelId) {
            Object.values(panels).forEach(p => { if (p) p.classList.add('hidden'); });
            if (panels[panelId]) panels[panelId].classList.remove('hidden');
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                showPanel(tab.dataset.target);
                clearMsg(loginMsg); clearMsg(regMsg); clearMsg(forgotMsg);
            });
        });

        document.querySelectorAll('.switch-link').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = document.getElementById(btn.dataset.tab);
                tabs.forEach(t => t.classList.remove('active'));
                if (targetTab) targetTab.classList.add('active');
                showPanel(btn.dataset.target);
                clearMsg(loginMsg); clearMsg(regMsg); clearMsg(forgotMsg);
            });
        });

        document.getElementById('forgot-btn')?.addEventListener('click', () => {
            showPanel('forgot-panel');
            tabs.forEach(t => t.classList.remove('active'));
            clearMsg(loginMsg); clearMsg(forgotMsg);
        });

        document.getElementById('back-to-login')?.addEventListener('click', () => {
            document.getElementById('tab-login')?.classList.add('active');
            document.getElementById('tab-register')?.classList.remove('active');
            showPanel('login-panel');
            clearMsg(forgotMsg);
        });

        document.getElementById('toggle-login-pw')?.addEventListener('click', () => togglePassword('login-password'));
        document.getElementById('toggle-reg-pw')?.addEventListener('click', () => togglePassword('reg-password'));

        document.getElementById('login-btn')?.addEventListener('click', () => {
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;

            if (!email || !password) {
                showMsg(loginMsg, 'Preencha e-mail e senha para continuar.', 'error');
                return;
            }

            const users = JSON.parse(localStorage.getItem('weatherUsersDB'));
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.replace('index.html');
            } else {
                showMsg(loginMsg, 'E-mail ou senha incorretos. Verifique seus dados.', 'error');
            }
        });

        document.getElementById('register-btn')?.addEventListener('click', () => {
            const nome = document.getElementById('reg-nome').value.trim();
            const username = document.getElementById('reg-username').value.trim().replace(/^@/, '');
            const data = document.getElementById('reg-data').value;
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;

            if (!nome || !username || !data || !email || !password) {
                showMsg(regMsg, 'Todos os campos são obrigatórios para criar sua conta.', 'error');
                return;
            }

            if (password.length < 6) {
                showMsg(regMsg, 'A senha precisa ter no mínimo 6 caracteres.', 'error');
                return;
            }

            const users = JSON.parse(localStorage.getItem('weatherUsersDB'));

            if (users.find(u => u.email === email)) {
                showMsg(regMsg, 'Já existe uma conta com este e-mail.', 'error');
                return;
            }
            if (users.find(u => u.username && u.username.toLowerCase() === username.toLowerCase())) {
                showMsg(regMsg, 'Este nome de usuário já está em uso.', 'error');
                return;
            }

            users.push({ nome, username, data, email, password });
            localStorage.setItem('weatherUsersDB', JSON.stringify(users));
            showMsg(regMsg, '🎉 Conta criada com sucesso! Redirecionando para o login...', 'success');

            setTimeout(() => {
                document.getElementById('tab-login')?.classList.add('active');
                document.getElementById('tab-register')?.classList.remove('active');
                showPanel('login-panel');
                document.getElementById('login-email').value = email;
                clearMsg(regMsg);
            }, 2000);
        });

        document.getElementById('forgot-btn-submit')?.addEventListener('click', () => {
            const email = document.getElementById('forgot-email').value.trim();
            if (!email) {
                showMsg(forgotMsg, 'Informe seu e-mail para buscar a conta.', 'error');
                return;
            }
            const users = JSON.parse(localStorage.getItem('weatherUsersDB'));
            const user = users.find(u => u.email === email);
            if (user) {
                showMsg(forgotMsg, `Conta encontrada!\nNome: ${user.nome}\nUsuário: @${user.username || '—'}\nSenha: ${user.password}`, 'info');
            } else {
                showMsg(forgotMsg, 'Nenhuma conta encontrada com este e-mail.', 'error');
            }
        });
    }

    function initAppPage() {
        const navbar = document.getElementById('main-navbar');
        if (!navbar) return;

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (!currentUser) {
            window.location.replace('login.html');
            return;
        }

        const greetingEl = document.getElementById('nav-greeting');
        const loginBtn = document.getElementById('nav-login-btn');
        const logoutBtn = document.getElementById('nav-logout-btn');
        const editBtn = document.getElementById('nav-edit-btn');

        if (greetingEl) {
            greetingEl.textContent = `Olá, ${currentUser.nome.split(' ')[0]}`;
            greetingEl.classList.remove('hidden');
        }
        if (loginBtn) loginBtn.classList.add('hidden');
        if (logoutBtn) logoutBtn.classList.remove('hidden');
        if (editBtn) editBtn.classList.remove('hidden');

        logoutBtn?.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.replace('login.html');
        });

        editBtn?.addEventListener('click', () => {
            const newName = prompt('Como prefere ser chamada?', currentUser.nome || '');
            if (newName && newName.trim()) {
                const user = JSON.parse(localStorage.getItem('currentUser'));
                user.nome = newName.trim();
                localStorage.setItem('currentUser', JSON.stringify(user));
                const users = JSON.parse(localStorage.getItem('weatherUsersDB'));
                const idx = users.findIndex(u => u.email === user.email);
                if (idx !== -1) { users[idx].nome = user.nome; localStorage.setItem('weatherUsersDB', JSON.stringify(users)); }
                if (greetingEl) greetingEl.textContent = `Olá, ${user.nome.split(' ')[0]}`;
            }
        });
    }

    function showMsg(el, msg, type) {
        if (!el) return;
        el.innerHTML = msg.replace(/\n/g, '<br>');
        el.className = `form-message msg-${type}`;
    }

    function clearMsg(el) {
        if (!el) return;
        el.textContent = '';
        el.className = 'form-message hidden';
    }

    function togglePassword(inputId) {
        const input = document.getElementById(inputId);
        if (!input) return;
        input.type = input.type === 'password' ? 'text' : 'password';
    }
});
}
