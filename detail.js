// detail.js - Dành cho Thành viên 3 (Render Chi tiết món ăn & Hiệu ứng)
// Nhận object recipeObj từ main.js (hàm showDetail) để render vào #recipe-detail

/*
NHIỆM VỤ THÀNH VIÊN 3:
1. Hàm renderDetail(recipeObj):
   - Đổ thông tin tên món vào #detail-title
   - Đổ thời gian, độ khó, đánh giá, người đăng
   - Cập nhật ảnh vào #detail-image
   - Render danh sách nguyên liệu vào #ingredient-list kèm checkbox
   - Render các bước thực hiện vào #step-list
2. Viết hiệu ứng: Khi click checkbox nguyên liệu, gạch ngang chữ (text-decoration: line-through) và mờ đi (opacity: 0.5).
*/

// (Thành viên 3 sẽ dán code từ AI vào đây)
/**
 * Render chi tiết món ăn lên giao diện cột bên phải
 * @param {Object} recipeObj - Object chứa thông tin chi tiết món ăn
 */
function renderDetail(recipeObj) {
  // 1. Hiển thị tiêu đề và hình ảnh
  const titleEl = document.getElementById('detail-title');
  const imageEl = document.getElementById('detail-image');
  
  if (titleEl) {
    titleEl.textContent = recipeObj.name || '';
  }
  
  if (imageEl) {
    imageEl.src = recipeObj.image || '';
    imageEl.alt = recipeObj.name || 'Hình ảnh món ăn';
  }

  // 2. Render danh sách nguyên liệu kèm checkbox
  const ingredientListEl = document.getElementById('ingredient-list');
  if (ingredientListEl) {
    ingredientListEl.innerHTML = '';
    
    if (recipeObj.ingredients && Array.isArray(recipeObj.ingredients)) {
      recipeObj.ingredients.forEach((ingredient, index) => {
        const li = document.createElement('li');
        li.style.listStyle = 'none';
        li.style.marginBottom = '8px';
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.gap = '8px';
        li.style.transition = 'all 0.2s ease';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `ingredient-${index}`;
        checkbox.style.cursor = 'pointer';

        const label = document.createElement('label');
        label.htmlFor = `ingredient-${index}`;
        label.textContent = ingredient;
        label.style.cursor = 'pointer';

        // Xệu ứng tương tác: Gạch ngang và mờ khi check/uncheck
        checkbox.addEventListener('change', function () {
          if (this.checked) {
            label.style.textDecoration = 'line-through';
            label.style.opacity = '0.5';
          } else {
            label.style.textDecoration = 'none';
            label.style.opacity = '1';
          }
        });

        li.appendChild(checkbox);
        li.appendChild(label);
        ingredientListEl.appendChild(li);
      });
    }
  }

  // 3. Render danh sách các bước thực hiện
  const stepListEl = document.getElementById('step-list');
  if (stepListEl) {
    stepListEl.innerHTML = '';
    
    if (recipeObj.steps && Array.isArray(recipeObj.steps)) {
      const ol = document.createElement('ol');
      ol.style.paddingLeft = '20px';
      
      recipeObj.steps.forEach(step => {
        const li = document.createElement('li');
        // Xóa tiền tố "Bước X: " nếu trong dữ liệu đã có sẵn để tránh lặp, 
        // hoặc giữ nguyên nếu dữ liệu chưa có. Ở đây ta hiển thị trực tiếp text.
        li.textContent = step;
        li.style.marginBottom = '8px';
        ol.appendChild(li);
      });
      
      stepListEl.appendChild(ol);
    }
  }
}