<?php
// api_get_recipes.php - API lấy danh sách món ăn từ MySQL kèm bình luận
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

// Truy vấn danh sách món ăn
$sql = "SELECT * FROM `recipes` ORDER BY `id` ASC";
$result = $conn->query($sql);

$recipes = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $recipeId = (int)$row['id'];
        
        // Giải mã JSON cho nguyên liệu và các bước làm
        $ingredients = json_decode($row['ingredients'], true) ?? [];
        $steps = json_decode($row['steps'], true) ?? [];

        // Lấy bình luận tương ứng của món ăn này
        $commentSql = "SELECT `id`, `author`, `rating_type` AS `ratingType`, `content`, `created_at` AS `createdAt` 
                       FROM `comments` WHERE `recipe_id` = $recipeId ORDER BY `id` ASC";
        $commentResult = $conn->query($commentSql);
        
        $comments = [];
        if ($commentResult && $commentResult->num_rows > 0) {
            while ($c = $commentResult->fetch_assoc()) {
                $comments[] = $c;
            }
        }

        $recipes[] = [
            'id' => $recipeId,
            'name' => $row['name'],
            'category' => $row['category'],
            'prepTime' => $row['prep_time'],
            'cookTime' => $row['cook_time'],
            'difficulty' => $row['difficulty'],
            'rating' => (float)$row['rating'],
            'reviewCount' => count($comments) > 0 ? count($comments) : 0,
            'author' => $row['author'],
            'postedTime' => $row['posted_time'],
            'image' => $row['image'],
            'ingredients' => $ingredients,
            'steps' => $steps,
            'comments' => $comments
        ];
    }
}

echo json_encode([
    'success' => true,
    'total' => count($recipes),
    'data' => $recipes
], JSON_UNESCAPED_UNICODE);
?>
