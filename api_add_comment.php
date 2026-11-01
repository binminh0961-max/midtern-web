<?php
// api_add_comment.php - API thêm bình luận mới vào MySQL
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

// Chỉ nhận phương thức POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Phương thức yêu cầu không hợp lệ.']);
    exit;
}

// Hỗ trợ cả nhận dữ liệu FormData hoặc raw JSON
$input = json_decode(file_get_contents('php://input'), true);

$recipeId = isset($_POST['recipe_id']) ? (int)$_POST['recipe_id'] : (int)($input['recipe_id'] ?? 0);
$author = isset($_POST['author']) ? trim($_POST['author']) : trim($input['author'] ?? '');
$ratingType = isset($_POST['rating_type']) ? trim($_POST['rating_type']) : trim($input['rating_type'] ?? 'Ngon 😋');
$content = isset($_POST['content']) ? trim($_POST['content']) : trim($input['content'] ?? '');

if (empty($author)) {
    $author = 'Ẩn danh';
}

if ($recipeId <= 0 || empty($content)) {
    echo json_encode(['success' => false, 'message' => 'Thiếu ID món ăn hoặc nội dung bình luận!']);
    exit;
}

// Chuẩn bị câu lệnh an toàn (Prepared Statement)
$stmt = $conn->prepare("INSERT INTO `comments` (`recipe_id`, `author`, `rating_type`, `content`) VALUES (?, ?, ?, ?)");
$stmt->bind_param("isss", $recipeId, $author, $ratingType, $content);

if ($stmt->execute()) {
    $newCommentId = $stmt->insert_id;
    echo json_encode([
        'success' => true,
        'message' => 'Đã lưu bình luận thành công vào MySQL!',
        'comment' => [
            'id' => $newCommentId,
            'recipe_id' => $recipeId,
            'author' => $author,
            'ratingType' => $ratingType,
            'content' => $content
        ]
    ], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['success' => false, 'message' => 'Lỗi khi lưu vào MySQL: ' . $stmt->error]);
}

$stmt->close();
?>
