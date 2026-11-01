// detail.js

/* ================= HELPERS ================= */
const $ = (id) => document.getElementById(id);

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value ?? '';
}

/**
 * Set text cho thẻ đầu tiên tồn tại trong danh sách ID (fallback an toàn
 * khi chưa chốt được chính xác ID meta của giao diện).
 */
function setAnyText(ids, value) {
  for (const id of ids) {
    const el = $(id);
    if (el) {
      el.textContent = value ?? '';
      return;
    }
  }
}

/* ================= MAIN RENDER ================= */
function renderDetail(recipe) {
  if (!recipe) return;

  renderHeader(recipe);
  renderMeta(recipe);
  renderIngredients(recipe.ingredients);
  renderSteps(recipe.steps);
  renderComments(recipe.comments);
}

/* ---------- Header (Tiêu đề + Ảnh) ---------- */
function renderHeader(recipe) {
  setText('detail-title', recipe.name);

  const img = $('detail-image');
  if (img) {
    img.src = recipe.image || '';
    img.alt = recipe.name || 'Hình ảnh món ăn';
  }
}

/* ---------- Meta ---------- */
function renderMeta(recipe) {
  setAnyText(['detail-time', 'detail-cook-time'], recipe.time);
  setAnyText(['detail-category', 'detail-type'], recipe.category);
  setAnyText(['detail-difficulty', 'detail-level'], recipe.difficulty);
  setAnyText(['detail-rating', 'detail-score'], recipe.rating);
  setAnyText(['detail-author', 'detail-user'], recipe.author);
}

/* ---------- Ingredients ---------- */
function renderIngredients(ingredients = []) {
  const container = $('ingredient-list');
  if (!container) return;
  container.innerHTML = '';

  const ul = document.createElement('ul');
  ul.className = 'ingredient-list';

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

/* ---------- Steps ---------- */
function renderSteps(steps = []) {
  const container = $('step-list');
  if (!container) return;
  container.innerHTML = '';

  const ol = document.createElement('ol');
  ol.className = 'step-list';

  steps.forEach((raw, i) => {
    // Bỏ tiền tố "Bước N:" vì đã có .step-num hiển thị số thứ tự
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

/* ---------- Comments ---------- */
function renderComments(comments = []) {
  const heading = $('comment-heading');
  if (heading) heading.textContent = `Bình luận (${comments.length})`;

  const list = $('comment-list');
  if (!list) return;
  list.innerHTML = '';

  if (!comments.length) {
    const empty = document.createElement('p');
    empty.className = 'comment-empty';
    empty.textContent = 'Chưa có bình luận nào.';
    list.appendChild(empty);
    return;
  }

  const frag = document.createDocumentFragment();
  comments.forEach((c) => {
    const item = document.createElement('div');
    item.className = 'comment-item';

    const author = document.createElement('div');
    author.className = 'comment-author';
    author.textContent = c.user || c.author || 'Ẩn danh';

    const content = document.createElement('p');
    content.className = 'comment-content';
    content.textContent = c.content || c.text || '';

    item.append(author, content);
    frag.appendChild(item);
  });
  list.appendChild(frag);
}

/* ================= INTERACTIONS ================= */
function initIngredientCheckboxEffect() {
  const container = $('ingredient-list');
  if (!container) return;

  // Event delegation: gắn 1 lần, không lo render lại mất sự kiện
  container.addEventListener('change', (e) => {
    const cb = e.target;
    if (!cb.matches('input[type="checkbox"].ingredient-checkbox')) return;

    const li = cb.closest('.ingredient-item');
    if (!li) return;

    li.classList.toggle('completed', cb.checked);
  });
}

document.addEventListener('DOMContentLoaded', initIngredientCheckboxEffect);