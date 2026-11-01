// home.js - Phụ trách: Thành viên 2 (Render danh sách món ăn, Tìm kiếm & Bộ lọc)

document.addEventListener("DOMContentLoaded", () => {
  setupSearchAndFilters();
  if (typeof recipes !== "undefined" && recipes.length > 0) {
    renderRecipes(recipes);
  }
});

/**
 * Render danh sách món ăn ra cột bên trái (#recipe-list)
 * @param {Array} dataArray - Mảng các object món ăn
 */
function renderRecipes(dataArray) {
  const container = document.getElementById("recipe-list");
  if (!container) return;
  container.innerHTML = "";

  // Cập nhật số lượng đếm trên tiêu đề
  const countEl = document.getElementById("sidebar-count");
  if (countEl) {
    countEl.textContent = `Món ăn từ cộng đồng (${dataArray.length})`;
  }

  if (dataArray.length === 0) {
    container.innerHTML = `<div class="p-3 text-muted text-center fst-italic">Không tìm thấy món ăn nào phù hợp.</div>`;
    return;
  }

  // Xác định món đang active (nếu có)
  const currentActive = document.querySelector(".recipe-card.active");
  const activeId = currentActive ? parseInt(currentActive.getAttribute("data-id")) : (dataArray[0] ? dataArray[0].id : null);

  dataArray.forEach(r => {
    const card = document.createElement("div");
    card.className = "recipe-card" + (r.id === activeId ? " active" : "");
    card.setAttribute("data-id", r.id);
    card.onclick = () => showDetail(r.id);

    card.innerHTML = `
      <img src="${r.image}" alt="${r.name}" class="recipe-thumb">
      <div class="recipe-card-info">
        <div class="recipe-card-title">${r.name}</div>
        <div class="recipe-card-meta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span>${r.prepTime || "15 phút chuẩn bị"}</span>
        </div>
        <div class="recipe-card-rating">⭐ ${r.rating || 5.0}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

/**
 * Thiết lập các sự kiện Tìm kiếm và Lọc danh mục
 */
function setupSearchAndFilters() {
  const searchBox = document.getElementById("search-box");
  const filterBtns = document.querySelectorAll(".btn-filter");

  let currentCategory = "Tất cả";
  let currentKeyword = "";

  function applyFilters() {
    let result = (typeof recipes !== "undefined") ? recipes : [];

    // 1. Lọc theo danh mục
    if (currentCategory !== "Tất cả") {
      result = result.filter(r => r.category === currentCategory);
    }

    // 2. Lọc theo từ khóa tìm kiếm (tên món hoặc nguyên liệu)
    if (currentKeyword) {
      result = result.filter(r => {
        const nameMatch = r.name.toLowerCase().includes(currentKeyword);
        const ingredientMatch = r.ingredients && r.ingredients.some(ing => ing.toLowerCase().includes(currentKeyword));
        return nameMatch || ingredientMatch;
      });
    }

    renderRecipes(result);
  }

  // Sự kiện gõ tìm kiếm real-time
  if (searchBox) {
    searchBox.addEventListener("input", (e) => {
      currentKeyword = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  // Sự kiện click chọn nút danh mục
  filterBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      filterBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      currentCategory = this.getAttribute("data-cate") || "Tất cả";
      applyFilters();
    });
  });
}
