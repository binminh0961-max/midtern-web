// main.js - Điều phối chính (Member 1)

// Hàm chuyển đổi chi tiết món ăn khi click chọn
function showDetail(recipeId) {
  const welcomeScreen = document.getElementById("welcome-screen");
  const recipeDetail = document.getElementById("recipe-detail");

  // 1. Ẩn màn hình chờ, hiện khu vực chi tiết
  if (welcomeScreen) welcomeScreen.classList.add("d-none");
  if (recipeDetail) recipeDetail.classList.remove("d-none");

  // 2. Cập nhật trạng thái active cho card ở sidebar bên trái
  const cards = document.querySelectorAll(".recipe-card");
  cards.forEach(card => {
    if (card.getAttribute("data-id") == recipeId) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });

  // 3. Tìm món ăn trong mảng recipes
  const currentRecipes = typeof recipes !== "undefined" ? recipes : [];
  const selectedRecipe = currentRecipes.find(r => r.id == recipeId);

  if (!selectedRecipe) return;

  // 4. Nếu Member 3 đã viết hàm renderDetail thì ưu tiên gọi hàm đó
  if (typeof renderDetail === "function") {
    renderDetail(selectedRecipe);
    return;
  }

  // 5. Fallback tự cập nhật DOM (giúp giao diện hoạt động ngay lập tức trước khi Member 3 ráp code)
  updateDetailDOM(selectedRecipe);
}

// Cập nhật DOM chi tiết món ăn
function updateDetailDOM(recipe) {
  const titleEl = document.getElementById("detail-title");
  const timeEl = document.getElementById("detail-time");
  const diffEl = document.getElementById("detail-difficulty");
  const ratingEl = document.getElementById("detail-rating");
  const authorEl = document.getElementById("detail-author");
  const imageEl = document.getElementById("detail-image");
  const ingredientListEl = document.getElementById("ingredient-list");
  const stepListEl = document.getElementById("step-list");
  const commentHeadingEl = document.getElementById("comment-heading");
  const commentListEl = document.getElementById("comment-list");

  if (titleEl) titleEl.textContent = recipe.name.toUpperCase();
  if (timeEl) timeEl.textContent = `⏱ ${recipe.cookTime || recipe.prepTime}`;
  if (diffEl) diffEl.textContent = `Khó: ${recipe.difficulty || "Dễ"}`;
  if (ratingEl) ratingEl.textContent = `⭐ ${recipe.rating} (${recipe.reviewCount || (recipe.comments ? recipe.comments.length : 0)} đánh giá)`;
  if (authorEl) authorEl.innerHTML = `Đăng bởi: <strong>${recipe.author || "Thành viên"}</strong> ${recipe.postedTime || "Vừa xong"}`;
  
  if (imageEl && recipe.image) {
    imageEl.src = recipe.image;
    imageEl.alt = recipe.name;
  }

  // Render danh sách nguyên liệu với checkbox
  if (ingredientListEl && recipe.ingredients) {
    ingredientListEl.innerHTML = recipe.ingredients.map(ing => `
      <label class="ingredient-item">
        <input type="checkbox" class="ingredient-checkbox">
        <span>${ing}</span>
      </label>
    `).join("");
    setupIngredientCheckboxEvents();
  }

  // Render các bước làm
  if (stepListEl && recipe.steps) {
    stepListEl.innerHTML = recipe.steps.map((step, index) => `
      <div class="step-item">
        <span class="step-num">${index + 1}</span>
        <span>${step}</span>
      </div>
    `).join("");
  }

  // Render bình luận
  if (commentHeadingEl && recipe.comments) {
    commentHeadingEl.textContent = `BÌNH LUẬN & ĐÁNH GIÁ (${recipe.comments.length})`;
  }

  if (commentListEl && recipe.comments) {
    commentListEl.innerHTML = recipe.comments.map(c => `
      <div class="comment-item">
        <span class="comment-bullet">★</span>
        <span class="comment-author">${c.author}</span>
        <span class="comment-rating-tag">(${c.ratingType || "Ngon 😋"}):</span>
        <span>${c.content}</span>
      </div>
    `).join("");
  }
}

// Xử lý sự kiện gạch ngang khi click checkbox nguyên liệu
function setupIngredientCheckboxEvents() {
  const checkboxes = document.querySelectorAll(".ingredient-checkbox");
  checkboxes.forEach(cb => {
    cb.addEventListener("change", function() {
      const parentLabel = this.closest(".ingredient-item");
      if (parentLabel) {
        if (this.checked) {
          parentLabel.classList.add("checked");
        } else {
          parentLabel.classList.remove("checked");
        }
      }
    });
  });
}

// Khởi chạy khi load trang
document.addEventListener("DOMContentLoaded", () => {
  setupIngredientCheckboxEvents();

  // Nếu Member 2 đã có hàm renderRecipes thì gọi để render danh sách động
  if (typeof renderRecipes === "function" && typeof recipes !== "undefined") {
    renderRecipes(recipes);
  }

  // Mặc định hiển thị món đầu tiên (ID: 1) như trong mockup
  showDetail(1);
});
