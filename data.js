// data.js - Quản lý dữ liệu (Kết nối MySQL qua PHP API kèm Fallback dự phòng)

const DEFAULT_RECIPES = [
  {
    id: 1,
    name: "Sườn Xào Chua Ngọt",
    category: "Món mặn",
    prepTime: "30 phút chuẩn bị",
    cookTime: "40 phút",
    difficulty: "Dễ",
    rating: 4.8,
    reviewCount: 24,
    author: "Phương Anh • Huy",
    postedTime: "2 giờ trước",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    ingredients: [
      "500g sườn non, chặt miếng vừa ăn",
      "1 củ hành tây, 1/2 quả ớt chuông đỏ & xanh",
      "Tỏi, hành tím băm nhỏ",
      "Gia vị: Giấm, đường, nước mắm, tương ớt",
      "Hành lá, tiêu, dầu ăn."
    ],
    steps: [
      "Chần sườn qua nước sôi có chút muối, sau đó ướp với hành tỏi băm và hạt nêm trong 15 phút.",
      "Chiên sườn xém cạnh với chút dầu ăn để sườn săn lại rồi vớt ra.",
      "Pha sốt chua ngọt: Giấm, đường, nước mắm, tương ớt và nước lọc theo tỷ lệ vừa vị.",
      "Phi thơm hành tỏi, xào hành tây & ớt chuông, cho sườn và nước sốt vào đảo đều đến khi sệt lại."
    ],
    comments: [
      { author: "Lan Anh", ratingType: "Ngon 😋", content: "Sốt chuẩn vị đưa cơm lắm mọi người ơi, làm siêu nhanh luôn!" },
      { author: "Thảo Nguyên", ratingType: "Ngon 😋", content: "Mình thêm chút dứa (thơm) vào xào cùng thấy cũng rất hợp nha." },
      { author: "Bảo", ratingType: "Dở 🤢", content: "Sườn mình mua bị dai, chắc do mình chiên lâu quá." }
    ]
  },
  {
    id: 2,
    name: "Bánh Mì Chảo",
    category: "Món ăn vặt",
    prepTime: "15 phút chuẩn bị",
    cookTime: "20 phút",
    difficulty: "Dễ",
    rating: 4.7,
    reviewCount: 18,
    author: "Minh Tuấn",
    postedTime: "5 giờ trước",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80",
    ingredients: [
      "2 ổ bánh mì giòn",
      "2 quả trứng gà",
      "1 cây xúc xích, 1 miếng pate gan",
      "Hành tây, cà chua, hành ngò",
      "Bơ lạt, nước tương, tương ớt, tiêu xay."
    ],
    steps: [
      "Làm nóng chảo nhỏ với chút bơ lạt, cho hành tây vào đảo thơm.",
      "Cho pate, xúc xích cắt lát vào áp chảo hai mặt cho xém nhẹ.",
      "Đập trứng gà vào chảo, giữ lòng đào tùy sở thích.",
      "Thêm sốt cà chua hoặc chút xì dầu, rắc tiêu ngò và ăn kèm bánh mì nóng giòn."
    ],
    comments: [
      { author: "Hoàng Nam", ratingType: "Ngon 😋", content: "Bữa sáng siêu năng lượng, pate béo ngậy rất ngon!" },
      { author: "Thanh Trúc", ratingType: "Ngon 😋", content: "Nên thêm tí phô mai kéo sợi nữa là điểm 10 luôn á." }
    ]
  },
  {
    id: 3,
    name: "Cá Kho Tộ",
    category: "Món mặn",
    prepTime: "40 phút chuẩn bị",
    cookTime: "45 phút",
    difficulty: "Trung bình",
    rating: 4.9,
    reviewCount: 31,
    author: "Cô Ba Sài Gòn",
    postedTime: "1 ngày trước",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80",
    ingredients: [
      "500g cá quả hoặc cá ba sa cắt khúc",
      "100g thịt ba chỉ thái con chì",
      "Hành tím, tỏi, ớt hiểm, hành lá",
      "Nước hàng (nước màu), nước mắm ngon, đường, tiêu sọ."
    ],
    steps: [
      "Ướp cá với nước mắm, hành tỏi băm, tiêu, nước màu trong ít nhất 20 phút.",
      "Xào thịt ba chỉ săn lại trong tộ sứ để ra bớt mỡ.",
      "Xếp cá vào tộ cùng thịt, đun lửa lớn cho thịt cá săn lại.",
      "Thêm nước sôi xâm xấp mặt cá, hạ lửa nhỏ kho liu riu đến khi nước sánh kẹo lại thì rắc tiêu, ớt."
    ],
    comments: [
      { author: "Đức Thịnh", ratingType: "Ngon 😋", content: "Màu cá kho lên cánh gián cực đẹp, ăn tốn cơm dã man!" }
    ]
  },
  {
    id: 4,
    name: "Mỳ Ý Sốt Bò Bằm",
    category: "Nhanh gọn",
    prepTime: "25 phút chuẩn bị",
    cookTime: "30 phút",
    difficulty: "Dễ",
    rating: 4.6,
    reviewCount: 15,
    author: "Chef Kien",
    postedTime: "2 ngày trước",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    ingredients: [
      "200g mỳ Spaghetti",
      "200g thịt bò băm nhuyễn",
      "1 hộp sốt cà chua hoặc 3 quả cà chua tươi băm hạt lựu",
      "1/2 củ hành tây băm nhỏ, tỏi băm",
      "Dầu olive, lá oregano, bơ, muối, tiêu, phô mai bột."
    ],
    steps: [
      "Luộc mỳ trong nước sôi có chút muối khoảng 8-10 phút đến khi chín al dente, vớt ra xóc chút dầu olive.",
      "Phi thơm tỏi và hành tây với bơ, cho thịt bò băm vào xào chín tới.",
      "Đổ sốt cà chua vào đun nhỏ lửa, nêm chút muối, tiêu, lá oregano cho sốt sệt lại.",
      "Bày mỳ ra đĩa, rưới sốt bò bằm lên trên và rắc thêm chút phô mai bột."
    ],
    comments: [
      { author: "Kim Oanh", ratingType: "Ngon 😋", content: "Sốt cà chua đậm đà, các bé nhà mình rất mê món này." }
    ]
  },
  {
    id: 5,
    name: "Canh Chua Cá Lóc",
    category: "Món mặn",
    prepTime: "35 phút chuẩn bị",
    cookTime: "30 phút",
    difficulty: "Trung bình",
    rating: 4.8,
    reviewCount: 22,
    author: "Bếp Mẹ Nấu",
    postedTime: "3 ngày trước",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80",
    ingredients: [
      "1 con cá lóc (khoảng 600g) làm sạch cắt khúc",
      "Dứa, cà chua, đậu bắp, dọc mùng (bạc hà), giá đỗ",
      "Me chín lấy nước cốt, ớt hiểm",
      "Rau ngổ, ngò gai, hành tỏi băm, gia vị nêm nếm."
    ],
    steps: [
      "Cá lóc ướp chút hạt nêm, tiêu cho thấm.",
      "Phi thơm hành tỏi, cho cà chua và dứa vào xào sơ để tạo màu và độ chua thanh.",
      "Đổ nước vào đun sôi, cho nước cốt me và thả cá vào nấu chín vớt bọt.",
      "Cho đậu bắp, dọc mùng, giá đỗ vào nấu vừa chín tới, nêm đường nước mắm chua ngọt hài hòa rồi rắc rau thơm."
    ],
    comments: [
      { author: "Hữu Nghĩa", ratingType: "Ngon 😋", content: "Vị chua thanh mát mùa hè ăn giải nhiệt rất tuyệt!" }
    ]
  },
  {
    id: 6,
    name: "Đậu Hũ Sốt Cà Chua",
    category: "Món chay",
    prepTime: "15 phút chuẩn bị",
    cookTime: "20 phút",
    difficulty: "Dễ",
    rating: 4.9,
    reviewCount: 19,
    author: "Tuệ Lâm",
    postedTime: "4 giờ trước",
    image: "assets/dau-hu-sot-ca.jpg",
    ingredients: [
      "3 miếng đậu hũ trắng (cắt vuông vừa ăn)",
      "3 quả cà chua chín mọng, băm nhỏ",
      "Hành boa-rô (tỏi tây), hành ngò",
      "Gia vị chay: Nước tương, đường, hạt nêm nấm, tiêu",
      "Dầu thực vật để chiên."
    ],
    steps: [
      "Chiên đậu hũ vàng đều các mặt trong dầu nóng rồi vớt ra cho ráo dầu.",
      "Phi thơm gốc hành boa-rô, cho cà chua băm vào xào nhuyễn thành sốt.",
      "Nêm nước tương, đường, hạt nêm nấm và chút nước lọc, đun sôi cho sốt sánh lại.",
      "Cho đậu hũ vào đảo nhẹ tay cho ngấm đều sốt trong 3-5 phút, rắc hành ngò và tiêu rồi tắt bếp."
    ],
    comments: [
      { author: "Hải Yến", ratingType: "Ngon 😋", content: "Món chay thanh đạm nhưng sốt cà chua đậm đà bắt cơm cực kỳ!" },
      { author: "Minh Tâm", ratingType: "Ngon 😋", content: "Đậu ngoài giòn trong mềm, làm vừa nhanh vừa tiết kiệm." }
    ]
  }
];

// Khởi tạo mảng biến toàn cục recipes
let recipes = DEFAULT_RECIPES;

// Hàm tải dữ liệu từ MySQL qua API PHP
async function fetchRecipesFromMySQL() {
  try {
    const res = await fetch("api_get_recipes.php");
    if (!res.ok) throw new Error("HTTP error " + res.status);
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      recipes = json.data;
      console.log("Đã nạp " + recipes.length + " món ăn trực tiếp từ MySQL!");
      
      // Gọi cập nhật lại giao diện sau khi có dữ liệu từ MySQL
      if (typeof renderRecipes === "function") {
        renderRecipes(recipes);
      }
      if (typeof showDetail === "function") {
        showDetail(recipes[0].id);
      }
    }
  } catch (err) {
    console.warn("Chưa kết nối được MySQL (hoặc đang chạy file HTML tĩnh), dùng dữ liệu mặc định:", err);
  }
}

// Tự động gọi API tải dữ liệu từ MySQL khi load trang
document.addEventListener("DOMContentLoaded", fetchRecipesFromMySQL);
