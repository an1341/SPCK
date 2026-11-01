let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

function toggleCartModal() {
  document.getElementById('cartModal').classList.toggle('hidden');
}

function addToCart(id) {
  const p = PRODUCTS.find(item => item.id === id);
  const exist = cart.find(item => item.id === id);

  if (exist) {
    exist.qty += 1;
  } else {
    cart.push({ ...p, qty: 1 });
  }

  saveCart();
  alert(`Đã thêm "${p.name}" vào giỏ hàng!`);
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
  }
  saveCart();
}

function saveCart() {
  localStorage.setItem('cartItems', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cartBadge').innerText = totalCount;

  const cartList = document.getElementById('cartItemsList');
  if (cart.length === 0) {
    cartList.innerHTML = `<p class="text-center text-gray-400 py-8">Giỏ hàng của bạn đang trống.</p>`;
  } else {
    cartList.innerHTML = cart.map(item => `
      <div class="flex items-center gap-3 border-b pb-3">
        <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-cover rounded border" />
        <div class="flex-1 min-w-0">
          <h4 class="font-bold text-xs truncate">${item.name}</h4>
          <div class="text-red-600 text-xs font-bold mt-1">${(item.price * item.qty).toLocaleString('vi-VN')}đ</div>
          <div class="flex items-center gap-2 mt-1">
            <button onclick="changeQty(${item.id}, -1)" class="w-5 h-5 bg-gray-200 rounded text-xs">-</button>
            <span class="text-xs font-bold">${item.qty}</span>
            <button onclick="changeQty(${item.id}, 1)" class="w-5 h-5 bg-gray-200 rounded text-xs">+</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  const totalMoney = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById('cartTotalPrice').innerText = `${totalMoney.toLocaleString('vi-VN')}đ`;
}

function checkout() {
  if (cart.length === 0) {
    alert('Giỏ hàng trống!');
    return;
  }
  if (!currentUser) {
    alert('Vui lòng đăng nhập tài khoản để tiến hành thanh toán!');
    toggleCartModal();
    showPage('auth');
    return;
  }
  alert('Thanh toán đơn hàng thành công! Cảm ơn bạn đã mua sắm tại TechMart.');
  cart = [];
  saveCart();
  toggleCartModal();
}