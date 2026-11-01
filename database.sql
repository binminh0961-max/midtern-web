-- database.sql - Cơ sở dữ liệu cho dự án COOK & SHARE
-- Chạy file này trong phpMyAdmin của XAMPP để tạo cơ sở dữ liệu và nạp dữ liệu mẫu

CREATE DATABASE IF NOT EXISTS `cook_share` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `cook_share`;

-- 1. Bảng lưu trữ công thức món ăn
CREATE TABLE IF NOT EXISTS `recipes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `prep_time` VARCHAR(100) DEFAULT '30 phút chuẩn bị',
  `cook_time` VARCHAR(100) DEFAULT '40 phút',
  `difficulty` VARCHAR(50) DEFAULT 'Dễ',
  `rating` DECIMAL(2,1) DEFAULT 5.0,
  `author` VARCHAR(100) DEFAULT 'Thành viên',
  `posted_time` VARCHAR(100) DEFAULT 'Vừa xong',
  `image` TEXT,
  `ingredients` TEXT NOT NULL, -- Mảng JSON chứa nguyên liệu
  `steps` TEXT NOT NULL,       -- Mảng JSON chứa các bước làm
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Bảng lưu trữ bình luận & đánh giá
CREATE TABLE IF NOT EXISTS `comments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `recipe_id` INT NOT NULL,
  `author` VARCHAR(100) NOT NULL DEFAULT 'Ẩn danh',
  `rating_type` VARCHAR(50) DEFAULT 'Ngon 😋',
  `content` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================= NẠP DỮ LIỆU MẪU BAN ĐẦU =================

INSERT INTO `recipes` (`id`, `name`, `category`, `prep_time`, `cook_time`, `difficulty`, `rating`, `author`, `posted_time`, `image`, `ingredients`, `steps`) VALUES
(1, 'Sườn Xào Chua Ngọt', 'Món mặn', '30 phút chuẩn bị', '40 phút', 'Dễ', 4.8, 'Phương Anh • Huy', '2 giờ trước', 
 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
 '["500g sườn non, chặt miếng vừa ăn", "1 củ hành tây, 1/2 quả ớt chuông đỏ & xanh", "Tỏi, hành tím băm nhỏ", "Gia vị: Giấm, đường, nước mắm, tương ớt", "Hành lá, tiêu, dầu ăn."]',
 '["Chần sườn qua nước sôi có chút muối, sau đó ướp với hành tỏi băm và hạt nêm trong 15 phút.", "Chiên sườn xém cạnh với chút dầu ăn để sườn săn lại rồi vớt ra.", "Pha sốt chua ngọt: Giấm, đường, nước mắm, tương ớt và nước lọc theo tỷ lệ vừa vị.", "Phi thơm hành tỏi, xào hành tây & ớt chuông, cho sườn và nước sốt vào đảo đều đến khi sệt lại."]'
),
(2, 'Bánh Mì Chảo', 'Món ăn vặt', '15 phút chuẩn bị', '20 phút', 'Dễ', 4.7, 'Minh Tuấn', '5 giờ trước',
 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80',
 '["2 ổ bánh mì giòn", "2 quả trứng gà", "1 cây xúc xích, 1 miếng pate gan", "Hành tây, cà chua, hành ngò", "Bơ lạt, nước tương, tương ớt, tiêu xay."]',
 '["Làm nóng chảo nhỏ với chút bơ lạt, cho hành tây vào đảo thơm.", "Cho pate, xúc xích cắt lát vào áp chảo hai mặt cho xém nhẹ.", "Đập trứng gà vào chảo, giữ lòng đào tùy sở thích.", "Thêm sốt cà chua hoặc chút xì dầu, rắc tiêu ngò và ăn kèm bánh mì nóng giòn."]'
),
(3, 'Cá Kho Tộ', 'Món mặn', '40 phút chuẩn bị', '45 phút', 'Trung bình', 4.9, 'Cô Ba Sài Gòn', '1 ngày trước',
 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80',
 '["500g cá quả hoặc cá ba sa cắt khúc", "100g thịt ba chỉ thái con chì", "Hành tím, tỏi, ớt hiểm, hành lá", "Nước hàng (nước màu), nước mắm ngon, đường, tiêu sọ."]',
 '["Ướp cá với nước mắm, hành tỏi băm, tiêu, nước màu trong ít nhất 20 phút.", "Xào thịt ba chỉ săn lại trong tộ sứ để ra bớt mỡ.", "Xếp cá vào tộ cùng thịt, đun lửa lớn cho thịt cá săn lại.", "Thêm nước sôi xâm xấp mặt cá, hạ lửa nhỏ kho liu riu đến khi nước sánh kẹo lại thì rắc tiêu, ớt."]'
),
(4, 'Mỳ Ý Sốt Bò Bằm', 'Nhanh gọn', '25 phút chuẩn bị', '30 phút', 'Dễ', 4.6, 'Chef Kien', '2 ngày trước',
 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
 '["200g mỳ Spaghetti", "200g thịt bò băm nhuyễn", "1 hộp sốt cà chua hoặc 3 quả cà chua tươi băm hạt lựu", "1/2 củ hành tây băm nhỏ, tỏi băm", "Dầu olive, lá oregano, bơ, muối, tiêu, phô mai bột."]',
 '["Luộc mỳ trong nước sôi có chút muối khoảng 8-10 phút đến khi chín al dente, vớt ra xóc chút dầu olive.", "Phi thơm tỏi và hành tây với bơ, cho thịt bò băm vào xào chín tới.", "Đổ sốt cà chua vào đun nhỏ lửa, nêm chút muối, tiêu, lá oregano cho sốt sệt lại.", "Bày mỳ ra đĩa, rưới sốt bò bằm lên trên và rắc thêm chút phô mai bột."]'
),
(5, 'Canh Chua Cá Lóc', 'Món mặn', '35 phút chuẩn bị', '30 phút', 'Trung bình', 4.8, 'Bếp Mẹ Nấu', '3 ngày trước',
 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
 '["1 con cá lóc (khoảng 600g) làm sạch cắt khúc", "Dứa, cà chua, đậu bắp, dọc mùng (bạc hà), giá đỗ", "Me chín lấy nước cốt, ớt hiểm", "Rau ngổ, ngò gai, hành tỏi băm, gia vị nêm nếm."]',
 '["Cá lóc ướp chút hạt nêm, tiêu cho thấm.", "Phi thơm hành tỏi, cho cà chua và dứa vào xào sơ để tạo màu và độ chua thanh.", "Đổ nước vào đun sôi, cho nước cốt me và thả cá vào nấu chín vớt bọt.", "Cho đậu bắp, dọc mùng, giá đỗ vào nấu vừa chín tới, nêm đường nước mắm chua ngọt hài hòa rồi rắc rau thơm."]'
),
(6, 'Đậu Hũ Sốt Cà Chua', 'Món chay', '15 phút chuẩn bị', '20 phút', 'Dễ', 4.9, 'Tuệ Lâm', '4 giờ trước',
 'assets/dau-hu-sot-ca.jpg',
 '["3 miếng đậu hũ trắng (cắt vuông vừa ăn)", "3 quả cà chua chín mọng, băm nhỏ", "Hành boa-rô (tỏi tây), hành ngò", "Gia vị chay: Nước tương, đường, hạt nêm nấm, tiêu", "Dầu thực vật để chiên."]',
 '["Chiên đậu hũ vàng đều các mặt trong dầu nóng rồi vớt ra cho ráo dầu.", "Phi thơm gốc hành boa-rô, cho cà chua băm vào xào nhuyễn thành sốt.", "Nêm nước tương, đường, hạt nêm nấm và chút nước lọc, đun sôi cho sốt sánh lại.", "Cho đậu hũ vào đảo nhẹ tay cho ngấm đều sốt trong 3-5 phút, rắc hành ngò và tiêu rồi tắt bếp."]'
);

