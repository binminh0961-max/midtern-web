// form.js - Phụ trách: Thành viên 4 (Xử lý Form Bình luận & Modal Đăng món mới qua PHP & MySQL)

document.addEventListener("DOMContentLoaded", () => {
  setupCommentForm();
  setupAddRecipeForm();
});

/* ================= 1. XỬ LÝ FORM BÌNH LUẬN ================= */
function setupCommentForm() {
  const form = document.getElementById("comment-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Lấy ID món ăn đang được chọn (active)
    const activeCard = document.querySelector(".recipe-card.active");
    const recipeId = activeCard ? parseInt(activeCard.getAttribute("data-id")) : 1;

    const authorInput = document.getElementById("comment-author");
    const contentInput = document.getElementById("comment-input");
    const ratingOption = document.querySelector('input[name="rating-option"]:checked');

    const author = (authorInput && authorInput.value.trim()) ? authorInput.value.trim() : "Ẩn danh";
    const content = contentInput ? contentInput.value.trim() : "";
    const ratingType = ratingOption ? ratingOption.value : "Ngon 😋";

    if (!content) {
      alert("Vui lòng nhập nội dung bình luận!");
      return;
    }

    // Tạo object bình luận mới
    const newComment = {
      recipe_id: recipeId,
      author: author,
      ratingType: ratingType,
      rating_type: ratingType,
      content: content
    };

    try {
      // Gửi dữ liệu lên MySQL qua API PHP
      const res = await fetch("api_add_comment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment)
      });
      const data = await res.json();
      console.log("Kết quả lưu comment vào MySQL:", data);
    } catch (err) {
      console.warn("Chưa kết nối MySQL hoặc lỗi mạng, hiển thị tạm thời trên giao diện:", err);
    }

    // Thêm bình luận mới trực tiếp vào giao diện ngay lập tức
    appendCommentToDOM(newComment);

    // Cập nhật lại trong mảng recipes toàn cục
    const currentRecipe = recipes.find(r => r.id === recipeId);
    if (currentRecipe) {
      if (!currentRecipe.comments) currentRecipe.comments = [];
      currentRecipe.comments.push(newComment);
      currentRecipe.reviewCount = currentRecipe.comments.length;
    }

    // Reset ô nhập
    if (contentInput) contentInput.value = "";
  });
}

// Hàm thêm bình luận mới vào danh sách hiển thị
function appendCommentToDOM(c) {
  const list = document.getElementById("comment-list");
  if (!list) return;

  // Xóa thông báo 'chưa có bình luận nào' nếu có
  const emptyMsg = list.querySelector(".text-muted");
  if (emptyMsg) emptyMsg.remove();

  const item = document.createElement("div");
  item.className = "comment-item";

  const bullet = document.createElement("span");
  bullet.className = "comment-bullet";
  bullet.textContent = "★ ";

  const author = document.createElement("span");
  author.className = "comment-author";
  author.textContent = c.author || "Ẩn danh";

  const ratingTag = document.createElement("span");
  ratingTag.className = "comment-rating-tag ms-1";
  ratingTag.textContent = ` (${c.ratingType || "Ngon 😋"}): `;

  const content = document.createElement("span");
  content.className = "comment-content";
  content.textContent = c.content || "";

  item.append(bullet, author, ratingTag, content);
  list.appendChild(item);

  // Cập nhật số lượng trên tiêu đề
  const heading = document.getElementById("comment-heading");
  if (heading) {
    const total = list.querySelectorAll(".comment-item").length;
    heading.textContent = `BÌNH LUẬN & ĐÁNH GIÁ (${total})`;
  }
}

/* ================= 2. XỬ LÝ MODAL ĐĂNG MÓN MỚI ================= */
function setupAddRecipeForm() {
  const form = document.getElementById("add-recipe-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("new-recipe-name").value.trim();
    const author = document.getElementById("new-recipe-author").value.trim() || "Thành viên";
    const category = document.getElementById("new-recipe-category").value;
    const time = document.getElementById("new-recipe-time").value.trim() || "30 phút";
    const image = document.getElementById("new-recipe-image").value.trim() || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";
    const ingredientsRaw = document.getElementById("new-recipe-ingredients").value;
    const stepsRaw = document.getElementById("new-recipe-steps").value;

    if (!name) {
      alert("Vui lòng nhập tên món ăn!");
      return;
    }

    const ingredients = ingredientsRaw.split("\n").map(s => s.trim()).filter(s => s.length > 0);
    const steps = stepsRaw.split("\n").map(s => s.trim()).filter(s => s.length > 0);

    const newRecipePayload = {
      name,
      author,
      category,
      time,
      image,
      ingredients,
      steps
    };

    let createdRecipe = null;

    try {
      // Gửi món mới lên MySQL qua API PHP
      const res = await fetch("api_add_recipe.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipePayload)
      });
      const data = await res.json();
      if (data.success && data.recipe) {
        createdRecipe = data.recipe;
      }
    } catch (err) {
      console.warn("Chưa kết nối MySQL, tạo tạm thời trên client:", err);
    }

    // Nếu API thành công hoặc fallback
    if (!createdRecipe) {
      createdRecipe = {
        id: Date.now(),
        name,
        category,
        prepTime: "15 phút chuẩn bị",
        cookTime: time,
        difficulty: "Dễ",
        rating: 5.0,
        reviewCount: 0,
        author,
        postedTime: "Vừa xong",
        image,
        ingredients,
        steps,
        comments: []
      };
    }

    // Thêm món mới vào mảng recipes toàn cục
    recipes.push(createdRecipe);

    // Đóng Modal Bootstrap
    const modalEl = document.getElementById("addRecipeModal");
    const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modalInstance.hide();

    // Reset form
    form.reset();

    // Cập nhật lại danh sách ở cột trái và chuyển tới xem món vừa đăng
    if (typeof renderRecipes === "function") {
      renderRecipes(recipes);
    } else {
      // Tự thêm 1 card mới vào #recipe-list nếu Member 2 chưa viết renderRecipes
      appendRecipeCard(createdRecipe);
    }

    showDetail(createdRecipe.id);
    alert(`Đã đăng món "${name}" thành công!`);
  });
}

// Fallback tự thêm card vào danh sách bên trái nếu hàm renderRecipes chưa sẵn sàng
function appendRecipeCard(r) {
  const list = document.getElementById("recipe-list");
  if (!list) return;

  const card = document.createElement("div");
  card.className = "recipe-card";
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
  list.appendChild(card);

  // Cập nhật số lượng
  const countEl = document.getElementById("sidebar-count");
  if (countEl) {
    countEl.textContent = `Món ăn từ cộng đồng (${recipes.length})`;
  }
}
