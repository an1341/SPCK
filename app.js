
window.onload = function() {
  let users = JSON.parse(localStorage.getItem('usersList')) || [];
  if (!users.some(u => u.username === 'admin')) {
    users.push({ username: 'admin', password: '123456', fullName: 'Quản trị viên Admin' });
    localStorage.setItem('usersList', JSON.stringify(users));
  }

  renderUserSection();
  renderProducts(PRODUCTS);
  updateCartUI();
};

function showPage(pageName) {
  document.getElementById('homePage').classList.add('hidden');
  document.getElementById('detailPage').classList.add('hidden');
  document.getElementById('authPage').classList.add('hidden');
  document.getElementById('supportPage').classList.add('hidden');

  if (pageName === 'home') document.getElementById('homePage').classList.remove('hidden');
  if (pageName === 'detail') document.getElementById('detailPage').classList.remove('hidden');
  if (pageName === 'auth') document.getElementById('authPage').classList.remove('hidden');
  if (pageName === 'support') document.getElementById('supportPage').classList.remove('hidden');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderProducts(list) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = list.map(p => `
    <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 flex flex-col justify-between p-3 group">
      <div>
        <div class="relative overflow-hidden rounded-lg mb-3">
          <img src="${p.image}" alt="${p.name}" class="w-full h-40 object-cover group-hover:scale-105 transition duration-300" />
          <span class="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            -${Math.round((1 - p.price/p.originalPrice)*100)}%
          </span>
        </div>
        <h3 onclick="viewDetail(${p.id})" class="font-bold text-sm text-gray-800 hover:text-red-600 cursor-pointer line-clamp-2 mb-1">${p.name}</h3>
        <div class="flex items-center gap-1 text-xs text-yellow-500 mb-2">
          <i class="fa-solid fa-star"></i> <span>${p.rating}</span>
          <span class="text-gray-400">| Đã bán ${p.sold}</span>
        </div>
      </div>
      <div>
        <div class="text-red-600 font-bold text-base">${p.price.toLocaleString('vi-VN')}đ</div>
        <div class="text-gray-400 text-xs line-through mb-3">${p.originalPrice.toLocaleString('vi-VN')}đ</div>
        <button onclick="addToCart(${p.id})" class="w-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-medium text-xs py-2 rounded-lg transition border border-red-200">
          + Thêm vào giỏ
        </button>
      </div>
    </div>
  `).join('');
}

function viewDetail(id) {
  const p = PRODUCTS.find(item => item.id === id);
  if (!p) return;

  const container = document.getElementById('detailContent');
  container.innerHTML = `
    <div>
      <img src="${p.image}" alt="${p.name}" class="w-full h-80 object-cover rounded-2xl shadow border" />
    </div>
    <div class="space-y-4">
      <span class="bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">${p.category}</span>
      <h1 class="text-2xl font-bold text-gray-900">${p.name}</h1>
      <div class="flex items-center gap-4 text-sm">
        <span class="text-yellow-500 font-bold"><i class="fa-solid fa-star"></i> ${p.rating}</span>
        <span class="text-gray-400">Đã bán: ${p.sold} sản phẩm</span>
      </div>
      <div class="bg-gray-50 p-4 rounded-xl border">
        <div class="text-3xl font-extrabold text-red-600">${p.price.toLocaleString('vi-VN')}đ</div>
        <div class="text-sm text-gray-400 line-through">Giá gốc: ${p.originalPrice.toLocaleString('vi-VN')}đ</div>
      </div>
      <p class="text-sm text-gray-600 leading-relaxed">${p.desc}</p>
      <div class="flex gap-4 pt-4">
        <button onclick="addToCart(${p.id})" class="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition flex items-center justify-center gap-2">
          <i class="fa-solid fa-cart-plus"></i> Thêm Vào Giỏ Hàng
        </button>
      </div>
    </div>
  `;
  showPage('detail');
}

function filterCategory(cat) {
  document.getElementById('categoryTitle').innerText = cat === 'All' ? 'Sản Phẩm Nổi Bật' : `Danh mục: ${cat}`;
  let filtered = cat === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
  renderProducts(filtered);
}

function handleSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
}

function handleSort() {
  const type = document.getElementById('sortSelect').value;
  let list = [...PRODUCTS];
  if (type === 'price-asc') list.sort((a, b) => a.price - b.price);
  if (type === 'price-desc') list.sort((a, b) => b.price - a.price);
  renderProducts(list);
}

function handleSupportSubmit(e) {
  e.preventDefault();
  alert('Cảm ơn bạn! Yêu cầu hỗ trợ đã được gửi đi thành công.');
  e.target.reset();
}