<?php
// api_add_recipe.php - API thêm món ăn mới vào MySQL
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Phương thức yêu cầu không hợp lệ.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$name = isset($_POST['name']) ? trim($_POST['name']) : trim($input['name'] ?? '');
$category = isset($_POST['category']) ? trim($_POST['category']) : trim($input['category'] ?? 'Món mặn');
$author = isset($_POST['author']) ? trim($_POST['author']) : trim($input['author'] ?? 'Thành viên');
$cookTime = isset($_POST['time']) ? trim($_POST['time']) : trim($input['time'] ?? '30 phút');
$image = isset($_POST['image']) ? trim($_POST['image']) : trim($input['image'] ?? '');
$ingredientsRaw = isset($_POST['ingredients']) ? $_POST['ingredients'] : ($input['ingredients'] ?? '');
$stepsRaw = isset($_POST['steps']) ? $_POST['steps'] : ($input['steps'] ?? '');

if (empty($name)) {
    echo json_encode(['success' => false, 'message' => 'Tên món ăn không được để trống!']);
    exit;
}

if (empty($author)) $author = 'Thành viên';
if (empty($image)) $image = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';

// Xử lý nguyên liệu và các bước làm thành mảng JSON
if (is_array($ingredientsRaw)) {
    $ingredients = $ingredientsRaw;
} else {
    $ingredients = array_values(array_filter(array_map('trim', explode("\n", $ingredientsRaw))));
}

if (is_array($stepsRaw)) {
    $steps = $stepsRaw;
} else {
    $steps = array_values(array_filter(array_map('trim', explode("\n", $stepsRaw))));
}

$ingredientsJson = json_encode($ingredients, JSON_UNESCAPED_UNICODE);
$stepsJson = json_encode($steps, JSON_UNESCAPED_UNICODE);
$prepTime = '15 phút chuẩn bị';
$difficulty = 'Dễ';
$rating = 5.0;
$postedTime = 'Vừa xong';

$stmt = $conn->prepare("INSERT INTO `recipes` (`name`, `category`, `prep_time`, `cook_time`, `difficulty`, `rating`, `author`, `posted_time`, `image`, `ingredients`, `steps`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssdsssss", $name, $category, $prepTime, $cookTime, $difficulty, $rating, $author, $postedTime, $image, $ingredientsJson, $stepsJson);

if ($stmt->execute()) {
    $newRecipeId = $stmt->insert_id;
    echo json_encode([
        'success' => true,
        'message' => 'Đã thêm món ăn mới vào MySQL thành công!',
        'recipe' => [
            'id' => $newRecipeId,
            'name' => $name,
            'category' => $category,
            'prepTime' => $prepTime,
            'cookTime' => $cookTime,
            'difficulty' => $difficulty,
            'rating' => $rating,
            'reviewCount' => 0,
            'author' => $author,
            'postedTime' => $postedTime,
            'image' => $image,
            'ingredients' => $ingredients,
            'steps' => $steps,
            'comments' => []
        ]
    ], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['success' => false, 'message' => 'Lỗi khi lưu vào MySQL: ' . $stmt->error]);
}

$stmt->close();
?>
