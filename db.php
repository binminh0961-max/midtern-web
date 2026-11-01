<?php
// db.php - Kết nối cơ sở dữ liệu MySQL (XAMPP)

$host = "localhost";
$username = "root";
$password = "";
$database = "cook_share";

// Tạo kết nối
$conn = new mysqli($host, $username, $password, $database);

// Kiểm tra lỗi kết nối
if ($conn->connect_error) {
    // Nếu chưa tạo database thì báo lỗi rõ ràng
    die(json_encode([
        "success" => false, 
        "message" => "Không thể kết nối cơ sở dữ liệu: " . $conn->connect_error . ". Vui lòng chắc chắn bạn đã chạy file database.sql trong phpMyAdmin!"
    ]));
}

// Thiết lập mã hóa UTF-8 để tiếng Việt không bị lỗi font
$conn->set_charset("utf8mb4");
?>