-- ================= NẠP BÌNH LUẬN MẪU =================

INSERT INTO `comments` (`recipe_id`, `author`, `rating_type`, `content`) VALUES
(1, 'Lan Anh', 'Ngon 😋', 'Sốt chuẩn vị đưa cơm lắm mọi người ơi, làm siêu nhanh luôn!'),
(1, 'Thảo Nguyên', 'Ngon 😋', 'Mình thêm chút dứa (thơm) vào xào cùng thấy cũng rất hợp nha.'),
(1, 'Bảo', 'Dở 🤢', 'Sườn mình mua bị dai, chắc do mình chiên lâu quá.'),
(2, 'Hoàng Nam', 'Ngon 😋', 'Bữa sáng siêu năng lượng, pate béo ngậy rất ngon!'),
(2, 'Thanh Trúc', 'Ngon 😋', 'Nên thêm tí phô mai kéo sợi nữa là điểm 10 luôn á.'),
(3, 'Đức Thịnh', 'Ngon 😋', 'Màu cá kho lên cánh gián cực đẹp, ăn tốn cơm dã man!'),
(4, 'Kim Oanh', 'Ngon 😋', 'Sốt cà chua đậm đà, các bé nhà mình rất mê món này.'),
(5, 'Hữu Nghĩa', 'Ngon 😋', 'Vị chua thanh mát mùa hè ăn giải nhiệt rất tuyệt!'),
(6, 'Hải Yến', 'Ngon 😋', 'Món chay thanh đạm nhưng sốt cà chua đậm đà bắt cơm cực kỳ!'),
(6, 'Minh Tâm', 'Ngon 😋', 'Đậu ngoài giòn trong mềm, làm vừa nhanh vừa tiết kiệm.');
