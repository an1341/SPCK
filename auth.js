let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function switchAuthTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginBtn = document.getElementById('loginTabBtn');
  const regBtn = document.getElementById('registerTabBtn');

  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    loginBtn.className = "flex-1 py-2 font-bold text-center text-red-600 border-b-2 border-red-600";
    regBtn.className = "flex-1 py-2 font-bold text-center text-gray-400 border-b-2 border-transparent";
  } else {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    regBtn.className = "flex-1 py-2 font-bold text-center text-red-600 border-b-2 border-red-600";
    loginBtn.className = "flex-1 py-2 font-bold text-center text-gray-400 border-b-2 border-transparent";
  }
}

function handleRegister(e) {
  e.preventDefault();
  const fullName = document.getElementById('regFullName').value;
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;

  let users = JSON.parse(localStorage.getItem('usersList')) || [];
  if (users.some(u => u.username === username)) {
    alert('Tên đăng nhập này đã tồn tại!');
    return;
  }

  users.push({ username, password, fullName });
  localStorage.setItem('usersList', JSON.stringify(users));
  alert('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
  switchAuthTab('login');
}

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  let users = JSON.parse(localStorage.getItem('usersList')) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    renderUserSection();
    showPage('home');
    alert(`Xin chào ${user.fullName}! Bạn đã đăng nhập thành công.`);
  } else {
    alert('Tên đăng nhập hoặc mật khẩu không đúng!');
  }
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  renderUserSection();
  alert('Đã đăng xuất tài khoản.');
}

function renderUserSection() {
  const container = document.getElementById('userSection');
  if (currentUser) {
    container.innerHTML = `
      <div class="flex items-center gap-2">
        <i class="fa-solid fa-circle-user text-xl"></i>
        <span class="font-medium hidden sm:inline">${currentUser.fullName}</span>
        <button onclick="handleLogout()" class="text-xs bg-red-700 hover:bg-red-800 px-2 py-1 rounded">Thoát</button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <button onclick="showPage('auth')" class="hover:bg-red-700 px-3 py-2 rounded-lg transition flex items-center gap-1">
        <i class="fa-solid fa-user"></i>
        <span>Đăng nhập</span>
      </button>
    `;
  }
}