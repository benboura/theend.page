<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

$tone = $conn->real_escape_string($data->tone);
$message = $conn->real_escape_string($data->message);

$sql = "INSERT INTO messages (tone, message) VALUES ('$tone', '$message')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "id" => $conn->insert_id]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Erreur : " . $conn->error]);
}

$conn->close();
?>
