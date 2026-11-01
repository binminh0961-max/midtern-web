document.addEventListener('DOMContentLoaded', () => {
    // State quản lý trên màn hình
    let currentCategoryId = 1;
    let currentKeyword = '';

    // Cache DOM Elements
    const elements = {
        recipeContainer: document.getElementById('recipeListContainer'),
        recipeCounter: document.getElementById('recipeCountDisplay'),
        categoryNav: document.querySelector('.category-filter'),
        searchInput: document.querySelector('.search-input'),
        searchForm: document.querySelector('.search-wrapper'),
        mainContentArea: document.querySelector('.content-display-area')
    };

    // Backup lại giao diện Chào mừng ban đầu của cột phải để có thể reset nếu muốn
    const defaultWelcomeHTML = elements.mainContentArea.innerHTML;

    /**
     * 1. Render danh sách thẻ món ăn ở cột bên trái
     */
    function renderRecipeList() {
        const recipes = window.recipeService.getFilteredRecipes({
            category_id: currentCategoryId,
            keyword: currentKeyword
        });

        // Cập nhật số đếm tiêu đề
        if (elements.recipeCounter) {
            elements.recipeCounter.textContent = `(${recipes.length})`;
        }

        if (recipes.length === 0) {
            elements.recipeContainer.innerHTML = `
                <div style="padding: 24px; text-align: center; color: #888; font-size: 13px;">
                    Không tìm thấy món ăn nào phù hợp.
                </div>
            `;
            return;
        }

        elements.recipeContainer.innerHTML = recipes.map(recipe => `
            <div class="recipe-card" data-id="${recipe.id}" style="cursor: pointer;">
                <img src="${recipe.image_url}" alt="${recipe.title}" class="recipe-thumb">
                <div class="recipe-info">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <div class="recipe-meta">
                        <i class='bx bx-time-five'></i>
                        <span>${recipe.prep_time}</span>
                    </div>
                    <div class="recipe-rating">
                        <i class='bx bxs-star'></i>
                        <span>${Number(recipe.rating).toFixed(1)}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Gắn sự kiện click vào từng món ăn
        document.querySelectorAll('.recipe-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                renderRecipeDetail(id);
            });
        });
    }

    /**
     * 2. Render chi tiết món ăn ở cột bên phải khi được click
     */
    function renderRecipeDetail(id) {
        const item = window.recipeService.getRecipeDetail(id);
        if (!item) return;

        const ingredientsHtml = (item.ingredients || [])
            .map(ing => `<li>${ing}</li>`)
            .join('');

        const instructionsHtml = (item.instructions || [])
            .map((step, idx) => `
                <li style="margin-bottom: 10px;">
                    <strong>Bước ${idx + 1}:</strong> ${step}
                </li>
            `).join('');

        elements.mainContentArea.innerHTML = `
            <div style="background: #ffffff; border-radius: 18px; padding: 28px; border: 1px solid rgba(0,0,0,0.04);">
                <div style="display: flex; gap: 24px; align-items: flex-start; margin-bottom: 24px;">
                    <img src="${item.image_url}" alt="${item.title}" style="width: 140px; height: 140px; object-fit: cover; border-radius: 14px;">
                    <div>
                        <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 8px;">${item.title}</h2>
                        <div style="display: flex; gap: 16px; font-size: 13px; color: #666; margin-bottom: 8px;">
                            <span><i class='bx bx-time-five'></i> ${item.prep_time}</span>
                            <span><i class='bx bxs-star' style="color: #f59e0b;"></i> ${Number(item.rating).toFixed(1)}</span>
                        </div>
                        <span style="display: inline-block; background: #fff2ed; color: #d8572a; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                            Chi phí ước tính: ${item.price.toLocaleString('vi-VN')} đ
                        </span>
                    </div>
                </div>

                <div style="margin-bottom: 24px;">
                    <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 10px;">Nguyên liệu cần chuẩn bị</h3>
                    <ul style="padding-left: 20px; font-size: 14px; line-height: 1.8; color: #444;">
                        ${ingredientsHtml}
                    </ul>
                </div>

                <div>
                    <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 10px;">Các bước thực hiện</h3>
                    <ol style="padding-left: 20px; font-size: 14px; line-height: 1.8; color: #444;">
                        ${instructionsHtml}
                    </ol>
                </div>
            </div>
        `;
    }

    /**
     * 3. Xử lý click lọc danh mục (Tabs bên trái)
     */
    if (elements.categoryNav) {
        elements.categoryNav.addEventListener('click', (e) => {
            const tag = e.target.closest('.filter-tag');
            if (!tag) return;
            e.preventDefault();

            // Đổi class Active
            document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            // Cập nhật state & re-render
            currentCategoryId = tag.dataset.categoryId || 1;
            renderRecipeList();
        });
    }

    /**
     * 4. Xử lý tìm kiếm thời gian thực
     */
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', (e) => {
            currentKeyword = e.target.value;
            renderRecipeList();
        });
    }

    if (elements.searchForm) {
        elements.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    // Khởi chạy lần đầu khi nạp trang
    renderRecipeList();
});