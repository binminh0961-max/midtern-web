// home.js - Dành cho Thành viên 2 (Render danh sách món ăn & Bộ lọc)
// Nhận dữ liệu từ data.js (biến recipes) và render vào #recipe-list

/*
NHIỆM VỤ THÀNH VIÊN 2:

1. Hàm renderRecipes(dataArray):
   - Xóa rỗng #recipe-list: document.getElementById('recipe-list').innerHTML = '';
   - Cập nhật số lượng món ở #sidebar-count: "Món ăn từ cộng đồng (" + dataArray.length + ")"
   - Lặp qua mảng dataArray để tạo các thẻ Card (class="recipe-card", data-id=recipe.id, onclick="showDetail(recipe.id)").
   - Thẻ card gồm: ảnh (.recipe-thumb), tên món (.recipe-card-title), thời gian (.recipe-card-meta), đánh giá (.recipe-card-rating).
   - Nếu dataArray rỗng, in thông báo: "<p class='text-muted p-3'>Không tìm thấy món ăn phù hợp.</p>".

2. Tìm kiếm (#search-box):
   - Lắng nghe sự kiện 'input' trên ô #search-box:
     const keyword = e.target.value.toLowerCase().trim();
     const filtered = recipes.filter(r => 
       r.name.toLowerCase().includes(keyword) || 
       (r.ingredients && r.ingredients.some(ing => ing.toLowerCase().includes(keyword)))
     );
     renderRecipes(filtered);

3. Bộ lọc danh mục (#category-filters):
   - Các nút có class .btn-filter với data-cate tương ứng:
     "Tất cả" | "Món mặn" | "Món chay" | "Món ăn vặt" | "Nhanh gọn"
   - Khi click nút:
     + Bỏ class 'active' ở tất cả các nút .btn-filter, thêm 'active' vào nút vừa bấm.
     + Lấy category: const cate = btn.getAttribute('data-cate');
     + Nếu cate === 'Tất cả' -> renderRecipes(recipes);
     + Ngược lại: renderRecipes(recipes.filter(r => r.category === cate));
*/

// (Thành viên 2 sẽ dán code từ AI vào đây)
