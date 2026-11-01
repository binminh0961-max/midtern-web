// form.js - Dành cho Thành viên 4 (Xử lý Form Bình luận & Modal Đăng món mới qua LocalStorage)

/*
NHIỆM VỤ THÀNH VIÊN 4:

1. Xử lý Form Bình luận (#comment-form):
   - Bắt sự kiện submit form (e.preventDefault())
   - Lấy tên người bình luận từ: document.getElementById('comment-author').value.trim() || 'Ẩn danh'
   - Lấy nội dung từ: document.getElementById('comment-input').value.trim()
   - Lấy đánh giá từ: document.querySelector('input[name="rating-option"]:checked')?.value || 'Ngon 😋'
   - Lưu object bình luận mới { author, ratingType, content } vào mảng comments của món ăn hiện tại trong LocalStorage.
   - Thêm ngay bình luận mới vào #comment-list bên dưới (và cập nhật số lượng ở #comment-heading) mà không reload trang.
   - Reset form sau khi gửi thành công.

2. Xử lý Modal Đăng món mới (#add-recipe-form):
   - Bắt sự kiện submit modal:
     + Tên món: document.getElementById('new-recipe-name').value.trim()
     + Người đăng: document.getElementById('new-recipe-author').value.trim() || 'Thành viên'
     + Danh mục: document.getElementById('new-recipe-category').value
     + Thời gian: document.getElementById('new-recipe-time').value.trim() || '30 phút'
     + Link ảnh: document.getElementById('new-recipe-image').value.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
     + Nguyên liệu: lấy từ textarea #new-recipe-ingredients, tách theo dòng (.split('\n'))
     + Các bước làm: lấy từ textarea #new-recipe-steps, tách theo dòng (.split('\n'))
   - Tạo object món mới (id: Date.now()), push vào mảng recipes trong LocalStorage.
   - Đóng modal: bootstrap.Modal.getInstance(document.getElementById('addRecipeModal')).hide()
   - Gọi hàm renderRecipes(recipes) (của Thành viên 2) để cập nhật danh sách món ở cột trái ngay lập tức!
*/

// (Thành viên 4 sẽ dán code từ AI vào đây)
