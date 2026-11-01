// detail.js - Phụ trách: Thành viên 3 (Render Chi tiết món ăn & Hiệu ứng)

/* ================= HELPERS ================= */
const $ = (id) => document.getElementById(id);

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value ?? '';
}

/* ================= MAIN RENDER ================= */
/**
 * Render toàn bộ chi tiết món ăn lên giao diện cột bên phải
 * @param {Object} recipe - Object món ăn từ mảng recipes trong data.js
 */
function renderDetail(recipe) {
  if (!recipe) return;

  renderHeader(recipe);
  renderMeta(recipe);
  renderIngredients(recipe.ingredients);
  renderSteps(recipe.steps);
  renderComments(recipe.comments);
}

/* ---------- 1. Header (Tiêu đề in hoa + Ảnh bìa) ---------- */
function renderHeader(recipe) {
  setText('detail-title', (recipe.name || '').toUpperCase());

  const img = $('detail-image');
  if (img) {
    img.src = recipe.image || '';
    img.alt = recipe.name || 'Hình ảnh món ăn';
  }
}

/* ---------- 2. Meta (Thời gian, Độ khó, Đánh giá, Người đăng) ---------- */
function renderMeta(recipe) {
  // Thời gian chuẩn bị / nấu
  setText('detail-time', `⏱ ${recipe.cookTime || recipe.prepTime || recipe.time || '30 phút'}`);

  // Độ khó
  setText('detail-difficulty', `Khó: ${recipe.difficulty || 'Dễ'}`);

  // Đánh giá kèm số sao và số lượt review
  const reviewTotal = recipe.reviewCount || (recipe.comments ? recipe.comments.length : 0);
  setText('detail-rating', `⭐ ${recipe.rating || 5.0} (${reviewTotal} đánh giá)`);

  // Người đăng & thời gian đăng
  const authorEl = $('detail-author');
  if (authorEl) {
    authorEl.innerHTML = `Đăng bởi: <strong>${recipe.author || 'Thành viên'}</strong> ${recipe.postedTime || 'Vừa xong'}`;
  }
}

/* ---------- 3. Nguyên liệu kèm Checkbox tương tác ---------- */
function renderIngredients(ingredients = []) {
  const container = $('ingredient-list');
  if (!container) return;
  container.innerHTML = '';

  const ul = document.createElement('ul');
  ul.className = 'ingredient-list';
  ul.style.listStyle = 'none';
  ul.style.padding = '0';
  ul.style.margin = '0';

  ingredients.forEach((name, i) => {
    const li = document.createElement('li');
    li.className = 'ingredient-item';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.className = 'ingredient-checkbox';
    cb.id = `ing-${i}`;

    const label = document.createElement('label');
    label.className = 'ingredient-label';
    label.htmlFor = cb.id;
    label.textContent = name;

    li.append(cb, label);
    ul.appendChild(li);
  });

  container.appendChild(ul);
}

/* ---------- 4. Các bước thực hiện (Số thứ tự tròn màu cam) ---------- */
function renderSteps(steps = []) {
  const container = $('step-list');
  if (!container) return;
  container.innerHTML = '';

  const ol = document.createElement('ol');
  ol.className = 'step-list';

  steps.forEach((raw, i) => {
    // Chuẩn hóa text: bỏ tiền tố "Bước X:" nếu có sẵn
    const text = String(raw).replace(/^Bước\s*\d+\s*[:.]\s*/i, '');

    const li = document.createElement('li');
    li.className = 'step-item';

    const num = document.createElement('span');
    num.className = 'step-num';
    num.textContent = i + 1;

    const p = document.createElement('p');
    p.className = 'step-text';
    p.textContent = text;

    li.append(num, p);
    ol.appendChild(li);
  });

  container.appendChild(ol);
}

/* ---------- 5. Bình luận & Đánh giá (Kèm Ngon 😋 / Dở 🤢) ---------- */
function renderComments(comments = []) {
  const heading = $('comment-heading');
  if (heading) {
    heading.textContent = `BÌNH LUẬN & ĐÁNH GIÁ (${comments.length})`;
  }

  const list = $('comment-list');
  if (!list) return;
  list.innerHTML = '';

  if (!comments.length) {
    const empty = document.createElement('p');
    empty.className = 'text-muted fst-italic';
    empty.textContent = 'Chưa có bình luận nào. Hãy là người đầu tiên đánh giá!';
    list.appendChild(empty);
    return;
  }

  const frag = document.createDocumentFragment();
  comments.forEach((c) => {
    const item = document.createElement('div');
    item.className = 'comment-item';

    const bullet = document.createElement('span');
    bullet.className = 'comment-bullet';
    bullet.textContent = '★ ';

    const author = document.createElement('span');
    author.className = 'comment-author';
    author.textContent = c.author || c.user || 'Ẩn danh';

    const ratingTag = document.createElement('span');
    ratingTag.className = 'comment-rating-tag ms-1';
    ratingTag.textContent = ` (${c.ratingType || 'Ngon 😋'}): `;

    const content = document.createElement('span');
    content.className = 'comment-content';
    content.textContent = c.content || c.text || '';

    item.append(bullet, author, ratingTag, content);
    frag.appendChild(item);
  });
  list.appendChild(frag);
}

/* ================= HIỆU ỨNG TƯƠNG TÁC CHECKBOX ================= */
function initIngredientCheckboxEffect() {
  const container = $('ingredient-list');
  if (!container) return;

  // Sử dụng event delegation để khi render lại không bị mất sự kiện
  container.addEventListener('change', (e) => {
    const cb = e.target;
    if (!cb.matches('input[type="checkbox"].ingredient-checkbox')) return;

    const li = cb.closest('.ingredient-item');
    if (!li) return;

    // Toggle hiệu ứng gạch ngang và mờ
    li.classList.toggle('completed', cb.checked);
  });
}

// Lắng nghe khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', initIngredientCheckboxEffect);
