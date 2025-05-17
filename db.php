<?php
$host = 'localhost';
$user = 'intergalactique';
$password = '9N(n-PJlP2V3';
$database = 'theendpage';

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Erreur connexion : " . $conn->connect_error);
}
?>
